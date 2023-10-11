namespace HospitalsManagment.Entities
{
    public class PatientCard
    {
        public int PatientCardId { get; set; }
       
        public List<Note> Notes { get; set; } = new List<Note>();
        public Doctor? Doctor { get; set; }
        public int? DoctorId { get; set; }

    }
}
