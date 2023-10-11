using HospitalsManagment.Dto.Notes;

namespace HospitalsManagment.Dto.PatientsCard
{
    public class PatientCardDto
    {
        public int PatientCardId { get; set; }

        public List<NoteDto> Notes { get; set; } = new List<NoteDto>();
    }
}
