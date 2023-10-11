using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Doctors
{
    public class SubDoctorDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Role Role { get; set; }
    }
}
