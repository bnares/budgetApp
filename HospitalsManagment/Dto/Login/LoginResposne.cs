using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Login
{
    public class LoginResposne
    {
        public string token { get; set; }
        public User user { get; set; }
    }
}
