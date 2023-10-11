using AutoMapper;
using HospitalsManagment.Dto.WardNameAsStringDto;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Dto.Wards.EqualityComparer;
using HospitalsManagment.Entities;
using HospitalsManagment.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HospitalsManagment.Services
{
    public class WardService : IWard
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _map;

        public WardService(AppDbContext appDbContext, IMapper map)
        {
            _appDbContext = appDbContext;
            _map = map;
        }

        public async Task<ServiceResponse<string>> RemovePatientFromWard(int wardId, int patientId)
        {
            var response = new ServiceResponse<string>();
            try
            {
                var patient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.Id == patientId);
                var ward = await _appDbContext.Wards.Include(x => x.Doctors).FirstOrDefaultAsync(x => x.WardId == wardId);
                if (ward == null || patient == null)
                {
                    response.Success = false;
                    response.Message = "No such Patient or Ward";
                    response.Data = response.Message;
                    return response;
                }

                if (ward.Patients.Any(x => x.Id == patientId))
                {
                    ward.Patients.Remove(patient);
                    await _appDbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Message = $"Patient {patient.Surname} has been removed";
                    response.Data = response.Message;
                    return response;
                }
                else
                {
                    response.Success = false;
                    response.Message = $"Patient {patient.Surname} is not at this Ward";
                    response.Data = response.Message;
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                response.Data = "sth went wrong, try again";
            }
            return response;
        }

        public async Task<ServiceResponse<string>> AddPatientToWard(int wardId, int patienId)
        {
            var response = new ServiceResponse<string>();
            try
            {
                var patient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.Id == patienId);
                var ward = await _appDbContext.Wards.Include(x => x.Patients).FirstOrDefaultAsync(x => x.WardId == wardId);
                if (ward == null || patient == null)
                {
                    response.Success = false;
                    response.Message = "No such Patient or Ward";
                    response.Data = response.Message;
                    return response;
                }
               
                if (ward.Patients.Any(x => x.Id == patienId))
                {
                    response.Success = false;
                    response.Message = $"Patient {patient.Surname} has already been asigned";
                    response.Data = response.Message;
                    return response;
                }
                ward.Patients.Add(patient);
                await _appDbContext.SaveChangesAsync();
                response.Message = $"Patient {patient.Surname} was Added";
                response.Success = true;
                response.Data = response.Message;

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                response.Data = "sth went wrong, try again";
            }
            return response;
        }

        public async Task<ServiceResponse<string>> RemoveDoctorFromWard(int wardId, int doctorId)
        {
            var response = new ServiceResponse<string>();
            try
            {
                var doctor = await _appDbContext.Doctors.FirstOrDefaultAsync(x => x.Id == doctorId);
                var ward = await _appDbContext.Wards.Include(x => x.Doctors).FirstOrDefaultAsync(x => x.WardId == wardId);
                if (ward == null || doctor == null)
                {
                    response.Success = false;
                    response.Message = "No such Doctor or Ward";
                    response.Data = response.Message;
                    return response;
                }
                
                if (ward.Doctors.Any(x => x.Id == doctorId))
                {
                    ward.Doctors.Remove(doctor);
                    await _appDbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Message = $"Doctor {doctor.Name} has been removed";
                    response.Data = response.Message;
                    return response;
                }
                else
                {
                    response.Success = false;
                    response.Message = $"Doctor {doctor.Name} has not Worked in this Ward";
                    response.Data = response.Message;
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                response.Data = "sth went wrong, try again";
            }
            return response;
        }

        public async Task<ServiceResponse<string>> AddDoctorToWard(int wardId, int doctorId)
        {
            var response = new ServiceResponse<string>();
            try
            {
                var doctor = await _appDbContext.Doctors.FirstOrDefaultAsync(x => x.Id == doctorId);
                var ward = await _appDbContext.Wards.Include(x=>x.Doctors).FirstOrDefaultAsync(x=>x.WardId==wardId);
                if(ward==null || doctor == null)
                {
                    response.Success = false;
                    response.Message = "No such Doctor or Ward";
                    response.Data = response.Message;
                    return response;
                }
                var test = ward.Doctors.Any(x => x.Id == doctorId);
                if (ward.Doctors.Any(x => x.Id == doctorId))
                {
                    response.Success = false;
                    response.Message = $"Doctor {doctor.Name} has already been asigned";
                    response.Data = response.Message;
                    return response;
                }
                ward.Doctors.Add(doctor);
                await _appDbContext.SaveChangesAsync();
                response.Message = $"Doctor {doctor.Name} was Added";
                response.Success = true;
                response.Data = response.Message;

            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                response.Data = "sth went wrong, try again";
            }
            return response;
        }

        public async Task<ServiceResponse<WardDto>> DeleteWard(int wardId)
        {
            var response = new ServiceResponse<WardDto>();
            try
            {
                var wardToDelete = await _appDbContext.Wards.FirstOrDefaultAsync(x=>x.WardId == wardId);
                if(wardToDelete == null)
                {
                    response.Message = "Such Ward does not exist";
                    response.Success = false;
                }
                else
                {
                    _appDbContext.Wards.Remove(wardToDelete);
                    await _appDbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Data = _map.Map<WardDto>(wardToDelete);
                    response.Message = $"Ward {wardToDelete.WardName} Deleted";
                }

            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ServiceResponse<List<GetAllWardsForAdminDto>>> GetAllWardsNotAsignedToSelectedHospital(int hospitalId)
        {
            var response = new ServiceResponse<List<GetAllWardsForAdminDto>>();
            try
            {
                var serviceResponseOfAddedToHospitalWards = await GetAllWardByHospitalId(hospitalId);
                var wardsAlreadyAddedToHospital = serviceResponseOfAddedToHospitalWards.Data;

                var allAddedWardsNames = Enum.GetNames(typeof(DepartmentName)).ToList();
                var allAddedWardsValues = Enum.GetValues(typeof(DepartmentName));
                var possibleWardsToChose = new List<GetAllWardsForAdminDto>();

                for (int i = 0; i < allAddedWardsNames.Count; i++)
                {
                    var wardToChose = new GetAllWardsForAdminDto();
                    wardToChose.title = allAddedWardsNames[i];
                    wardToChose.id = (DepartmentName)i;
                    possibleWardsToChose.Add(wardToChose);
                }

                var returnData = possibleWardsToChose.Except(wardsAlreadyAddedToHospital, new GetAllWardsForAdminDtoComparer()).ToList();
                response.Data = returnData;
                response.Success = true;
                response.Message = "Wards not Used So far in this hospital downloaded";

            }catch (Exception ex)
            {
                response.Message = "Sth went wrong: " + ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetAllWardsForAdminDto>>> GetAllWardByHospitalId(int hospitalId)
        {
            var response = new ServiceResponse<List<GetAllWardsForAdminDto>>();
            try
            {
                var wards = await _appDbContext.Wards.Where(x=>x.HospitalId==hospitalId).Include(x=>x.Doctors).ToListAsync();
                var wardsDto = ConvertWardIntoGetAllWardsForAdminDto(wards);
                response.Data = wardsDto;
                response.Message = $"Hospital's donwloaded";
                response.Success = true;
                if (wards.Count == 0)
                {
                    response.Message = "Hospital Does not exist";
                }

            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;

            }
            return response;
        }

        private List<GetAllWardsForAdminDto> ConvertWardIntoGetAllWardsForAdminDto(List<Ward> data)
        {
            var returnData = new List<GetAllWardsForAdminDto>();
            foreach (var ward in data)
            {
                var dto = new GetAllWardsForAdminDto();
                dto.id = ward.WardName;
                dto.WardId = ward.WardId;
                dto.OccupiedBeds = ward.OccupiedBeds;
                dto.MaxCapacity = ward.MaxCapacity;
                dto.HospitalId = ward.HospitalId;
                dto.title = Enum.GetName<DepartmentName>(ward.WardName);
                returnData.Add(dto);
            }

            return returnData;
        }

        public async Task<ServiceResponse<List<GetAllWardsForAdminDto>>> GetAllWardsRegistered()
        {
            var response = new ServiceResponse<List<GetAllWardsForAdminDto>>();
            try
            {
                var allWards = await _appDbContext.Wards.ToListAsync();
                var dtoWards = ConvertWardIntoGetAllWardsForAdminDto(allWards);
                response.Data = dtoWards;
                response.Success = true;
                response.Message = "Downladed Wards";
            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }
            return response;
           
        }

        public async Task<ServiceResponse<PostWardDto>> PostNewWard(PostWardDto dto)
        {
            var response = new ServiceResponse<PostWardDto>();
            var hospital =await _appDbContext.Hospitals.Include(x=>x.Wards).FirstOrDefaultAsync(x=>x.HospitalId==dto.HospitalId);
            var checkIfSuchWardExistInHospital = hospital.Wards.FirstOrDefault(x=>x.WardName==dto.WardName);
            if(hospital == null)
            {
                response.Success = false;
                response.Message = "No such Hospital";
                return response;
            }
            if (checkIfSuchWardExistInHospital is Ward || checkIfSuchWardExistInHospital !=null)
            {
                response.Success = true;
                response.Message = "Ward Already Exist in this Hospital";
                return response;
            }
            if (checkIfSuchWardExistInHospital == null)
            {
                var ward = new Ward() { HospitalId = dto.HospitalId, MaxCapacity = dto.MaxCapacity, OccupiedBeds = dto.OccupiedBeds, WardName = dto.WardName, Hospital = hospital, Doctors = new List<Doctor>(), Patients = new List<Patient>() };
                try
                {
                    _appDbContext.Wards.Add(ward);
                    await _appDbContext.SaveChangesAsync();
                    response.Message = $"Ward {dto.WardName} was added";
                    response.Data = dto;
                    response.Success = true;
                    return response;

                }
                catch (Exception ex)
                {
                    response.Success = false;
                    response.Message = ex.Message;
                    return response;
                }

            }
            response.Success = false;
            return response;
            
        }

        public async Task<ServiceResponse<List<UpdateWardAdminDto>>> getAllWardsAlreadyAddedToHospital(int hospitalId)
        {
            var hospital  = await _appDbContext.Hospitals.Include(x=>x.Wards).FirstOrDefaultAsync(x=>x.HospitalId==hospitalId);
            var response = new ServiceResponse<List<UpdateWardAdminDto>>();
            var hospitalWards = new List<UpdateWardAdminDto>();
            if (hospital == null)
            {
                response.Message = "No Such Hospital";
            }
            else
            {
                var wards = hospital.Wards;
                wards.ForEach(ward =>
                {
                    var itemToAdd = new UpdateWardAdminDto();
                    itemToAdd.id = ward.WardId;
                    itemToAdd.title = Enum.GetName<DepartmentName>(ward.WardName);
                    itemToAdd.maxCapacity = ward.MaxCapacity;
                    itemToAdd.OccupiedBeds = ward.OccupiedBeds;
                    hospitalWards.Add(itemToAdd);


                });
                
                response.Success = true;
                response.Message = "List of Wards Donwloaded";
                response.Data = hospitalWards;
                
            }
            return response;

        }

       

        public async Task<ServiceResponse<UpdateWardPropertiesDto>> UpdateWard(UpdateWardPropertiesDto dto)
        {
            var response = new ServiceResponse<UpdateWardPropertiesDto>();
            try
            {
                var wardToUpdate = await _appDbContext.Wards.FirstOrDefaultAsync(x => x.WardId == dto.WardId);
                if(wardToUpdate == null)
                {
                    response.Message = "No Such Ward";
                    response.Success = false;
                }
                else
                {
                    wardToUpdate.MaxCapacity = dto.MaxCapacity;
                    wardToUpdate.OccupiedBeds = dto.OccupiedBeds;
                    await _appDbContext.SaveChangesAsync();
                    response.Data = dto;
                    response.Success=true;
                    response.Message = $"Ward {Enum.GetName<DepartmentName>(wardToUpdate.WardName)} Updated";
                }

            }catch(Exception ex)
            {
                response.Success=false;
                response.Message=ex.Message;
            }
            return response;
        }

        public async Task<ServiceResponse<string>> UpdateWardsHospital(int wardId, int hospitalId)
        {
            var response = new ServiceResponse<string>();
            try
            {
                var newHospitalToAsign = await _appDbContext.Hospitals.FirstOrDefaultAsync(x => x.HospitalId == hospitalId);
                var ward = await _appDbContext.Wards.FirstOrDefaultAsync(x => x.WardId == wardId);

                var hospitalContainSuchWard = newHospitalToAsign.Wards.FirstOrDefault(x => (int) x.WardName == wardId);

                if(newHospitalToAsign == null || ward == null)
                {
                    response.Success = false;
                    response.Message = "No such Ward or Hospital";
                }else if(hospitalContainSuchWard is Ward)
                {
                    response.Success = true;
                    response.Message = "Such Ward already Exist";
                }
                else
                {
                    ward.Hospital = newHospitalToAsign;
                    ward.HospitalId = newHospitalToAsign.HospitalId;
                    await _appDbContext.SaveChangesAsync();
                    response.Message = $"Hospital has been asigned to Ward";
                    response.Success = true;
                    response.Data = $"Hospital {newHospitalToAsign.Name} asing to Ward {ward.WardName}";
                }

            }catch(Exception e)
            {
                response.Success = false;
                response.Message="Sorry sth went wrong,try again";
            }
            return response;
        }

        private List<GetAllWardDto> ConvertWardInotWardDto(List<Ward> wards)
        {
            var dto = new List<GetAllWardDto>();
            foreach (var ward in wards)
            {
                var wardDto = _map.Map<GetAllWardDto>(ward);
                dto.Add(wardDto);
            }
            return dto;
        }
    }
}
