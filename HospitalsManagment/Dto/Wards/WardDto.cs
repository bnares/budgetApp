using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Hospital;
using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Wards
{
    public class WardDto
    {
        public int? WardId { get; set; }
        public DepartmentName WardName { get; set; }
        public int MaxCapacity { get; set; }
        public int OccupiedBeds { get; set; }
        public SubHospitalDto Hospital { get; set; }
        public int HospitalId { get; set; }
        public List<SubDoctorDto> Doctors { get; set; }
        public List<Patient> Patients { get; set; }
    }
}
