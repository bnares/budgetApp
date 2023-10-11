namespace HospitalsManagment.Dto.Patients
{
    public class NotAsignedPatientsDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public int? WardId { get; set; }
        public int? HospitalId { get; set; }
        public int? DoctorId { get; set; }
    }
}
