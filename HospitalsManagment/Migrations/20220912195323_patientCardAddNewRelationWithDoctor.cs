using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalsManagment.Migrations
{
    public partial class patientCardAddNewRelationWithDoctor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatientCards_Doctors_DoctorId",
                table: "PatientCards");

            migrationBuilder.AddForeignKey(
                name: "FK_PatientCards_Doctors_DoctorId",
                table: "PatientCards",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatientCards_Doctors_DoctorId",
                table: "PatientCards");

            migrationBuilder.AddForeignKey(
                name: "FK_PatientCards_Doctors_DoctorId",
                table: "PatientCards",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
