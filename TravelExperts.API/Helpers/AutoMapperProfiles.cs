
using AutoMapper;
using TravelExperts.API.Dtos;
using TravelExperts.API.Model;

namespace TravelExperts.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<Customers, CustomerForUpdateDto>();
            CreateMap<CustomerForUpdateDto, Customers>();
            CreateMap<CustomerForRegisterDto,Customers>();
        }
    }
}