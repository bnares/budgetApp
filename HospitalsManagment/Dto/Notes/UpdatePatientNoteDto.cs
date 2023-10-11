namespace HospitalsManagment.Dto.Notes
{
    public class UpdatePatientNoteDto
    {
        public int PatientId { get; set; }
        public int PatientCardId { get; set; }
        public int NoteId { get; set; }

        public string Record { get; set; }

    }
}
