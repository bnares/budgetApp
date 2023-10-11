using System.Linq;
using System;
using testowanie;

namespace Testowanie
{
    class Program
    {
        public static void Main(string[] args)
        {
            var test = new CzlowiekComparer();
            var liczby = new int[] { 1, 2, 3,5 };
            var liczby1 = new int[]{ 1, 5, 6 };
            var a = new List<Czlowiek>() { new Czlowiek(1, "Piotr"), new Czlowiek(2, "Ola"), new Czlowiek(3,"Wojtek"), new Czlowiek(4, "Magda") };
            var b = new List<Czlowiek>() { new Czlowiek(1, "Piotr"), new Czlowiek(4, "Magda"), new Czlowiek(5, "Zenek") };
            
            var difrence = a.Intersect(b,new CzlowiekComparer()).ToList();
            Console.WriteLine("Wynik");
            Console.WriteLine("Dlugosc: "+difrence.Count);
            foreach (var c in difrence)
            {
               
                Console.WriteLine($"{c.Id} {c.Name}");
            }

            Console.WriteLine("---------------------------------------");
            var data = liczby.Intersect(liczby1);
            Console.WriteLine("Wyniki: ");
            foreach(var c in data)
            {
                Console.WriteLine(c);
            }
        }
    }
}