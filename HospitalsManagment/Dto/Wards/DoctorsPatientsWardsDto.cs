namespace HospitalsManagment.Dto.Wards
{
    public class DoctorsPatientsWardsDto
    {
        public int? WardId { get; set; }
        public Entities.DepartmentName WardName { get; set; }
       
        public List<Dto.Patients.DoctorPatientsDto> Patients { get; set; }
    }
}
