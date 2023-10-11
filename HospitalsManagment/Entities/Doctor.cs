namespace HospitalsManagment.Entities
{
    public class Doctor : User
    {
        
        
        public List<Hospital> Hospitals { get; set; } = new List<Hospital> { };
        public List<Ward>  Wards { get; set; } = new List<Ward> { };
        public List<Patient> Patients { get; set; } = new List<Patient> { };
        public List<PatientCard> PatientCards { get; set; } = new List<PatientCard> { };


    }
}
