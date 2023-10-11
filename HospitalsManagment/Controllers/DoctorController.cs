using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Dto.Notes;
using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Dto.PatientsCard;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Services;
using HospitalsManagment.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HospitalsManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Doctor")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctor _doctorService;

        public DoctorController(IDoctor doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpPost("addHospital/{hospitalId}")]
        public async Task<ActionResult<ServiceResponse<GetHospitalDto>>> AddHospitalToDoctor(int hospitalId)
        {
            //var userId =int.Parse(User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value); //a way to get current userId who is log in
            var response = await _doctorService.AddHospitalToDoctor(hospitalId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpDelete("removeHospital/{hospitalId}")]
        public async Task<ActionResult<ServiceResponse<GetHospitalDto>>> RemoveHospitalFromDoctor(int hospitalId)
        {
            var response = await _doctorService.RemoveHispitalFromDoctor(hospitalId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpPut("removePatient/{patientId}")]
        public async Task<ActionResult<ServiceResponse<string>>> RemovePatientFromDoctor(int patientId)
        {
            var response = await _doctorService.RemovePatientFromDoctor(patientId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpPut("AddPatient/{patientId}/{hospitalId}/{wardId}")]
        public async Task<ActionResult<ServiceResponse<string>>> AddPatientToDoctor(int patientId, int hospitalId, int wardId)
        {
            var response = await _doctorService.AddPatientToDoctor(patientId, hospitalId, wardId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpPost("AddWard/{hospitalId}/{wardId}")]
        public async Task<ActionResult<ServiceResponse<string>>> AddWardToDoctor(int hospitalId, int wardId)
        {
            var response = await _doctorService.AddWardToDoctor(hospitalId, wardId);

            if (response.Success==true) return  Ok(response);
            else if(response.Success==false)
            {
                return Ok(response);
            }
            else
            {
                
                return BadRequest(response);
            }
           
           
        }

        [HttpDelete("removeWard/{wardId}")]
        public async Task<ActionResult<ServiceResponse<string>>> RemoveWardFromDoctor(int wardId)
        {
            var response = await _doctorService.RemoveWardFromDoctor(wardId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpPut("updateCredentials")]
        public async Task<ActionResult<ServiceResponse<UpdateDoctorPropertiesDto>>> UpdateDoctorSurnameAndName(UpdateDoctorPropertiesDto dto)
        {
            var response = await _doctorService.UpdateDoctor(dto);
            if (response.Success) return Ok(response);
            return BadRequest(dto);
        }

        [HttpGet("getNotAisgnedPatients")]
        public async Task<ActionResult<ServiceResponse<List<NotAsignedPatientsDto>>>> GetNotAsignedPatients()
        {
            var response = await _doctorService.GetNotAsignedPatients();
            if(response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllDoctorsHospitals")]
        public async Task<ActionResult<ServiceResponse<List<DisplayHospitalDto>>>> GetAllDoctorsHospitals()
        {
            var response = await _doctorService.GetAllDoctorsHospitals();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllDoctorsPatients")]
        public async Task<ActionResult<ServiceResponse<List<PatientDto>>>> GetDoctorsPatients()
        {
            var response = await _doctorService.GetAllDoctorsPatients();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllDoctorsWardsWithPatients")]
        public async Task<ActionResult<ServiceResponse<List<DoctorsPatientsWardsDto>>>> GetWardsWithPatients()
        {
            var response = await _doctorService.GetDooctorsPatientsWards();
                                                
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllWard")]
        public async Task<ActionResult<ServiceResponse<List<WardNameAsStringDto>>>> GetAllDoctorsWard()
        {
            var responses = await _doctorService.GetAllDoctorsWards();
            if (responses.Success) return Ok(responses);
            return BadRequest(responses);

        }

        [HttpGet("getPateint/{patientId}")]
        public async Task<ActionResult<ServiceResponse<PatientDto>>> GetDoctorPatient(int patientId)
        {
            var response = await _doctorService.GetDoctorsPatient(patientId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("patientsCard/{patientId}")]
        public async Task<ActionResult<ServiceResponse<PatientCardDto>>> GetDoctorsPatientCard(int patientId)
        {
            var response = await _doctorService.GetDoctorsPatientCard(patientId);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("getAllNamesOfWards")]
        public async Task<ActionResult<ServiceResponse<List<string>>>> GetAllCreatedWards()
        {
            var response = await _doctorService.GetEnumNamesOfWards();
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }

        [HttpPost("addPatientNote/{patientId}")]
        public async Task<ActionResult<ServiceResponse<NoteDto>>> AddPatientNote(int patientId, PostNoteDto postNoteDto)
        {
            var response = await _doctorService.AddPatientNote(patientId, postNoteDto);
            if (response.Success) return Ok(response);
            else if (response.Success==false && response.Message == "Date is not in Valid Foramt dd/mm/yyyy")
            {
                return Ok(response);
            }
            return BadRequest(response);

        }

        [HttpPost("updatePatientNote")]
        public async Task<ActionResult<ServiceResponse<NoteDto>>> UpdatePatientNote(UpdatePatientNoteDto noteDto){
            var response = await _doctorService.UpdatePatientNote(noteDto);

            if (response.Success) return Ok(response);
            return BadRequest(response);
         }



    }
}
