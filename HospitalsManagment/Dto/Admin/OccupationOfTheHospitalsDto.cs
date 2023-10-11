namespace HospitalsManagment.Dto.Admin
{
    public class OccupationOfTheHospitalsDto
    {
        public int HospitalId { get; set; }
        public string HospitalName { get; set; }
        public List<AdminWardDataDto> HospitalsWards { get; set; } = new List<AdminWardDataDto> { };

    }
}
