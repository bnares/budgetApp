using HospitalsManagment.Entities;

namespace HospitalsManagment.Dto.Wards
{
    public class WardDataPresentedInHospitalDto
    {
        public int? WardId { get; set; }
        public int HospitalId { get; set; }
        public DepartmentName WardNameAsEnumNumber { get; set; }
        public int MaxCapacity { get; set; }
        public int OccupiedBeds { get; set; }
    }
}
