using System;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TravelExperts.API.Model;

namespace TravelExperts.API.Data {
    public class AuthRepository: IAuthRepository {
        private readonly TravelExpertsContext context;
        public AuthRepository(TravelExpertsContext context) {
            this.context = context;
        }

        // checks that customer exists in db
        public async Task < bool > CustomerExists(string username) {
            var customerExists = await context.Customers.AnyAsync(x => x.Username==username);
            return customerExists;
        }

        // Processes customer login, null if unsuccessful
        public async Task < Customers > Login(string username, string password) {
            var customer = await context.Customers.FirstOrDefaultAsync(x => x.Username==username); // Looks for customer with same user
            // return null if not found
            if(customer==null){
                return null;
            }
            // return null if password is incorrect
            if (!VerifyPasswordHash(password,customer.Password,customer.Salt)){
                return null;
            }
            // return customer if password is correct
            return customer;            
        }

        public async Task < Customers > Register(Customers customer, string password) {
            byte[] passwordSalt;
            byte[] passwordHash;

            // Generates hash and salt from password
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            // Assigns password and salt to customer
            customer.Password = Convert.ToBase64String(passwordHash);
            customer.Salt = Convert.ToBase64String(passwordSalt);

            // Adds customer and saves changes
            await context.Customers.AddAsync(customer);
            await context.SaveChangesAsync();

            return customer;

        }

        // Verifies password against hashed pword and salt
        private bool VerifyPasswordHash(string password, string passwordHash, string passwordSalt)
        {
            byte[] salt = Convert.FromBase64String(passwordSalt);
            byte[] dbHashedPassword = Convert.FromBase64String(passwordHash);

            // Takes user entered password and encrypts it in same way used to store password
            var pbkdf2 = new Rfc2898DeriveBytes(password.ToString(), salt, 10000);
            byte[] hashedPassword = pbkdf2.GetBytes(20); // Length 20

            // First 16 bytes in hashed password are salt, 17th byte is 1st actual byte to start comparing
            for (int i = 16; i < dbHashedPassword.Length; i++) {
                if (dbHashedPassword[i] != hashedPassword[i - 16]) {
                    return false;
                }
            }
            return true;
        }

        

        // Pass in password, returns hashed password and password salt
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            passwordHash = new byte[36]; // Initialize hash
            new RNGCryptoServiceProvider().GetBytes(passwordSalt = new byte[16]); //Create new salt
            // Generate hash from password and salt
            var pbkdf2 = new Rfc2898DeriveBytes(password, passwordSalt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            // Copies salt into first 16 slots in combined password hash
            Array.Copy(passwordSalt, 0, passwordHash, 0, 16);
            // Copies actual hashed password into last 20 slots
            Array.Copy(hash, 0, passwordHash, 16, 20);
        }
    }
}