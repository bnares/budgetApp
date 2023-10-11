using AutoMapper;
using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Dto.Notes;
using HospitalsManagment.Dto.Patients;
using HospitalsManagment.Dto.PatientsCard;
using HospitalsManagment.Dto.WardNameAsStringDto;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Entities;

namespace HospitalsManagment
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Hospital, GetHospitalDto>();
            CreateMap<Hospital, DeleteHospitalDto>();
            CreateMap<Hospital, SubHospitalDto>();
            CreateMap<Hospital, DisplayHospitalDto>();
            CreateMap<User, Admin>();
            CreateMap<User, Doctor>();
            CreateMap<User, Patient>();
            CreateMap<Ward, GetAllWardDto>();
            CreateMap<Ward, WardDto>();
            CreateMap<Ward, SubWardDto>();
            CreateMap<Doctor, UpdateDoctorPropertiesDto>();
            CreateMap<Doctor, SubDoctorDto>();
            CreateMap<Patient, PatientDto>();
            CreateMap<Patient, PatientBasicDataDto>();
            CreateMap<Patient, NotAsignedPatientsDto>();
            CreateMap<PatientCard, PatientCardDto>();
            CreateMap<Note, NoteDto>();
            CreateMap<Ward, WardNameAsStringDto>();
           
        }
    }
}
