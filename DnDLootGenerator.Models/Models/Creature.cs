using DnDLootGenerator.Models.Enumerations;
using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Models
{
    public class Creature : ICreatureForShowCreatures
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Type { get; set; }

        public string CreatureRating { get; set; }
        public string AC { get; set; }
        public string HP { get; set; }
        public string MovementTypes { get; set; }
        public string Alignment { get; set; }
        public string Source { get; set; } 
        public string SourceShort { get; set; }
        public CreatureSizeEnumeration Size { get; set; }
        public string Equipment { get; set; }
        public string Stats { get; set; }
        public string Skills { get; set; }
        public string OtherInfo { get; set; }
    }
}
