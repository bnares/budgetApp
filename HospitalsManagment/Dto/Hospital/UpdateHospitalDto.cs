namespace HospitalsManagment.Dto.Hospital
{
    public class UpdateHospitalDto
    {
        public int IdHospitalToUpdate { get; set; }
        public string NewName { get; set; }
        public string NewCity { get; set; }
        public string NewStreet { get; set; }
        public string NewCountry { get; set; }
    }
}
