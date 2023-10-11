using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Dto.PatientsCard;

namespace HospitalsManagment.Services.Interfaces
{
    public interface IPatient
    {
        Task<ServiceResponse<PatientBasicDataDto>> GetPatientData();
        Task<ServiceResponse<PatientCardDto>> GetHealthyData();
        Task<ServiceResponse<PatientWardDataDto>> GetWardById(int id);
    }
}
