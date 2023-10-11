using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalsManagment.Migrations
{
    public partial class hospitalFIeldToPatient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HospitalId",
                table: "Patients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_HospitalId",
                table: "Patients",
                column: "HospitalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Hospitals_HospitalId",
                table: "Patients",
                column: "HospitalId",
                principalTable: "Hospitals",
                principalColumn: "HospitalId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Hospitals_HospitalId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_HospitalId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "HospitalId",
                table: "Patients");
        }
    }
}
