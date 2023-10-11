using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Entities;
using HospitalsManagment.Services;
using HospitalsManagment.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalsManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class HospitalController : ControllerBase
    {
        private readonly IHospital _hospitalService;

        public HospitalController(IHospital hospitalService)
        {
            _hospitalService = hospitalService;
        }

        [HttpGet("getAllHospitals")]
        [Authorize(Roles = "Admin, Doctor")]
        public async Task<ActionResult<ServiceResponse<List<GetHospitalDto>>>> GetAllHospitals()
        {
            var response =await _hospitalService.GetAllHospitals();
            if(! response.Success) return BadRequest(response);
            return Ok(response);
        }

        [HttpGet("getHospital/{hospitalId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceResponse<GetHospitalDto>>> GetHospitalById(int hospitalId)
        {
            var response = await _hospitalService.GetHospitalById(hospitalId);
            if(response.Success) return Ok(response);
            return NotFound(response);
        }

        [HttpPut("Admin/UpdateHospital")]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<ServiceResponse<UpdateHospitalAdminDto>>> AdminUpdateBasicHospitalInfo(UpdateHospitalAdminDto dto)
        {
            var response = await _hospitalService.UpdateHospitalBasicData(dto);
            if (response.Success) return Ok(response);
            return NotFound(response);
        } 

        [HttpPost("addNewHospital")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceResponse<AddHospitalDto>>> AddHospital(AddHospitalDto hospitalDto)
        {
            var hotelServiceResponse =await _hospitalService.AddNewHospital(hospitalDto);
            if (hotelServiceResponse.Success) return Created("default", hotelServiceResponse);
            //StatusCode(201);
            return BadRequest(hotelServiceResponse);
        }

        [HttpDelete("deleteHospital/{hospitalId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceResponse<DeleteHospitalDto>>> DeleteHospital(int hospitalId) { 

            var hospitalServiceResponse =await _hospitalService.DeleteHospital(hospitalId);
            if (hospitalServiceResponse.Success) return Ok(hospitalServiceResponse);
            return NotFound(hospitalServiceResponse);
            
        }

    }
}
