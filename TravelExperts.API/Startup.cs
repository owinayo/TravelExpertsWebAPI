﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TravelExperts.API.Data;
using TravelExperts.API.Helpers;

namespace TravelExperts.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // configures development services
        public void ConfigureDevelopmentServices(IServiceCollection services){
            services.AddDbContext<TravelExpertsContext>(options => {
                options.UseSqlServer(Configuration.GetConnectionString("TravelExpertsDBConnection"));
                options.UseLazyLoadingProxies();});
            ConfigureServices(services);
        }

        // configures production services
        public void ConfigureProductionServices(IServiceCollection services){
            services.AddDbContext<TravelExpertsContext>(options => {
                options.UseSqlServer(Configuration.GetConnectionString("TravelExpertsDBConnection"));
                options.UseLazyLoadingProxies();});
            ConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Adds db context and server string to api
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddCors();
            // Adds auto mapper
            services.AddAutoMapper(typeof(TravelExpertsRepository).Assembly);
            // Adds repositories to services
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ITravelExpertsRepository, TravelExpertsRepository>();
            // Adds authentication info
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options => {
                    options.TokenValidationParameters = new TokenValidationParameters{
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                }
            );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>{
                    builder.Run(async context =>{
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error!=null){
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                // app.UseHsts();
            }

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            // app.UseHttpsRedirection();
            app.UseMvc(routes =>{ // Set fallback route to fallback controller index action
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {Controller="Fallback",
                    Action="Index"}
                );
            });
        }
    }
}
