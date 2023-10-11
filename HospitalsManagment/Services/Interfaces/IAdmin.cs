using HospitalsManagment.Dto.Admin;
using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Patients;

namespace HospitalsManagment.Services.Interfaces
{
    public interface IAdmin
    {
        Task<ServiceResponse<PatientBasicDataDto>> DeletePatient(int patientDto);
        Task<ServiceResponse<SubDoctorDto>> DeleteDoctor(int doctorId);

        Task<ServiceResponse<List<PatientBasicDataDto>>> GetAllPatients();
        Task<ServiceResponse<List<SubDoctorDto>>> GetAllDoctors();
        Task<ServiceResponse<GetDoctorsDataDto>> GetDoctorsData();
        Task<ServiceResponse<DoctorDataBasedOnPatientIdDto>> GetDoctorBasedOnPatientId(int patientId);
        Task<ServiceResponse<List<OccupationOfTheHospitalsDto>>> GetGeneralOccupationOfTheHospitals();
        Task<ServiceResponse<List<GetNotesForAdminDto>>> GetAllNotesForAdmin();


    }
}
