using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Wards
{
    public class UpdateWardPropertiesDto
    {
        public int WardId { get; set; }
        public int MaxCapacity { get; set; }
        public int OccupiedBeds { get; set; } = 0;
    }
}
