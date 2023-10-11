using HospitalsManagment.Dto.WardNameAsStringDto;
using HospitalsManagment.Dto.Wards;

namespace HospitalsManagment.Services.Interfaces
{
    public interface IWard
    {
        Task<ServiceResponse<List<GetAllWardsForAdminDto>>> GetAllWardsRegistered();
        Task<ServiceResponse<PostWardDto>> PostNewWard(PostWardDto dto); 
        Task<ServiceResponse<List<GetAllWardsForAdminDto>>> GetAllWardByHospitalId(int hospitalId);
        Task<ServiceResponse<List<GetAllWardsForAdminDto>>> GetAllWardsNotAsignedToSelectedHospital(int hospitalId);
        Task<ServiceResponse<WardDto>> DeleteWard(int wardId);
        Task<ServiceResponse<UpdateWardPropertiesDto>> UpdateWard(UpdateWardPropertiesDto dto);
        Task<ServiceResponse<string>> UpdateWardsHospital(int wardId, int hospitalId);
        Task<ServiceResponse<string>> AddDoctorToWard(int wardId,int doctorId);
        Task<ServiceResponse<string>> RemoveDoctorFromWard(int wardId, int doctorId);
        Task<ServiceResponse<string>> AddPatientToWard(int wardId, int patienId);
        Task<ServiceResponse<string>> RemovePatientFromWard(int wardId, int doctorId);
        Task<ServiceResponse<List<UpdateWardAdminDto>>> getAllWardsAlreadyAddedToHospital(int hospitalId);


    }
}
