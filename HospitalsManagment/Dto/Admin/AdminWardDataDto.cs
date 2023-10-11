namespace HospitalsManagment.Dto.Admin
{
    public class AdminWardDataDto
    {
        public int? WardId { get; set; }
        public string? WardName { get; set; }
        public int MaxCapacity { get; set; }
        public int OccupiedBed { get; set; }

    }
}
