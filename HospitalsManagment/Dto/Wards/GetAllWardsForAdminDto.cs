using HospitalsManagment.Entities;
using System.Diagnostics.CodeAnalysis;

namespace HospitalsManagment.Dto.Wards
{
    public class GetAllWardsForAdminDto 
    {
        public int? WardId { get; set; }
        public DepartmentName id { get; set; }
        public string title { get; set; }
        public int MaxCapacity { get; set; }
        public int OccupiedBeds { get; set; }
        public int HospitalId { get; set; }

       
    }
}
