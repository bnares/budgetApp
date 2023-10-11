using AutoMapper;
using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Dto.Notes;
using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Dto.PatientsCard;
using HospitalsManagment.Dto.WardNameAsStringDto;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Entities;
using HospitalsManagment.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Security.Claims;

namespace HospitalsManagment.Services
{
    public class DoctorService : IDoctor
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DoctorService(AppDbContext appDbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            
        }

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User  //TO USE THIS PROPERLY, CONTROLLER MUST BE AUTHORIZE
            .FindFirstValue(ClaimTypes.NameIdentifier));

        public async  Task<ServiceResponse<GetHospitalDto>> AddHospitalToDoctor(int hospitalId)
        {
            var response = new ServiceResponse<GetHospitalDto>();
            try
            {
                var doctor = await _appDbContext.Doctors.Include(x=>x.Hospitals).FirstOrDefaultAsync(x => x.Id == GetUserId());
                var hospital = await _appDbContext.Hospitals.FirstOrDefaultAsync(x => x.HospitalId == hospitalId);
                if(doctor == null || hospital == null)
                {
                    response.Success = false;
                    response.Message = "No such Doctor or Hispital";
                    return response;
                }
                if (doctor.Hospitals.Any(x=>x.HospitalId==hospital.HospitalId))
                {
                    response.Success = true;
                    response.Message = $"Such Hospital already on Your List";
                    return response;
                }
                doctor.Hospitals.Add(hospital);
                await _appDbContext.SaveChangesAsync();
                response.Message = $"Hospital {hospital.Name} Added";
                response.Success = true;
                response.Data = _mapper.Map<GetHospitalDto>(hospital);
                return response;


            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
            
        }

        private void validationOfDoctorsPatientAsigment(Patient patient, Doctor doctor, Hospital hospital, Ward ward, ref ServiceResponse<string> response)
        {
            if (doctor == null || patient == null || hospital==null || ward ==null)
            {
                response.Success = false;
                response.Message = "No such Doctor, Patient or Hospital Exist";
                return;
            }
            if(doctor.Hospitals.Count==0 || doctor.Wards.Count == 0)
            {
                response.Message = "Your Hospitals or Wards List is Empty";
                return;
            }
           
            if (doctor.Patients.Any(x => x.Id == patient.Id))
            {
                response.Success = true;
                response.Message = $"Such Patient already on Your List";
                return;
                
            }
            if(doctor.Hospitals.Contains(hospital)&& hospital.Wards.Contains(ward) && doctor.Wards.Contains(ward))
            {
                ward.OccupiedBeds++;
                patient.PatientCard.DoctorId = doctor.Id;
                patient.WardId = ward.WardId;
                patient.Ward = ward;
                patient.Hospital = hospital;
                patient.HospitalId = hospital.HospitalId;
                doctor.Patients.Add(patient);
                _appDbContext.SaveChanges();
                response.Message = $"Patient {patient.Name} Added";
                response.Success = true;
                response.Data = $"Pateint {patient.Surname} Added";
                return;

            }
            else
            {
                response.Message = "No such Hospital or Ward on Your List, check hospitals or Wards List";
                return;
            }
        }

        private bool isWardFull(Ward ward)
        {
            if (ward.MaxCapacity > ward.OccupiedBeds)
            {
                return false;
            }
            return true;
        }

        public async Task<ServiceResponse<string>> AddPatientToDoctor(int patientId, int hospitalId, int wardId)
        {
            var response = new ServiceResponse<string>();
            try
            {
                var doctor = await _appDbContext.Doctors.Include(x => x.Patients).Include(x=>x.Hospitals).Include(x=>x.Wards).FirstOrDefaultAsync(x => x.Id == GetUserId());
                var patient = await _appDbContext.Patients.Include(x=>x.PatientCard).FirstOrDefaultAsync(x => x.Id == patientId);
                var hospital = await _appDbContext.Hospitals.FirstOrDefaultAsync(x=>x.HospitalId == hospitalId);
                var ward = await _appDbContext.Wards.FirstOrDefaultAsync(x=>x.WardId==wardId);
                if (isWardFull(ward))
                {
                    response.Message = $"Ward {ward.WardName} is Full";
                    response.Success = true;
                    return response;
                }
                validationOfDoctorsPatientAsigment(patient, doctor, hospital, ward, ref response);
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        private bool ChechIfWardExistInAnyOfCurrentlyRegisteredDoctorsHospitals(Ward ward, List<Hospital> hospitals)
        {
            int count = 0;
            foreach(var hospital in hospitals)
            {
                if (hospital.Wards.Contains(ward))
                {
                    count++;
                }
            }
            return count == 0?false:true;
        }

        private bool CheckIfInEachDoctorsHospitalIsOnlyOneWardFromThisHospital(Ward wardToAdd, List<Ward> wards)
        {
            int count = 0;
            foreach(Ward ward  in wards){
                if (ward.HospitalId == wardToAdd.HospitalId)
                {
                    count++;
                }
            }
            return count==0?true:false;
        }

        public async Task<ServiceResponse<WardDto>> AddWardToDoctor(int hospitalId,int wardId)
        {
            var response = new ServiceResponse<WardDto>();
            try
            {
                var doctor = await _appDbContext.Doctors.Include(x => x.Wards).Include(x=>x.Hospitals).FirstOrDefaultAsync(x => x.Id == GetUserId());
                var ward = await _appDbContext.Wards.FirstOrDefaultAsync(x => x.WardId == wardId);
                var hospital = await _appDbContext.Hospitals.FirstOrDefaultAsync(x => x.HospitalId == hospitalId);
                var doctorHospitals = doctor.Hospitals;
                if (ward == null||hospital==null)
                {
                    response.Success = false;
                    response.Message = "No such Ward or Hospital on Your List";
                    return response;
                }else if(doctor == null){
                    response.Success = false;
                    response.Message = "No such Doctor exist";
                    return response;
                }else if(doctorHospitals.Contains(hospital) == false)
                {
                    response.Success = false;
                    response.Message = "There is no such Hospital on Your List";
                    return response;
                }else if(ChechIfWardExistInAnyOfCurrentlyRegisteredDoctorsHospitals(ward, doctorHospitals) == false)
                {
                    response.Success = false;
                    response.Message = "Your Hospitals are not posses this Ward";
                    return response;
                }
                 else if (!CheckIfInEachDoctorsHospitalIsOnlyOneWardFromThisHospital(ward, doctor.Wards))
                {
                    response.Message = "You Can Work only in One Ward in each Hospital";
                    response.Success = true;
                    return response;
                }
                else if (doctor.Wards.Any(x => x.WardId == ward.WardId))
                {
                    response.Success = true;
                    response.Message = $"Ward {ward.WardName} already On Your List";
                    return response;
                }
                else
                {
                    doctor.Wards.Add(ward);
                    await _appDbContext.SaveChangesAsync();
                    response.Message = $"Ward {ward.WardName} Added";
                    response.Success = true;
                    response.Data = _mapper.Map<WardDto>(ward);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Sorry Sth went wrong, try again";
                return response;
            }
        }

       

        private List<DisplayHospitalDto> ConvertHospitalToDisplayHospitalDto(List<Hospital> dto)
        {
            var hospitalDto = new List<DisplayHospitalDto>();
            foreach(var hospital in dto)
            {
                //var displayHospitalDto = _mapper.Map<DisplayHospitalDto>(hospital);
                //hospitalDto.Add(displayHospitalDto);
                var displayHospitalDto = new DisplayHospitalDto();
                displayHospitalDto.HospitalId = hospital.HospitalId;
                displayHospitalDto.Name = hospital.Name;
                displayHospitalDto.City = hospital.City;
                displayHospitalDto.Country = hospital.Country;
                displayHospitalDto.Street = hospital.Street;
               
                foreach(var ward in hospital.Wards)
                {
                    var wardDataPresentedInHispital = new WardDataPresentedInHospitalDto();
                    wardDataPresentedInHispital.WardId = ward.WardId;
                    wardDataPresentedInHispital.HospitalId = ward.HospitalId;
                    wardDataPresentedInHispital.WardNameAsEnumNumber = ward.WardName;
                    wardDataPresentedInHispital.MaxCapacity = ward.MaxCapacity;
                    wardDataPresentedInHispital.OccupiedBeds = ward.OccupiedBeds;
                    displayHospitalDto.Wards.Add(wardDataPresentedInHispital);
                }

                hospitalDto.Add(displayHospitalDto);
            }
            return hospitalDto;
        }

        public async Task<ServiceResponse<List<DisplayHospitalDto>>> GetAllDoctorsHospitals()
        {
            var response = new ServiceResponse<List<DisplayHospitalDto>>();
            try
            {
                var currentUser = await _appDbContext.Doctors.Include(x=>x.Hospitals).Include(x=>x.Wards).FirstOrDefaultAsync(x => x.Id == GetUserId());
                if (currentUser == null)
                {
                    response.Success=false;
                    response.Message = "No such User";
                    return response;
                }
                var doctorsHospitals = currentUser.Hospitals;
                var hospitalDto = ConvertHospitalToDisplayHospitalDto(doctorsHospitals);
                response.Success = true;
                response.Data = hospitalDto;
                response.Message = "Your Hospitals List";
                return response;

            }catch(Exception ex)
            {
                response.Message = ex.Message;
                response.Success = false;
                return response;
            }
        }

        public async Task<ServiceResponse<List<NotAsignedPatientsDto>>> GetNotAsignedPatients()
        {
            var response = new ServiceResponse<List<NotAsignedPatientsDto>>();
            try
            {
                var freePatients = await _appDbContext.Patients.Where(x => x.HospitalId == null).Where(x => x.WardId == null).ToListAsync();
                if (!freePatients.Any()) {
                    response.Success = true;
                    response.Message = "No not asigned patient";
                    return response;
                }
                else
                {
                    var dto = new List<NotAsignedPatientsDto>();
                    response.Success = true;
                    response.Message = "List ot not asigned patients downloaded";
                    foreach (var patient in freePatients)
                    {
                        dto.Add(_mapper.Map<NotAsignedPatientsDto>(patient));
                    }
                    response.Data = dto;
                }
            }
            catch(Exception ex)
            {
                response.Message = ex.Message;
                response.Success = false;
                return response;
            }
            return response;
        }

        private List<PatientDto> ConvertPatientToPatientDto(List<Patient> patients)
        {
            var dto = new List<PatientDto>();
            foreach (var patient in patients)
            {
                var patientDto = _mapper.Map<PatientDto>(patient);
                patientDto.Ward = patient.Ward;
                dto.Add(patientDto);
            }
            return dto;
        }

        

        public async Task<ServiceResponse<List<PatientDto>>> GetAllDoctorsPatients()
        {
            var response = new ServiceResponse<List<PatientDto>>();
            try
            {
                var currentUser = await _appDbContext.Doctors.Include(x=>x.Wards).ThenInclude(x=>x.Patients).Include(x => x.Patients).ThenInclude(x=>x.PatientCard).ThenInclude(x=>x.Notes).FirstOrDefaultAsync(x => x.Id == GetUserId());
                if(currentUser == null)
                {
                    response.Success = false;
                    response.Message = "No such Doctor registered";
                    return response;
                }
                response.Success = true;
                response.Message = "Patients List downloaded";
                response.Data = ConvertPatientToPatientDto(currentUser.Patients);
                return response;
            }catch(Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        private List<DoctorsPatientsWardsDto> ConvertPatientToDoctorPatientsWardsDto(List<Patient> doctorPatients)
        {
            var dto = new List<DoctorsPatientsWardsDto>();
            var allDocotrsWards = _appDbContext.Doctors.Include(x => x.Wards).FirstOrDefault(x=>x.Id==GetUserId());
            foreach(var ward in allDocotrsWards.Wards)
            {
                var introData = new DoctorsPatientsWardsDto();
                introData.WardId = ward.WardId;
                introData.WardName = ward.WardName;
                introData.Patients = new List<DoctorPatientsDto>();
                dto.Add(introData);
            }

            foreach(var doctorPatientDto in dto)
            {
                foreach(var patient in doctorPatients)
                {
                    if (doctorPatientDto.WardId == patient.WardId)
                    {
                        var patientToAddDto = new DoctorPatientsDto();
                        patientToAddDto.Id = patient.Id;
                        patientToAddDto.Surname = patient.Surname;
                        patientToAddDto.Name = patient.Name;
                        patientToAddDto.Age = patient.Age;
                        doctorPatientDto.Patients.Add(patientToAddDto);
                    }
                }
            }
            return dto;
        }

        public async Task<ServiceResponse<List<DoctorsPatientsWardsDto>>> GetDooctorsPatientsWards()
        {
            var response =new ServiceResponse<List<DoctorsPatientsWardsDto>>();
            try
            {
                var currentUser = await _appDbContext.Doctors.Include(x => x.Patients).FirstOrDefaultAsync((x => x.Id == GetUserId()));
                response.Success = true;
                response.Message = "Patients Wards Downloaded";
                response.Data = ConvertPatientToDoctorPatientsWardsDto(currentUser.Patients);
                return response;
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }

        }

        private List<SubWardDto> ConvertWardToSubWardDto(List<Ward> wards)
        {
            var dto = new List<SubWardDto>();
            foreach (var ward in wards)
            {
                dto.Add(_mapper.Map<SubWardDto>(ward));
            }
            return dto;
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

        public async Task<ServiceResponse<List<WardNameAsStringDto>>> GetAllDoctorsWards()
        {
            var response = new ServiceResponse<List<WardNameAsStringDto>>();
            try
            {
                var currentUser = await _appDbContext.Doctors.Include(x => x.Wards).ThenInclude(x=>x.Patients).Include(x=>x.Hospitals).FirstOrDefaultAsync(x => x.Id == GetUserId());
                if (currentUser == null)
                {
                    response.Success = false;
                    response.Message = "No such Doctor registered";
                    return response;
                }
                response.Success = true;
                response.Message = "Wards List downloaded";
                response.Data = CovertEnumNumberToString(ConvertWardToSubWardDto(currentUser.Wards));
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<PatientDto>> GetDoctorsPatient( int patientId)
        {
            var response = new ServiceResponse<PatientDto>();
            try
            {
                var patient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.Id == patientId && x.Doctor.Id==GetUserId());
                var doctor = await _appDbContext.Doctors.Include(x=>x.Patients).FirstOrDefaultAsync(x => x.Id == GetUserId());
                if (patient == null || doctor == null || doctor.Patients.Contains(patient)==false)
                {
                    response.Success=false;
                    response.Message = "No such Patient Registered";
                    return response;
                }
                response.Success = true;
                response.Message = $"Patient {patient.Surname} Downloaded";
                response.Data = _mapper.Map<PatientDto>(patient);
                return response;

            }
            catch(Exception ex)
            {
                response.Success = false;
                response.Message = "Sth went wrong,try again";
                return response;

            }
        }

        public async Task<ServiceResponse<PatientCardDto>> GetDoctorsPatientCard(int patientId)
        {
            var response = new ServiceResponse<PatientCardDto>();
            try
            {
                var patient = await _appDbContext.Patients.Include(x=>x.PatientCard).ThenInclude(x=>x.Notes).FirstOrDefaultAsync(x => x.Id == patientId && x.Doctor.Id == GetUserId());
                var doctor = await _appDbContext.Doctors.Include(x => x.Patients).FirstOrDefaultAsync(x => x.Id == GetUserId());
                if (patient == null || doctor == null || doctor.Patients.Contains(patient) == false)
                {
                    response.Success = false;
                    response.Message = "No such Patient Registered";
                    return response;
                }
                response.Success = true;
                response.Message = $"Patient {patient.Surname} Card Downloaded";
                response.Data = _mapper.Map<PatientCardDto>(patient.PatientCard);
                return response;

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Sth went wrong,try again";
                return response;

            }
        }

        public async Task<ServiceResponse<DisplayHospitalDto>> RemoveHispitalFromDoctor(int hospitalId)
        {
            var response = new ServiceResponse<DisplayHospitalDto>();
            try
            {
                var doctor = await _appDbContext.Doctors.Include(x=>x.Hospitals).Include(x=>x.Wards).Include(x=>x.Patients).FirstOrDefaultAsync(x => x.Id == GetUserId());
                var hospital = await _appDbContext.Hospitals.FirstOrDefaultAsync(x => x.HospitalId == hospitalId);
                var wardToRemove = doctor.Wards.FirstOrDefault(x=>x.HospitalId==hospitalId);
               
                if(doctor==null|| hospital == null)
                {
                    response.Success = false;
                    response.Message = "No such Doctor or Hispital";
                    return response;
                }
                if (doctor.Hospitals.Any(x => x.HospitalId == hospital.HospitalId))
                {
                    var patientToRemove = doctor.Patients.FirstOrDefault(x => x.DoctorId == doctor.Id);
                    doctor.Hospitals.Remove(hospital);
                    doctor.Wards.Remove(wardToRemove);
                    doctor.Patients.Remove(patientToRemove);
                    await _appDbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Message = "Hospital was deleted";
                    response.Data = _mapper.Map<DisplayHospitalDto>(hospital);
                }
                else
                {
                    response.Success = false;
                    response.Message = $"No such Hospital in Doctor's {doctor.Surname} list";
                }
                return response;
            }catch(Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<string>> RemovePatientFromDoctor(int patientId)
        {
            var response = new ServiceResponse<string>();
            try
            {
                var doctor = await _appDbContext.Doctors.Include(x => x.Patients).FirstOrDefaultAsync(x => x.Id == GetUserId());
                var patient = await _appDbContext.Patients.Include(x=>x.PatientCard).Include(x=>x.Ward).FirstOrDefaultAsync(x => x.Id == patientId);
                if (doctor == null || patient == null)
                {
                    response.Success = false;
                    response.Message = "No such Patient on Your List";
                    return response;
                }
                if (doctor.Patients.Any(x => x.Id == patient.Id))
                {
                    patient.Ward.OccupiedBeds--;
                    patient.PatientCard.DoctorId = null;
                    patient.Ward = null;
                    patient.WardId = null;
                    patient.Hospital = null;
                    patient.HospitalId = null;
                    doctor.Patients.Remove(patient);
                    await _appDbContext.SaveChangesAsync();
                    response.Message = $"Patient {patient.Name} Deleted";
                    response.Success = true;
                    response.Data = $"Pateint {patient.Surname} Deleted";
                    return response;
                }
                else
                {
                    response.Success = false;
                    response.Message = $"No Patient {patient.Surname} on Your List";
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<WardDto>> RemoveWardFromDoctor(int wardId)
        {
            var response = new ServiceResponse<WardDto>();
            try
            {
                var doctor = await _appDbContext.Doctors.Include(x => x.Wards).FirstOrDefaultAsync(x => x.Id == GetUserId());
                var ward = await _appDbContext.Wards.FirstOrDefaultAsync(x => x.WardId == wardId);
                var doctorPatients = await _appDbContext.Doctors.Include(x=>x.Patients).FirstOrDefaultAsync(x=>x.Id==GetUserId());


                if (doctor == null || ward == null)
                {
                    response.Success = false;
                    response.Message = "No such Ward on Your List";
                    return response;
                }
                if (doctor.Wards.Any(x => x.WardId == ward.WardId))
                {
                    foreach(var patient in doctorPatients.Patients)
                    {
                        if(patient.DoctorId==doctor.Id && ward.WardId==patient.WardId)
                        {
                            patient.DoctorId = null;
                        }
                    }
                    doctor.Wards.Remove(ward);
                    await _appDbContext.SaveChangesAsync();
                    response.Message = $"Ward {ward.WardName} Deleted";
                    response.Success = true;
                    response.Data = _mapper.Map<WardDto>(ward);
                    return response;
                }
                else
                {
                    response.Success = false;
                    response.Message = $"No {ward.WardName} On Your List";
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<UpdateDoctorPropertiesDto>> UpdateDoctor(UpdateDoctorPropertiesDto dto)
        {
            var response = new ServiceResponse<UpdateDoctorPropertiesDto>();
            try
            {
                var currentUser = await _appDbContext.Doctors.FirstOrDefaultAsync(x => x.Id == GetUserId());
                if (currentUser == null)
                {
                    response.Success = false;
                    response.Message = "No Such Doctor registered";
                    return response;
                }
                if(dto.Name.Length==0|| dto.Surname.Length == 0)
                {
                    response.Message = "Fill in Name and Surname Properties";
                    response.Success = false;
                    return response;
                }
                currentUser.Surname = dto.Surname;
                currentUser.Name = dto.Name;
                await _appDbContext.SaveChangesAsync();
                response.Message = $"Changed to {currentUser.Name} {currentUser.Surname}";
                response.Data = _mapper.Map<UpdateDoctorPropertiesDto>(currentUser);
                response.Success = true;
                return response;
            }catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
            
        }

        private ServiceResponse<DateTime> DateValidation(string date)
        {
            DateTime dateTime;
            var response = new ServiceResponse<DateTime>();
            if(DateTime.TryParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None,out dateTime))
            {
                response.Success = true;
                response.Data = dateTime;
                response.Message = "Date in proper format";
                return response;
            }
            response.Success = false;
            response.Message = "Date is not in Valid Foramt dd/mm/yyyy";
            return response;
        }

        public async Task<ServiceResponse<NoteDto>> AddPatientNote(int patientId, PostNoteDto postNoteDto)
        {
            var response = new ServiceResponse<NoteDto>();
           
            try
            {
                var patient = await _appDbContext.Patients.Include(x=>x.PatientCard).FirstOrDefaultAsync(x=> x.Id == patientId && x.DoctorId==GetUserId());
                
                var dtoDateValidation = DateValidation(postNoteDto.Date);
                if (patient == null)
                {
                    response.Message = "No such Patient or Doctor";
                    return response;
                }
                if (dtoDateValidation.Success)
                {
                    var note = new Note() { PatientCardId = patient.PatientCardId, Record = postNoteDto.Record };
                    note.Date = dtoDateValidation.Data;
                    patient.PatientCard.Notes.Add(note);
                    await _appDbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Message = $"Note to Patient {patient.Surname} Added";
                    response.Data = _mapper.Map<NoteDto>(note);
                    return response;
                }
                else
                {
                    response.Message = dtoDateValidation.Message;
                    return response;
                }
               
            }catch(Exception ex)
            {
                response.Message = "Sth went wrong try again";
                return response;
            }
        }



        public async Task<ServiceResponse<NoteDto>> UpdatePatientNote(UpdatePatientNoteDto noteDto)
        {
            var response = new ServiceResponse<NoteDto>();
            try
            {
                var patient = await _appDbContext.Patients.Include(x=>x.PatientCard).FirstOrDefaultAsync(x=>x.Id==noteDto.PatientId);
                var patientCard = await _appDbContext.PatientCards.Include(x=>x.Notes).FirstOrDefaultAsync(x=>x.PatientCardId==noteDto.PatientCardId);
                if (patientCard == null || patient == null)
                {
                    response.Message = "No such Patient or PatientCard";
                    return response;
                }
                if(noteDto.Record.Length==0||noteDto.Record == String.Empty|| String.IsNullOrEmpty(noteDto.Record))
                {
                    response.Message = "Note Must be longer than 0 character";
                    return response;
                }
                var noteToUpdate =  patientCard.Notes.FirstOrDefault(x => x.Id == noteDto.NoteId);
                noteToUpdate.Record = noteDto.Record;
                await _appDbContext.SaveChangesAsync();
                response.Message = $"Note of Patient {patient.Surname} updated";
                response.Data = _mapper.Map<NoteDto>(noteToUpdate);
                response.Success = true;
                return response;

            }catch(Exception ex)
            {
                response.Message = "sth went wrong, try again";
                return response;
            }
        }

        public async Task<ServiceResponse<List<string>>> GetEnumNamesOfWards()
        {
            var response = new ServiceResponse<List<string>>();
            var enumData = new List<string>();
            foreach(int i in Enum.GetValues(typeof(DepartmentName)))
            {
                var name = Enum.GetName(typeof(DepartmentName), i);
                enumData.Add(name);

            }
            response.Data = enumData;
            response.Success = true;
            response.Message = "List of Wards Downladed";
            return response;
        }



    }
}
