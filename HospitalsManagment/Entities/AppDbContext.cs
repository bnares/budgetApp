using Microsoft.EntityFrameworkCore;

namespace HospitalsManagment.Entities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
             
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hospital>().Property(x=>x.Name).HasMaxLength(50);
            modelBuilder.Entity<Hospital>().Property(x=>x.City).HasMaxLength(50);
            modelBuilder.Entity<Hospital>().Property(x=>x.Street).HasMaxLength(50);
            modelBuilder.Entity<Hospital>().Property(x=>x.Country).HasMaxLength(50);
            modelBuilder.Entity<Hospital>().HasKey(x=>x.HospitalId);
            modelBuilder.Entity<Hospital>().HasMany(x=>x.Wards).WithOne(x=>x.Hospital);
            modelBuilder.Entity<Hospital>().HasMany(x => x.Doctors).WithMany(x => x.Hospitals);
            

            modelBuilder.Entity<Ward>().HasKey(x => x.WardId);
            modelBuilder.Entity<Ward>().HasMany(x => x.Doctors).WithMany(x => x.Wards);
            modelBuilder.Entity<Ward>().HasOne(x => x.Hospital)
                                       .WithMany(x => x.Wards)
                                       .HasForeignKey(x => x.HospitalId);
            modelBuilder.Entity<Ward>().HasMany(x=>x.Patients)
                                       .WithOne()
                                       .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Doctor>().HasKey(x=>x.Id);
            modelBuilder.Entity<Doctor>().Property(x => x.Name).HasMaxLength(50);
            modelBuilder.Entity<Doctor>().Property(x=>x.Surname).HasMaxLength(50);
            modelBuilder.Entity<Doctor>().HasMany(x => x.Hospitals).WithMany(x => x.Doctors);
            modelBuilder.Entity<Doctor>().HasMany(x => x.Patients).WithOne().OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Doctor>().HasMany(x => x.Wards).WithMany(x => x.Doctors);
            modelBuilder.Entity<Doctor>().HasMany(x=>x.PatientCards).WithOne().OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Patient>().HasKey(x => x.Id);
            modelBuilder.Entity<Patient>().Property(x => x.Name).HasMaxLength(50);
            modelBuilder.Entity<Patient>().Property(x => x.Surname).HasMaxLength(50);
            
            modelBuilder.Entity<Patient>().HasOne(x => x.Ward)
                                          .WithMany(x => x.Patients)
                                          .HasForeignKey(x => x.WardId)
                                          .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Patient>().HasOne(x => x.Doctor)
                                          .WithMany(x => x.Patients)
                                          .HasForeignKey(x => x.DoctorId)
                                          .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Patient>().HasOne(x => x.PatientCard)
                                          .WithOne().HasForeignKey<Patient>(x => x.PatientCardId).OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Patient>().HasOne(x=>x.Hospital)
                                          .WithMany().HasForeignKey(x=>x.HospitalId)
                                          .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<PatientCard>().HasKey(x => x.PatientCardId);
            modelBuilder.Entity<PatientCard>().HasMany(x => x.Notes).WithOne().HasForeignKey(x => x.PatientCardId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<PatientCard>().HasOne(x => x.Doctor)
                                              .WithMany(x => x.PatientCards)
                                              .HasForeignKey(x => x.DoctorId)
                                              .OnDelete(DeleteBehavior.SetNull);
            
            
            modelBuilder.Entity<Admin>().HasKey(x => x.Id);
            modelBuilder.Entity<Admin>().Property(x => x.Name).HasMaxLength(50);
            modelBuilder.Entity<Admin>().Property(x => x.Surname).HasMaxLength(50);

        }

        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<PatientCard> PatientCards { get; set; }


    }
}
