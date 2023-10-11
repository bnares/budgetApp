using HospitalsManagment.Auth;
using HospitalsManagment.Dto.Login;
using HospitalsManagment.Dto.Register;
using HospitalsManagment.Entities;
using HospitalsManagment.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalsManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<User>>> Register(RegisterDto dto)
        {
            var response = await _authRepository.Register(dto);
            if (response == null) return Unauthorized(response.Data);
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<LoginDto>>> Login(LoginDto dto)
        {
            var response = await _authRepository.Login(dto);
            if(!response.Success) return Unauthorized(response.Message);
            return Ok(response);
        }
    }
}
