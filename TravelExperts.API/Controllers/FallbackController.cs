using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace TravelExperts.API.Controllers{
    
    // Fallback controller for web hosting
    public class FallbackController: Controller{

        // Fallback to index page in wwwroot
        public IActionResult Index(){
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
            "wwwroot","index.html"),"text/HTML");
        }
    }
}