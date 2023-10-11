namespace HospitalsManagment.Dto.Wards
{
    public class UpdateWardAdminDto
    {
        public int? id { get; set; }
        public string title { get; set; }
        public int maxCapacity { get; set; }
        public int OccupiedBeds { get; set; }


    }
}
