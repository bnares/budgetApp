using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Register
{
    public class RegisterDto
    {
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}
