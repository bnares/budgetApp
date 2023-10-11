namespace HospitalsManagment.Entities
{
    public class Hospital
    {
        public int HospitalId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public List<Ward> Wards { get; set; } = new List<Ward>() { };
        public List<Doctor> Doctors { get; set; } = new List<Doctor> { };

       // public List<PatientCard> PatientCards { get; set; }

    }
}
