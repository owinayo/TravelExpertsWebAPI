using System.Threading.Tasks;
using TravelExperts.API.Model;

namespace TravelExperts.API.Data
{
    public interface IAuthRepository
    {
         Task<Customers> Register(Customers customer, string password); // Method to register customer
         Task<Customers> Login(string username, string password); // Method to login customer
         Task<bool> CustomerExists(string username); // Method to check if customer exits
    }
}