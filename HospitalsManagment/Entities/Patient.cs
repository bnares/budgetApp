namespace HospitalsManagment.Entities
{
    public class Patient : User
    {
       
        public int Age { get; set; }
        public Ward? Ward { get; set; }
        public int? WardId { get; set; }
        public int? HospitalId { get; set; }
        public Hospital? Hospital { get; set; }
        public int? DoctorId { get; set; }
        public Doctor? Doctor { get; set; }
        public int PatientCardId { get; set; }
        public PatientCard PatientCard { get; set; } = new PatientCard();


    }
}
