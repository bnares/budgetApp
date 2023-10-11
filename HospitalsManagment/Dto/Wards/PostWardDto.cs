using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.WardNameAsStringDto
{
    public class PostWardDto
    {
        public int HospitalId { get; set; }
        public DepartmentName WardName { get; set; }
        public int MaxCapacity { get; set; }
        public int OccupiedBeds { get; set; } = 0;
    }
}
