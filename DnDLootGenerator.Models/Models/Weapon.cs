using DnDLootGenerator.Models.Enumerations;
using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Models
{
    public class Weapon : IItem
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
        public WeaponGroupEnumeration WeaponGroup { get; set; }
        [Required]
        public string? Slot { get; set; }
        [Required]
        public string? Damage { get; set; }
        [Required]
        public string? DamageType { get; set; }
        public bool IsLight { get; set; }
        public bool IsHeavy { get; set; }
        public bool IsReach { get; set; }
        public bool IsFinesse { get; set; }
        public bool IsLoading { get; set; }
        public bool IsRanged { get; set; }
        public string? Range { get; set; }
        public bool IsVersatile { get; set; }
        public string? VersatileDamage { get; set; }
        public string? AdditionalInfo { get; set; }

        [Required]
        public int Cost { get; set; }
        [Required]
        public string Source { get; set; }
    }
}
