namespace HospitalsManagment.Dto.Hospital
{
    public class DisplayHospitalDto
    {
        public int HospitalId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public List<Wards.WardDataPresentedInHospitalDto> Wards { get; set; } = new List<Wards.WardDataPresentedInHospitalDto> () { };
    }
}
