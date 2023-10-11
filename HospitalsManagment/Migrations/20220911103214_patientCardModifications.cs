using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalsManagment.Migrations
{
    public partial class patientCardModifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "PatientCards");

            migrationBuilder.CreateTable(
                name: "Note",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Record = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PatientCardId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Note", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Note_PatientCards_PatientCardId",
                        column: x => x.PatientCardId,
                        principalTable: "PatientCards",
                        principalColumn: "PatientCardId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Note_PatientCardId",
                table: "Note",
                column: "PatientCardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Note");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "PatientCards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
