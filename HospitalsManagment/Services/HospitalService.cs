using AutoMapper;
using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Entities;
using HospitalsManagment.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HospitalsManagment.Services
{
    public class HospitalService : IHospital
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;

        public HospitalService(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<UpdateHospitalAdminDto>> UpdateHospitalBasicData(UpdateHospitalAdminDto dto)
        {
            var response = new ServiceResponse<UpdateHospitalAdminDto>();
            try
            {
                var hospital =await _appDbContext.Hospitals.FirstOrDefaultAsync(x=>x.HospitalId == dto.HospitalId);
                if (hospital != null)
                {
                    hospital.Country = dto.Country;
                    hospital.Street = dto.Street;
                    hospital.City = dto.City;
                    await _appDbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Message = "Hospital Updated";
                    response.Data = dto;
                    return response;
                }
                response.Message = "Can\'t Find Such Hospital";
                return response;

            }catch (Exception ex)
            {
                response.Message = ex.Message;
                return response;
            }
           
            
        }

        public async Task<ServiceResponse<Hospital>> AddNewHospital(AddHospitalDto dto)
        {
            var response = new ServiceResponse<Hospital>();
            if (NewHospitalValidation(dto))
            {
                var hospital = new Hospital();
                hospital.Street = dto.Street;
                hospital.City = dto.City;
                hospital.Country = dto.Country;
                hospital.Name = dto.Name;
                hospital.Wards = new List<Ward>() { };
                hospital.Doctors = new List<Doctor> { };
                try
                {
                    _appDbContext.Hospitals.Add(hospital);
                    var findSameHospital = _appDbContext.Hospitals.Any(x => x.Name == dto.Name && x.City == dto.City && x.Country == dto.Country && x.Street == dto.Street);
                    if (findSameHospital)
                    {
                        response.Success = true;
                        response.Message = "Such Hospital Already Exist";
                        return response;
                    }
                    await _appDbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Message = $"Hospital {hospital.Name} has been added";
                    response.Data = hospital;
                    return response;
                }catch (Exception ex)
                {
                    response.Success = false;
                    response.Message=ex.Message;
                    response.Data = hospital;
                    return response;
                }
            }
            response.Success = false;
            response.Message = "Hospital already exist or some fields are empty";
            return response;

            
        }

        public async Task<ServiceResponse<DeleteHospitalDto>> DeleteHospital(int hospitalId)
        {
            var hotelResponse = new ServiceResponse<DeleteHospitalDto>();
            try
            {
                var hotels = await _appDbContext.Hospitals.FirstOrDefaultAsync(x=>x.HospitalId==hospitalId);
                if (hotels == null)
                {
                    hotelResponse.Success = false;
                    hotelResponse.Message = "Not found such Hospital";
                    return hotelResponse;
                }
                _appDbContext.Hospitals.Remove(hotels);
                await _appDbContext.SaveChangesAsync();
                var dto = _mapper.Map<DeleteHospitalDto>(hotels);
                hotelResponse.Data = dto;
                hotelResponse.Success = true;
                hotelResponse.Message = $"Hotel {hotels.Name} has been deleted";
                return hotelResponse;


            }catch(Exception ex)
            {
                hotelResponse.Success = false;
                hotelResponse.Message = ex.Message;
                return hotelResponse;
            }
        }

        private List<WardNameAsStringDto> CovertEnumNumberToString(List<SubWardDto> subWardsDto)
        {
            var wardNameStringDto = new List<WardNameAsStringDto>();
            foreach (var subWard in subWardsDto)
            {
                var stringDto = new WardNameAsStringDto();
                stringDto.Hospital = subWard.Hospital;
                stringDto.WardName = Enum.GetName(typeof(DepartmentName), subWard.WardName);
                stringDto.WardNameAsEnumNumber = subWard.WardName;
                stringDto.WardId = subWard.WardId;
                stringDto.HospitalId = subWard.HospitalId;
                stringDto.MaxCapacity = subWard.MaxCapacity;
                stringDto.OccupiedBeds = subWard.OccupiedBeds;
                wardNameStringDto.Add(stringDto);
            }
            return wardNameStringDto;
        }

        public async Task<ServiceResponse<List<GetHospitalDto>>> GetAllHospitals()
        {
            var response = new ServiceResponse<List<GetHospitalDto>>();
            try
            {
                var allHospitals = await _appDbContext.Hospitals.Include(x=>x.Wards).ThenInclude(x=>x.Doctors).ToListAsync();
                if (allHospitals.Any())
                {
                    response.Data = ConvertHospitalToGetHospitalDto(allHospitals);
                    response.Success = true;
                    response.Message = "List of hospitals has been downloaded";
                    return response;
                }
                response.Message = "No Hospitals Registered";
                response.Success = true;
                response.Data = ConvertHospitalToGetHospitalDto(allHospitals);
                return response;
            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async  Task<ServiceResponse<GetHospitalDto>> GetHospitalById(int id)
        {
            var response = new ServiceResponse<GetHospitalDto>();
            try
            {
                var hospital = await _appDbContext.Hospitals.Include(x=>x.Wards).ThenInclude(x=>x.Doctors).FirstOrDefaultAsync(x => x.HospitalId == id);
                if (hospital == null)
                {
                    response.Success = false;
                    response.Message = "No such Hospital in Database";
                    return response;
                }
                response.Success = true;
                response.Data =_mapper.Map<GetHospitalDto>(hospital);
                response.Message = $"Hospital: {hospital.Name} downloaded";
                return response;

            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
            

        }

        public async Task<ServiceResponse<UpdateHospitalDto>> AsignOldHospitalValueToUpdateHospital(int hospitalId)
        {
            var hospitalResponse = new ServiceResponse<UpdateHospitalDto>();
            try
            {
                var hospital = await _appDbContext.Hospitals.FirstOrDefaultAsync(x => x.HospitalId == hospitalId);
                if (hospital == null)
                {
                    hospitalResponse.Success = false;
                    hospitalResponse.Message = "Cant find such Hospital";
                    return hospitalResponse;
                }
                var updateHospitalDto = AsignOldHospitalValueToUpdateDto(hospital);
                hospitalResponse.Data = updateHospitalDto;
                hospitalResponse.Success = true;
                hospitalResponse.Message = "Convertion completed";
                return hospitalResponse;
                


            }catch(Exception ex)
            {
                hospitalResponse.Success = false;
                hospitalResponse.Message = ex.Message;
                return hospitalResponse;
            }
        }

        private List<GetHospitalDto> ConvertHospitalToGetHospitalDto(List<Hospital> hospitals)
        {
            var dtoHospitals = new List<GetHospitalDto>();

            foreach (Hospital hospital in hospitals)
            {
                var dto = _mapper.Map<GetHospitalDto>(hospital);
                
                var hospitalWards = hospital.Wards;
                for(var i =0; i<hospitalWards.Count; i++)
                {
                    var wardNameAsEnum = hospitalWards[i].WardName;
                    dto.Wards[i].WardNameAsEnumNumber = wardNameAsEnum;
                }
               
                dtoHospitals.Add(dto);

            }
            return dtoHospitals;

        }

        private bool NewHospitalValidation(AddHospitalDto dto)
        {
            
            if (dto == null) return false;
            else if (dto.Street.Length > 0 && dto.Country.Length > 0 && dto.Name.Length > 0 && dto.City.Length > 0 ) return true;
            else return false;
        }

        private  UpdateHospitalDto AsignOldHospitalValueToUpdateDto(Hospital hospital)
        {
            var dto = new UpdateHospitalDto();
            dto.NewName = hospital.Name;
            dto.NewCity = hospital.City;
            dto.NewStreet = hospital.Street;
            dto.NewCountry = hospital.Country;
            return dto;

        }
    }
}
