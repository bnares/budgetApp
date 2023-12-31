﻿// <auto-generated />
using System;
using HospitalsManagment.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HospitalsManagment.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220906114816_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DoctorHospital", b =>
                {
                    b.Property<int>("DoctorsDoctorId")
                        .HasColumnType("int");

                    b.Property<int>("HospitalsHospitalId")
                        .HasColumnType("int");

                    b.HasKey("DoctorsDoctorId", "HospitalsHospitalId");

                    b.HasIndex("HospitalsHospitalId");

                    b.ToTable("DoctorHospital");
                });

            modelBuilder.Entity("DoctorWard", b =>
                {
                    b.Property<int>("DoctorsDoctorId")
                        .HasColumnType("int");

                    b.Property<int>("WardsWardId")
                        .HasColumnType("int");

                    b.HasKey("DoctorsDoctorId", "WardsWardId");

                    b.HasIndex("WardsWardId");

                    b.ToTable("DoctorWard");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AdminId"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("R")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("AdminId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Doctor", b =>
                {
                    b.Property<int?>("DoctorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("DoctorId"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("DoctorId");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Hospital", b =>
                {
                    b.Property<int>("HospitalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("HospitalId"), 1L, 1);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("HospitalId");

                    b.ToTable("Hospitals");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Patient", b =>
                {
                    b.Property<int?>("PatientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("PatientId"), 1L, 1);

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<int?>("DoctorId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("PatientCardId")
                        .HasColumnType("int");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int?>("WardId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("PatientId");

                    b.HasIndex("DoctorId");

                    b.HasIndex("PatientCardId")
                        .IsUnique();

                    b.HasIndex("WardId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.PatientCard", b =>
                {
                    b.Property<int>("PatientCardId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PatientCardId"), 1L, 1);

                    b.Property<int?>("DoctorId")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PatientCardId");

                    b.HasIndex("DoctorId");

                    b.ToTable("PatientCards");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Ward", b =>
                {
                    b.Property<int?>("WardId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("WardId"), 1L, 1);

                    b.Property<int>("HospitalId")
                        .HasColumnType("int");

                    b.Property<int>("MaxCapacity")
                        .HasColumnType("int");

                    b.Property<int>("OccupiedBeds")
                        .HasColumnType("int");

                    b.Property<int>("WardName")
                        .HasColumnType("int");

                    b.HasKey("WardId");

                    b.HasIndex("HospitalId");

                    b.ToTable("Wards");
                });

            modelBuilder.Entity("DoctorHospital", b =>
                {
                    b.HasOne("HospitalsManagment.Entities.Doctor", null)
                        .WithMany()
                        .HasForeignKey("DoctorsDoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HospitalsManagment.Entities.Hospital", null)
                        .WithMany()
                        .HasForeignKey("HospitalsHospitalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DoctorWard", b =>
                {
                    b.HasOne("HospitalsManagment.Entities.Doctor", null)
                        .WithMany()
                        .HasForeignKey("DoctorsDoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HospitalsManagment.Entities.Ward", null)
                        .WithMany()
                        .HasForeignKey("WardsWardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Patient", b =>
                {
                    b.HasOne("HospitalsManagment.Entities.Doctor", "Doctor")
                        .WithMany("Patients")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("HospitalsManagment.Entities.PatientCard", "PatientCard")
                        .WithOne()
                        .HasForeignKey("HospitalsManagment.Entities.Patient", "PatientCardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HospitalsManagment.Entities.Ward", "Ward")
                        .WithMany("Patients")
                        .HasForeignKey("WardId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Doctor");

                    b.Navigation("PatientCard");

                    b.Navigation("Ward");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.PatientCard", b =>
                {
                    b.HasOne("HospitalsManagment.Entities.Doctor", null)
                        .WithMany("PatientCards")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Ward", b =>
                {
                    b.HasOne("HospitalsManagment.Entities.Hospital", "Hospital")
                        .WithMany("Wards")
                        .HasForeignKey("HospitalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hospital");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Doctor", b =>
                {
                    b.Navigation("PatientCards");

                    b.Navigation("Patients");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Hospital", b =>
                {
                    b.Navigation("Wards");
                });

            modelBuilder.Entity("HospitalsManagment.Entities.Ward", b =>
                {
                    b.Navigation("Patients");
                });
#pragma warning restore 612, 618
        }
    }
}
