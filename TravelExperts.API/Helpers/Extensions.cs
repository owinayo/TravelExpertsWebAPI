using Microsoft.AspNetCore.Http;

namespace TravelExperts.API.Helpers
{
    public static class Extensions
    {
        // Adds headers to http responses that let us know what errors are occurring
        public static void AddApplicationError(this HttpResponse response, string message){
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}