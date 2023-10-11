using System.Diagnostics.CodeAnalysis;

namespace HospitalsManagment.Dto.Wards.EqualityComparer
{
    public class GetAllWardsForAdminDtoComparer : IEqualityComparer<GetAllWardsForAdminDto>
    {
        public bool Equals(GetAllWardsForAdminDto? x, GetAllWardsForAdminDto? y)
        {
            if(ReferenceEquals(x, y)) return true;
            if(ReferenceEquals(x, null)) return false;
            if(ReferenceEquals (y, null)) return false;
            if(x.GetType()!=y.GetType()) return false;
            return x.title == y.title && x.id == y.id;
        }

        public int GetHashCode([DisallowNull] GetAllWardsForAdminDto obj)
        {
            return obj.id.GetHashCode() ^ obj.title.GetHashCode();
        }
    }
}
