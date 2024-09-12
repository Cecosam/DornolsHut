using DnDLootGenerator.Models.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DnDLootGenerator.Models.Models
{
    public interface ICreatureForShowCreatures : ICreatureForLootGenerator
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Type { get; set; }

        public string CreatureRating { get; set; }
        public string Source { get; set; }
        public string SourceShort { get; set; }

        public CreatureSizeEnumeration Size { get; set; }
    }
}
