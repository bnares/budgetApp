namespace HospitalsManagment.Dto.Notes
{
    public class NoteDto
    {
        public int Id { get; set; }
        public string Record { get; set; }
        public DateTime Date { get; set; }
        public int PatientCardId { get; set; }
    }
}
