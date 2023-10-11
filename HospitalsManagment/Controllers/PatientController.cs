using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Dto.PatientsCard;
using HospitalsManagment.Services;
using HospitalsManagment.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalsManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles="Patient")]
    public class PatientController : ControllerBase
    {
        private readonly IPatient _patientService;

        public PatientController(IPatient patientService)
        {
            _patientService = patientService;
        }

        [HttpGet("PatientData")]
        public async Task<ActionResult<ServiceResponse<PatientBasicDataDto>>> GetPatientData()
        {
            var response = await _patientService.GetPatientData();
            if(response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("PatientCard")]
        public async Task<ActionResult<ServiceResponse<PatientCardDto>>> GetHealthyData()
        {
            var response = await _patientService.GetHealthyData();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("PatientWard/{wardId}")]
        public async Task<ActionResult<ServiceResponse<PatientWardDataDto>>> GetPatientWardData(int wardId)
        {
            var response = await _patientService.GetWardById(wardId);
            if(response.Message== "No Such Ward Registered")
            {
                return Ok(response);
            }
            else if (response.Success) return Ok(response);
            return BadRequest(response);

        }
    }
}
