using HospitalsManagment.Dto.Doctors;
using HospitalsManagment.Dto.Wards;
using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Hospital
{
    public class GetHospitalDto
    {
        public int HospitalId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public List<Wards.WardNameAsStringDto> Wards { get; set; }
        public List<SubDoctorDto> Doctors { get; set; }
    }
}
