using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testowanie
{
    public class CzlowiekComparer : IEqualityComparer<Czlowiek>
    {
        public bool Equals(Czlowiek? x, Czlowiek? y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode([DisallowNull] Czlowiek obj)
        {
            return obj.Id.GetHashCode();
        }
    }
}
