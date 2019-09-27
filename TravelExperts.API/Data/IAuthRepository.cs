using System.Threading.Tasks;
using TravelExperts.API.Model;

namespace TravelExperts.API.Data
{
    public interface IAuthRepository
    {
         Task<Customers> Register(Customers customer, string password);
         Task<Customers> Login(string username, string password);
         Task<bool> CustomerExists(string username);
    }
}