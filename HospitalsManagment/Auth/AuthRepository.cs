using AutoMapper;
using HospitalsManagment.Dto.Register;
using HospitalsManagment.Dto.Login;
using HospitalsManagment.Entities;
using HospitalsManagment.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace HospitalsManagment.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthRepository(AppDbContext appDbContext, IMapper mapper, IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<LoginResposne>> Login(LoginDto dto)
        {
            var response = new ServiceResponse<LoginResposne>();
            var user = await FindUser(dto.Role, dto.Surname, dto.Name);

            if (user.Success == false || dto.Surname==string.Empty || dto.Name==string.Empty)
            {
                response.Success = false;
                response.Message = "User not found !!.";
                //response.Data = "User Not found !";
                return response;
            }

            if (!VerifyPasswordHash(dto.Password, user.Data.PasswordHash, user.Data.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Wrong password.";
               // response.Data = "Wrong Password";
                return response;
            }
            else
            {
                var token = CreateToken(user.Data);
                var loginResponse = new LoginResposne();
                loginResponse.token = token;
                loginResponse.user = user.Data;
                response.Data = loginResponse;
                response.Success = true;
                response.Message = "Token created";
                return response;
            }

            
        }

        public async Task<ServiceResponse<User>> Register(RegisterDto dto)
        {
            var test = dto;
            var userToFindOrRegister = await UserExists(dto.Role, dto.Surname, dto.Name);
            var resposne = new ServiceResponse<User>();
            if (userToFindOrRegister.Success)
            {
                resposne.Success = false; //cant register user who already exist
                resposne.Message = userToFindOrRegister.Message;
                return resposne;
            }
            else
            {
                CreatePasswordHash(dto.Password, out byte[] passwordHash, out byte[] passwordSalt);
                userToFindOrRegister.Data.PasswordSalt = passwordSalt;
                userToFindOrRegister.Data.PasswordHash = passwordHash;
                userToFindOrRegister.Data.Surname = dto.Surname;
                userToFindOrRegister.Data.Name = dto.Name;
                userToFindOrRegister.Data.Role = dto.Role;
                
                
                if(await AddUserToDb(userToFindOrRegister))
                {
                    userToFindOrRegister.Success = true;
                    userToFindOrRegister.Message = $"{userToFindOrRegister.Data.Name} {userToFindOrRegister.Data.Surname} account was created";
                    return userToFindOrRegister;

                }
                resposne.Success = false;
                resposne.Message = $"Coudnt have found right typue of User : Admin, Patient, Doctor";
                return resposne;
            }

        }

        public async  Task<ServiceResponse<User>> UserExists(Role role, string surname, string name)
        {
            var userBeingRegisterdExist = await FindUser(role, surname, name);
            return userBeingRegisterdExist;
        }

        

        private async Task<bool> AddUserToDb(ServiceResponse<User> user)
        {
            try
            {
                switch (user.Data.Role)
                {
                    case Role.Admin:
                        Admin admin = _mapper.Map<Admin>(user.Data);
                        _appDbContext.Admins.Add(admin);
                        await _appDbContext.SaveChangesAsync();
                        return true;
                        break;
                    case Role.Doctor:
                        Doctor doctor = _mapper.Map<Doctor>(user.Data);
                        _appDbContext.Doctors.Add(doctor);
                        await _appDbContext.SaveChangesAsync();
                        return true;
                        break;
                    case Role.Patient:
                        Patient patient = _mapper.Map<Patient>(user.Data);
                        _appDbContext.Patients.Add(patient);
                        await _appDbContext.SaveChangesAsync();
                        return true;
                        break;
                    default:
                        return false;
                }
            }catch (Exception ex)
            {
                return false;
            }
        }

        private async Task<ServiceResponse<User>> FindUser(Role role, string surname, string name)
        {
            var response = new ServiceResponse<User>();
            
            switch (role)
            {
                case Role.Patient:
                    var pateint = await _appDbContext.Patients.FirstOrDefaultAsync(x => (x.Surname.ToLower().Equals(surname.ToLower()) && (x.Name.ToLower().Equals(name.ToLower()))));
                    if (pateint == null)
                    {
                        response.Success = false;
                        response.Message = $"Patient {surname} does not exist";
                        response.Data = new Patient();
                    }
                    else
                    {
                        response.Success = true;
                        response.Data = pateint;
                        response.Message = $"Pateint {surname} Has been Registered";
                    };
                    break;
                case Role.Doctor:
                    var doctor = await _appDbContext.Doctors.FirstOrDefaultAsync(x => (x.Surname.ToLower().Equals(surname.ToLower()) && x.Name.ToLower().Equals(name.ToLower())));
                    if (doctor == null)
                    {
                        response.Success=false;
                        response.Message = $"Doctor {surname} does not exist";
                        response.Data = new Doctor();
                    }
                    else
                    {
                        response.Success = true;
                        response.Data = doctor;
                        response.Message = $"Doctor {surname} Has been Registered";
                    };
                    break;
                case Role.Admin:
                    var test = await _appDbContext.Admins.ToListAsync();
                    var admin = await _appDbContext.Admins.FirstOrDefaultAsync(x => (string.Equals(surname.ToLower(), x.Surname.ToLower()) && (string.Equals(name.ToLower(), x.Name.ToLower()))));

                    if (admin == null)
                    {
                        response.Success = false;
                        response.Message = $"Admin {surname} does not exist";
                        response.Data = new Admin();
                    }
                    else
                    {
                        response.Success = true;
                        response.Data = admin;
                        response.Message = $"Admin {surname} Has been Registered";
                    };
                    break;

                default:
                    response.Success = false;
                    response.Message = "Cant find such User Role";
                    break;
            }
            return response;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool CompareNameDtoAndSurnameDtoWithDb(string surnameDto, string nameDto, string surnameDb, string nameDb)
        {
            if(string.Equals(surnameDb,surnameDto)&&string.Equals(nameDto,nameDb)) return true;
            return false;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
           
            return tokenHandler.WriteToken(token);
        }




    }
}
