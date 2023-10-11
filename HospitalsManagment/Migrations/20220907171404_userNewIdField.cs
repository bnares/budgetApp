using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalsManagment.Migrations
{
    public partial class userNewIdField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorHospital_Doctors_DoctorsDoctorId",
                table: "DoctorHospital");

            migrationBuilder.DropForeignKey(
                name: "FK_DoctorWard_Doctors_DoctorsDoctorId",
                table: "DoctorWard");

            migrationBuilder.RenameColumn(
                name: "PatientId",
                table: "Patients",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DoctorsDoctorId",
                table: "DoctorWard",
                newName: "DoctorsId");

            migrationBuilder.RenameColumn(
                name: "DoctorId",
                table: "Doctors",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DoctorsDoctorId",
                table: "DoctorHospital",
                newName: "DoctorsId");

            migrationBuilder.RenameColumn(
                name: "AdminId",
                table: "Admins",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorHospital_Doctors_DoctorsId",
                table: "DoctorHospital",
                column: "DoctorsId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorWard_Doctors_DoctorsId",
                table: "DoctorWard",
                column: "DoctorsId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorHospital_Doctors_DoctorsId",
                table: "DoctorHospital");

            migrationBuilder.DropForeignKey(
                name: "FK_DoctorWard_Doctors_DoctorsId",
                table: "DoctorWard");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Patients",
                newName: "PatientId");

            migrationBuilder.RenameColumn(
                name: "DoctorsId",
                table: "DoctorWard",
                newName: "DoctorsDoctorId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Doctors",
                newName: "DoctorId");

            migrationBuilder.RenameColumn(
                name: "DoctorsId",
                table: "DoctorHospital",
                newName: "DoctorsDoctorId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Admins",
                newName: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorHospital_Doctors_DoctorsDoctorId",
                table: "DoctorHospital",
                column: "DoctorsDoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorWard_Doctors_DoctorsDoctorId",
                table: "DoctorWard",
                column: "DoctorsDoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
