using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Hospital
{
    public class DeleteHospitalDto
    {
        public int HospitalId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public List<Entities.Ward> Wards { get; set; }
        public List<Doctor> Doctors { get; set; }
    }
}
