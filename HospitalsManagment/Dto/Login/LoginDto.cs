using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Login
{
    public class LoginDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Role Role { get; set; }
        public string Password { get; set; }
    }
}
