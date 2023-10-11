namespace HospitalsManagment.Dto.Patients
{
    public class PatientWardDataDto
    {
        public string WardNameAsString { get; set; }
        public int? WardId { get; set; }
        public int Capacity { get; set; }
        public int OccupiedBeds { get; set; }

    }
}
