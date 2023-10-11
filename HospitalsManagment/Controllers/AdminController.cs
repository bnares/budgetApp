using HospitalsManagment.Dto.Admin;
using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Services;
using HospitalsManagment.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalsManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles="Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin _aminService;

        public AdminController(IAdmin aminService)
        {
            _aminService = aminService;
        }

        [HttpDelete("deleteDoctor/{doctorId}")]
        public async Task<ActionResult<ServiceResponse<PatientBasicDataDto>>> DeleteDoctor(int doctorId)
        {
            var response = await _aminService.DeleteDoctor(doctorId);
            if(response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpDelete("deletePatient/{patientId}")]
        public async Task<ActionResult<ServiceResponse<PatientBasicDataDto>>> DeletePatient(int patientId)
        {
            var response = await _aminService.DeletePatient(patientId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllPatients")]
        public async Task<ActionResult<ServiceResponse<List<PatientBasicDataDto>>>> GetAllPatients()
        {
            var response = await _aminService.GetAllPatients();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllDoctors")]
        public async Task<ActionResult<ServiceResponse<List<SubDoctorDto>>>> GetAllDoctors()
        {
            var response = await _aminService.GetAllDoctors();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("GetDoctorsData")]
        public async Task<ActionResult<ServiceResponse<GetDoctorsDataDto>>> GetDoctorsData()
        {
            var response = await _aminService.GetDoctorsData();
            if(response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("GetPatientsDoctor/{patientId}")]
        public async Task<ActionResult<ServiceResponse<DoctorDataBasedOnPatientIdDto>>> GetDoctorBasedOnPatientId(int patientId)
        {
            var response = await _aminService.GetDoctorBasedOnPatientId(patientId);
            if(response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("GetGeneralHospitalsOccupation")]
        public async Task<ActionResult<ServiceResponse<List<OccupationOfTheHospitalsDto>>>> GetAllHosspitalsOccupationData()
        {
            var response = await _aminService.GetGeneralOccupationOfTheHospitals();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("GetAllNotesRegistered")]
        public async Task<ActionResult<ServiceResponse<List<GetNotesForAdminDto>>>> GetAllNotesForAdmin()
        {
            var response = await _aminService.GetAllNotesForAdmin();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }
    }
}
