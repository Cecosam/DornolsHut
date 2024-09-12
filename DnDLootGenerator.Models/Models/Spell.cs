using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Models
{
    public class Spell
    {
        [Key]
        public int Id { get; set; }
        public string SpellName { get; set; }
        public int SpellLevel { get; set; }

        public string Description { get; set; }

        public string Source { get; set; }
        public string School { get; set; }
        public string Classes { get; set; }

        public string MaterialComponent { get; set; }
        public string AtHighLevels { get; set; }
        public bool IsRitual { get; set; }
        public string CastingTime { get; set; }

        public string Range { get; set; }

        public string Components { get; set; }

        public string Duration { get; set; }
        public string DamageType { get; set; }

        public string SavingThrow { get; set; }
        public string Conditions { get; set; }


    }
}
