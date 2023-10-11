namespace HospitalsManagment.Dto.Admin
{
    public class PatientNotesNumbersDto
    {
        public int? PatientId { get; set; }
        public string PatientHospital { get; set; }
        public string PatientCity { get; set; }
        public int PatientAge { get; set; }

        public string PatientName { get; set; }
        public int NotesNumbers { get; set; }
    }
}
