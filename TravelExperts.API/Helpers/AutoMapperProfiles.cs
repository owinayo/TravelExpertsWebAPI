
using AutoMapper;
using TravelExperts.API.Dtos;
using TravelExperts.API.Model;

namespace TravelExperts.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        // Creates auto mapper profiles to move properties from one class to another
        public AutoMapperProfiles(){
            CreateMap<Customers, CustomerForUpdateDto>();
            CreateMap<CustomerForUpdateDto, Customers>();
            CreateMap<CustomerForRegisterDto,Customers>();
            CreateMap<BookedPackages,BookedPackageDetailsDto>();
        }
    }
}