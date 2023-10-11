using AutoMapper;
using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Dto.PatientsCard;
using HospitalsManagment.Entities;
using HospitalsManagment.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HospitalsManagment.Services
{
    public class PatientService : IPatient
    {
        private readonly AppDbContext _appDbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public PatientService(AppDbContext appDbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User  //TO USE THIS PROPERLY, CONTROLLER MUST BE AUTHORIZE
            .FindFirstValue(ClaimTypes.NameIdentifier));

        public async  Task<ServiceResponse<PatientBasicDataDto>> GetPatientData()
        {
            var response = new ServiceResponse<PatientBasicDataDto>();
            try
            {
                var patient =await _appDbContext.Patients.Include(x=>x.Doctor).Include(x=>x.Hospital).Include(x=>x.Ward).FirstOrDefaultAsync(x => x.Id == GetUserId());
                if (patient == null)
                {
                    response.Message = "No Such Patient Registered";
                }
                response.Success = true;
                response.Message = $"Patient {patient.Surname} Downloaded";
                response.Data = _mapper.Map<PatientBasicDataDto>(patient);
                return response;


            }catch (Exception ex)
            {
                response.Message = "sth went wrong, try again";
                return response;
            }
        }

        public async Task<ServiceResponse<PatientCardDto>> GetHealthyData()
        {
            var response = new ServiceResponse<PatientCardDto>();
            try
            {
                var patient = await _appDbContext.Patients.Include(x => x.PatientCard).ThenInclude(x=>x.Notes).FirstOrDefaultAsync(x => x.Id == GetUserId());
                var patientCard = patient.PatientCard;
                if (patientCard == null || patient == null)
                {
                    response.Message = "No Such Patient";
                    return response;
                }
                response.Success = true;
                response.Message = $"PatientCard for {patient.Surname} Downloaded";
                response.Data = _mapper.Map<PatientCardDto>(patientCard);
                return response;
            }
            catch(Exception ex)
            {
                response.Message = "Sth went wrong, try again";
                return response;
            }
        }

        public async Task<ServiceResponse<PatientWardDataDto>> GetWardById(int id)
        {
           var response = new ServiceResponse<PatientWardDataDto>();
            try
            {
                var ward = await _appDbContext.Wards.FirstOrDefaultAsync(x => x.WardId == id);
                if(ward == null)
                {
                    response.Message = "No Such Ward Registered";
                    return response;
                }
                var dto = new PatientWardDataDto();
                dto.Capacity = ward.MaxCapacity;
                dto.OccupiedBeds = ward.OccupiedBeds;
                dto.WardId = ward.WardId;
                
                dto.WardNameAsString = Enum.GetName(typeof(DepartmentName), ward.WardName);
                response.Success = true;
                response.Data = dto;
                response.Message = "Ward Data Downloaded";
                return response;
            }catch(Exception ex)
            {
                response.Message = "Srh went wrong: "+ex.Message;
                return response;
            }
        }
    }
}
