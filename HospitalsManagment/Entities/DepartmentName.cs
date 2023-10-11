using System.ComponentModel;

namespace HospitalsManagment.Entities
{
    public enum DepartmentName
    {
        [Description("Onkology")]
        Oncology,
        [Description("Cardiology")]
        Cardiology,
        [Description("Geriatrics")]
        Geriatrics,
        [Description("Dermatology")]
        Dermatology,
        [Description("Psychiatric")]
        Psychiatric,
        [Description("Neurology")]
        Neurology,
        [Description("Gynaecology")]
        Gynaecology,
        [Description("Anaesthetics")]
        Anaesthetics,
        [Description("Surgery")]
        Surgery,
        [Description("Pediatrics")]
        Pediatrics,

    }
}
