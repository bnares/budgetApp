using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Entities;

namespace HospitalsManagment.Services.Interfaces
{
    public interface IHospital
    {
        Task<ServiceResponse<List<GetHospitalDto>>> GetAllHospitals();
        Task<ServiceResponse<GetHospitalDto>> GetHospitalById(int id);
        Task<ServiceResponse<Hospital>> AddNewHospital(AddHospitalDto dto);
        Task<ServiceResponse<DeleteHospitalDto>> DeleteHospital(int hospitalId);
        Task<ServiceResponse<UpdateHospitalDto>> AsignOldHospitalValueToUpdateHospital(int HospitalId);
        Task<ServiceResponse<UpdateHospitalAdminDto>> UpdateHospitalBasicData(UpdateHospitalAdminDto dto);
    }
}
