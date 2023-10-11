using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Wards
{
    public class SubWardDto
    {
        public int? WardId { get; set; }
        public int HospitalId { get; set; }
        public HospitalsManagment.Entities.Hospital Hospital {get; set;}
        public DepartmentName WardName { get; set; }
        public string WardNameAsString { get; set; }

        public int MaxCapacity { get; set; }
        public int OccupiedBeds { get; set; }
    }
}
