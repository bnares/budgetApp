namespace HospitalsManagment.Entities
{
    public class Ward
    {
        public int? WardId { get; set; }
        public DepartmentName WardName { get; set; }
        public int MaxCapacity { get; set; }
        public int OccupiedBeds { get; set; } = 0;
        public Hospital Hospital { get; set; }
        public int HospitalId { get; set; }
        public List<Doctor> Doctors { get; set; }
        public List<Patient> Patients { get; set; }


    }
}
