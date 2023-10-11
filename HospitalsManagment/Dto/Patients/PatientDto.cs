using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Patients
{
    public class PatientDto
    {
        public int? Id { get; set; }
        public int Age { get; set; }
        public PatientCard PatientCard { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int? HospitalId { get; set; }
        public Ward? Ward { get; set; }

    }
}
