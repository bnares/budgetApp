namespace HospitalsManagment.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public string Record { get; set; }
        public DateTime Date { get; set; }
        public int PatientCardId { get; set; }

    }
}
