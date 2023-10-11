using AutoMapper;
using HospitalsManagment.Dto.Admin;
using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Entities;
using HospitalsManagment.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace HospitalsManagment.Services
{
    public class AdminService : IAdmin, IComparer<PatientNotesNumbersDto>, IComparer<HospitalsNotesNumbersDto>
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;

        public AdminService(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<SubDoctorDto>> DeleteDoctor(int doctorId)
        {
            var response = new ServiceResponse<SubDoctorDto>();
            try
            {
                var doctor = await _appDbContext.Doctors.Include(x => x.Hospitals)
                                                     .Include(x => x.Wards)
                                                     .Include(x => x.Patients)
                                                     .FirstOrDefaultAsync(x => x.Id == doctorId);
                if(doctor == null)
                {
                    response.Message = "No Such Doctor";
                    return response;
                }
                _appDbContext.Doctors.Remove(doctor);
                await _appDbContext.SaveChangesAsync();
                response.Success = true;
                response.Message = $"Doctor {doctor.Name} {doctor.Surname} Deleted";
                response.Data = _mapper.Map<SubDoctorDto>(doctor);
                return response;

            }
            catch (Exception ex)
            {
                response.Message = "Sth went wrog, try again";
                return response;    
            }
            
           
        }

        public async Task<ServiceResponse<PatientBasicDataDto>> DeletePatient(int patientId)
        {
            var response = new ServiceResponse<PatientBasicDataDto>();
            try
            {
                var patient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.Id == patientId);
                var patientCard =await _appDbContext.PatientCards.FirstOrDefaultAsync(x => x.PatientCardId == patient.PatientCardId);
                if (patient == null || patientCard==null)
                {
                    response.Message = "No Such Patient Registered";
                    return response;
                }
                _appDbContext.Patients.Remove(patient);
                _appDbContext.PatientCards.Remove(patientCard);
                await _appDbContext.SaveChangesAsync();
                response.Message = $"Patient {patient.Name} {patient.Surname} Deleted";
                response.Success = true;
                response.Data = _mapper.Map<PatientBasicDataDto>(patient);
                return response;

            }catch(Exception ex)
            {
                response.Message = "Sth went wrong, try again";
                return response;
            }
        }

        private List<PatientBasicDataDto> ConvertPatientToPatientBasicDataDto(List<Patient> data)
        {
            var dtoList = new List<PatientBasicDataDto> { };
            foreach (var item in data)
            {
                var dto = _mapper.Map<PatientBasicDataDto>(item);
                dtoList.Add(dto);
            }
            return dtoList;
        }

        public async Task<ServiceResponse<List<PatientBasicDataDto>>> GetAllPatients()
        {
            var response = new ServiceResponse<List<PatientBasicDataDto>>();
            try
            {
                var patients = await _appDbContext.Patients.Include(x=>x.Doctor).ToListAsync();
                response.Message = "List of Patients Downloaded";
                response.Success = true;
                response.Data = ConvertPatientToPatientBasicDataDto(patients);
                return response;
            }
            catch(Exception ex)
            {
                response.Message = "Sth went wrong, try again";
                return response;
            }
        }

        private List<SubDoctorDto> ConvertFromDoctorToSubDoctorDto(List<Doctor> doctors)
        {
            var dto = new List<SubDoctorDto>();
            foreach (var doctor in doctors)
            {
                var subDto = _mapper.Map<SubDoctorDto>(doctor);
                dto.Add(subDto);
            }
            return dto;
        }

        public async Task<ServiceResponse<List<SubDoctorDto>>> GetAllDoctors()
        {
            var response = new ServiceResponse<List<SubDoctorDto>>();
            try
            {
                var doctors = await _appDbContext.Doctors.ToListAsync();
                var subDoctorDto = ConvertFromDoctorToSubDoctorDto(doctors);
                response.Message = "All Doctors Downladed";
                response.Success = true;
                response.Data = subDoctorDto;
                

            }catch(Exception ex)
            {
                response.Message = "Sth went wrong, try again";
                
            }
            return response;
        }

        private void PrepareChartNotesData(List<Doctor> data, GetDoctorsDataDto dto)
        {
            foreach (var doctorHospital in data)
            {
               foreach(var hospitalSection in doctorHospital.Hospitals)
                {
                    var hospitalNameDto = new HospitalsNotesNumbersDto();
                    var findHospital = dto.NotesNumbersDtos.Find(x => x.HospitalName == hospitalSection.Name);
                    if (findHospital == null)
                    {
                        hospitalNameDto.HospitalName = hospitalSection.Name;
                        hospitalNameDto.OccuranceNumber = 0;
                        dto.NotesNumbersDtos.Add(hospitalNameDto);
                    }
                }

               foreach(var patient in doctorHospital.Patients)
                {
                    if (patient.PatientCard.Notes.Count == 0) continue;
                    var notesCount = patient.PatientCard.Notes.Count;
                    var patientsHospital = patient.Hospital.Name;
                    var findRightHospitalToAddData = dto.NotesNumbersDtos.Find(x => x.HospitalName == patientsHospital);
                    if(findRightHospitalToAddData != null)
                    {
                        findRightHospitalToAddData.OccuranceNumber += notesCount;
                    }
                }
            }
            dto.NotesNumbersDtos.Sort(Compare);
        }

        private void  PrepareChartNotesPerPatient(GetDoctorsDataDto dto, List<Doctor> data)
        {
            foreach(var doctorsData in data)
            {
                
                foreach(var patient in doctorsData.Patients)
                {
                    var patientNameDto = new PatientNotesNumbersDto();
                    patientNameDto.PatientName = (patient.Name+" "+patient.Surname);
                    patientNameDto.NotesNumbers += patient.PatientCard.Notes.Count;
                    patientNameDto.PatientId = patient.Id;
                    patientNameDto.PatientHospital = patient.Hospital.Name;
                    patientNameDto.PatientCity = patient.Hospital.City;
                    patientNameDto.PatientAge = patient.Age;

                    dto.NotesPerPatient.Add(patientNameDto);
                }
                
            }
            dto.NotesPerPatient.Sort(Compare);
        }



        public async Task<ServiceResponse<GetDoctorsDataDto>> GetDoctorsData()
        {
            var response = new ServiceResponse<GetDoctorsDataDto>();
            try
            {
                var data = await _appDbContext.Doctors.Include(x=>x.Hospitals).Include(x=>x.Patients).ThenInclude(x=>x.PatientCard).ThenInclude(x=>x.Notes).ToListAsync();

                
                var dto = new GetDoctorsDataDto();
                PrepareChartNotesData(data, dto);
                PrepareChartNotesPerPatient(dto, data);

                response.Message = "List od Doctors Downladed";
                response.Data = dto;
                response.Success = true;


            }catch(Exception ex)
            {
                response.Message = "sth Went wrong :"+ex.Message;
            }
            return response;
        }

        public async Task<ServiceResponse<DoctorDataBasedOnPatientIdDto>> GetDoctorBasedOnPatientId(int patientId)
        {
            var response = new ServiceResponse<DoctorDataBasedOnPatientIdDto>();
            try
            {
                var doctorData =await _appDbContext.Doctors.Include(x => x.Patients).ToListAsync();
                var patient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.Id == patientId);
                if (patient != null && doctorData != null)
                {
                    var doctorToFind = new DoctorDataBasedOnPatientIdDto();
                    foreach (var singleDoctor in doctorData)
                    {
                        if (singleDoctor.Patients.Contains(patient))
                        {
                            doctorToFind.Name = singleDoctor.Name;
                            doctorToFind.Surname = singleDoctor.Surname;
                            doctorToFind.DoctorId = singleDoctor.Id;
                            break;
                        }
                    }
                    response.Data = doctorToFind;
                    response.Success = true;
                    response.Message = "Selected Patients Doctor has been found";
                }
                else
                {
                    response.Success = false;
                    response.Message = "No such Doctor or Patient on Your List";
                }
               
               
            }catch(Exception ex)
            {
                response.Message = "sth Went Wrong: " + ex.Message;
            }
            return response;
        }

        private string ConvertWardNameAsEnumToString(DepartmentName ward)
        {
            string wardName = Enum.GetName(typeof(DepartmentName), ward);
            return wardName;
        }


        public async Task<ServiceResponse<List<OccupationOfTheHospitalsDto>>> GetGeneralOccupationOfTheHospitals()
        {
            var response = new ServiceResponse<List<OccupationOfTheHospitalsDto>>();
            try
            {
                var hospitalsData = await _appDbContext.Hospitals.Include(x => x.Wards).ToListAsync();
                var hospitalsReturnList = new List<OccupationOfTheHospitalsDto>();
               
                foreach (var hospital in hospitalsData)
                {
                    var singleHospitalDataToReturn = new OccupationOfTheHospitalsDto();
                    singleHospitalDataToReturn.HospitalName = hospital.Name;
                    singleHospitalDataToReturn.HospitalId = hospital.HospitalId;
                    foreach(var ward in hospital.Wards)
                    {
                        var wardDto = new AdminWardDataDto();
                        var wardNameAsEnum = ward.WardName;
                        wardDto.WardName = ConvertWardNameAsEnumToString(wardNameAsEnum);
                        wardDto.WardId = ward.WardId;
                        wardDto.OccupiedBed = ward.OccupiedBeds;
                        wardDto.MaxCapacity = ward.MaxCapacity;
                        singleHospitalDataToReturn.HospitalsWards.Add(wardDto);

                    }
                    hospitalsReturnList.Add(singleHospitalDataToReturn);
                   
                   
                }
                response.Data = hospitalsReturnList;
                response.Success = true;
                response.Message = "All Hospitals Occupation data Downloaded";
                return response;

            }catch(Exception ex)
            {
                response.Message = "sth Went Wrong: " + ex.Message;
                return response;
            }
            
        }

        public async Task<ServiceResponse<List<GetNotesForAdminDto>>> GetAllNotesForAdmin()
        {
            var response = new ServiceResponse<List<GetNotesForAdminDto>>();
            response.Data = new List<GetNotesForAdminDto>();

            try
            {
                var data = await _appDbContext.Patients.Include(x => x.PatientCard).ThenInclude(y => y.Notes).ToListAsync();
                var notes = new List<GetNotesForAdminDto>();
                foreach(var patient in data)
                {
                    foreach(var note in patient.PatientCard.Notes)
                    {
                        var notesDto = new GetNotesForAdminDto();
                        notesDto.Date = note.Date;
                        notesDto.Id = note.Id;
                        notesDto.Record = note.Record;
                        notesDto.Surname = patient.Surname;
                        notesDto.Name = patient.Name;
                        notes.Add(notesDto);
                    }
                }
                notes.OrderBy(x => x.Date);
                response.Data = notes.OrderBy(x=>x.Date).ToList();
                response.Success = true;
                response.Message = "List of All Notes Downloaded";
                
            }
            catch (Exception ex)
            {
                response.Message = "sth Went Wrong: " + ex.Message;
                
            }

            return response;
        }


        public int Compare(PatientNotesNumbersDto? x, PatientNotesNumbersDto? y)
        {
            return x.NotesNumbers.CompareTo(y.NotesNumbers);
            
        }

        public int Compare(HospitalsNotesNumbersDto? x, HospitalsNotesNumbersDto? y)
        {
            return x.OccuranceNumber.CompareTo(y.OccuranceNumber);
        }

       
    }
}
