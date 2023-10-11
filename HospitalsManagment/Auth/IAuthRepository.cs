using HospitalsManagment.Dto.Login;
using HospitalsManagment.Dto.Register;
using HospitalsManagment.Entities;
using HospitalsManagment.Services;

namespace HospitalsManagment.Auth
{
    public interface IAuthRepository
    {
        Task<ServiceResponse<User>> Register(RegisterDto dto);
        Task<ServiceResponse<LoginResposne>> Login(LoginDto loginDto);
        Task<ServiceResponse<User>> UserExists(Role role, string surname, string name);
    }
}
