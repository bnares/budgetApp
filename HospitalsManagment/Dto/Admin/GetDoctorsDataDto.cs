using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Admin
{
    public class GetDoctorsDataDto
    {
        
        //public List<Doctor> DoctorsData { get; set; } = new List<Doctor> { };
        public List<HospitalsNotesNumbersDto> NotesNumbersDtos { get; set; } = new List<HospitalsNotesNumbersDto>();
        public List<PatientNotesNumbersDto> NotesPerPatient { get; set; } = new List<PatientNotesNumbersDto> { };


    }
}
