using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Dto.Notes;
using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Dto.PatientsCard;
using HospitalsManagment.Dto.WardNameAsStringDto;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Entities;

namespace HospitalsManagment.Services.Interfaces
{
    public interface IDoctor
    {
        Task<ServiceResponse<UpdateDoctorPropertiesDto>> UpdateDoctor(UpdateDoctorPropertiesDto dto);
        Task<ServiceResponse<GetHospitalDto>> AddHospitalToDoctor(int HospitalId);
        Task<ServiceResponse<DisplayHospitalDto>> RemoveHispitalFromDoctor(int hospitalId);
        Task<ServiceResponse<WardDto>> AddWardToDoctor(int hospitalId, int wardId);
        Task<ServiceResponse<WardDto>> RemoveWardFromDoctor(int wardId);
        Task<ServiceResponse<string>> AddPatientToDoctor(int patientId, int hospitalId, int wardId);
        Task<ServiceResponse<string>> RemovePatientFromDoctor(int patientId);
        Task<ServiceResponse<List<PatientDto>>> GetAllDoctorsPatients();
        Task<ServiceResponse<PatientDto>> GetDoctorsPatient( int patientId);
        Task<ServiceResponse<PatientCardDto>> GetDoctorsPatientCard( int patientId);
        Task<ServiceResponse<List<WardNameAsStringDto>>> GetAllDoctorsWards();
        Task<ServiceResponse<List<DisplayHospitalDto>>> GetAllDoctorsHospitals();
        Task<ServiceResponse<NoteDto>> AddPatientNote(int patientId, PostNoteDto postNoteDto);
        Task<ServiceResponse<NoteDto>> UpdatePatientNote(UpdatePatientNoteDto noteDto);
        Task<ServiceResponse<List<string>>> GetEnumNamesOfWards();
        Task<ServiceResponse<List<DoctorsPatientsWardsDto>>> GetDooctorsPatientsWards();
        Task<ServiceResponse<List<NotAsignedPatientsDto>>> GetNotAsignedPatients();



    }
}
