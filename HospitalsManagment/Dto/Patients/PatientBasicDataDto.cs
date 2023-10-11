using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Patients
{
    public class PatientBasicDataDto
    {
        public int? Id { get; set; }
        public int Age { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public SubDoctorDto? Doctor { get; set; }
        public int? DoctorId { get; set; }
        public Entities.Hospital? Hospital { get; set; }
        public Ward? Ward { get; set; }
    }
}
