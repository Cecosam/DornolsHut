
using DnDLootGenerator.Models.Enumerations;
using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Models
{
    public class Item : IItem
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public ItemTypeEnumeration Type { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public CategoryEnumeration Category { get; set; }
        public float Weight { get; set; }
        [Required]
        public RarityEnumeration Rarity { get; set; }
        [Required]
        public int Cost { get; set; }
        [Required]
        public string Source { get; set; }
        [Required]
        public bool Attunement { get; set; }
    }
}
