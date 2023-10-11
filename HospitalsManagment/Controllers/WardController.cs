using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Dto.WardNameAsStringDto;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Services;
using HospitalsManagment.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalsManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class WardController : ControllerBase
    {
        private readonly IWard _ward;

        public WardController(IWard ward)
        {
            _ward = ward;
        }

        [HttpPost("addWard")]
        public async Task<ActionResult<ServiceResponse<PostWardDto>>> PostNewWard(PostWardDto postWardDto)
        {
            var response = await _ward.PostNewWard(postWardDto);
            if(response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllWards")]
        public async Task<ActionResult<ServiceResponse<List<GetAllWardsForAdminDto>>>> GetAllRegisteredWard()
        {
            var response =await _ward.GetAllWardsRegistered();
            if(response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("allHospital/wards/{hospitalId}")]
        public async Task<ActionResult<ServiceResponse<GetAllWardDto>>> HospitalWards(int hospitalId)
        {
            var hospitalWards =await  _ward.GetAllWardByHospitalId(hospitalId);
            if(hospitalWards.Success==false) return NotFound(hospitalWards);
            return Ok(hospitalWards);
        }

        [HttpGet("GetNotAsignedWardsToHospital/{hospitalId}")]
        public async Task<ActionResult<ServiceResponse<GetAllWardsForAdminDto>>> GetNotAsignedWards(int hospitalId)
        {
            var hospitalWards = await _ward.GetAllWardsNotAsignedToSelectedHospital(hospitalId);
            if (hospitalWards.Success == false) return NotFound(hospitalWards);
            return Ok(hospitalWards);
        }

        [HttpGet("getWardsAddedToHospital/{hospitalId}")]
        public async Task<ActionResult<ServiceResponse<UpdateWardAdminDto>>> GetWardsAddedToHospital(int hospitalId)
        {
            var hospitalWards = await _ward.getAllWardsAlreadyAddedToHospital(hospitalId);
            if(hospitalWards.Success) return Ok(hospitalWards);
            return NotFound(hospitalWards);
        }

        [HttpDelete("deleteWard/{wardId}")]
        public async Task<ActionResult<ServiceResponse<WardDto>>> DeleteWard(int wardId)
        {
            var response = await _ward.DeleteWard(wardId);
            if(!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [HttpPut("updateWard")]
        public async Task<ActionResult<ServiceResponse<UpdateWardPropertiesDto>>> UpdateWard(UpdateWardPropertiesDto dto)
        {
            var response = await _ward.UpdateWard(dto);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpPut("updateWardHospital/{newHospitalId}/{wardId}")]
        public async Task<ActionResult<ServiceResponse<string>>> UpdateWardsHospital(int newHospitalId, int wardId)
        {
            var response =await _ward.UpdateWardsHospital(wardId, newHospitalId);
            if (response.Success) return Ok(response.Message);
            return BadRequest(response.Message);
        }

        [HttpPut("newDoctor/{wardId}/{doctorId}")]
        public async Task<ActionResult<ServiceResponse<string>>> AddDoctorToWard(int wardId, int doctorId)
        {
            var response = await _ward.AddDoctorToWard(wardId, doctorId);
            if (response.Success) return Ok(response.Message);
            return BadRequest(response?.Message);
        }

        [HttpPut("removeDoctor/{wardId}/{doctorId}")]
        public async Task<ActionResult<ServiceResponse<string>>> RemoveDoctorFromWard(int wardId, int doctorId)
        {
            var response = await _ward.RemoveDoctorFromWard(wardId, doctorId);
            if (response.Success) return Ok(response.Data);
            return BadRequest(response.Data);
        }

        [HttpPut("newPatient/{wardId}/{patientId}")]
        public async Task<ActionResult<ServiceResponse<string>>> AddPatientToWard(int wardId, int patientId)
        {
            var response = await _ward.AddPatientToWard(wardId, patientId);
            if (response.Success) return Ok(response.Message);
            return BadRequest(response.Message);
        }

        [HttpPut("removePatient/{wardId}/{patientId}")]
        public async Task<ActionResult<ServiceResponse<string>>> RemovePatientFromWard(int wardId, int patientId)
        {
            var response = await _ward.RemovePatientFromWard(wardId, patientId);
            if(response.Success) return Ok(response.Data);
            return BadRequest(response.Data);
        }
    }

}
