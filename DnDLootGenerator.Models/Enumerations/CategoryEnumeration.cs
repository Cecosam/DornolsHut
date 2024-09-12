using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Enumerations
{
    public enum CategoryEnumeration
    {
        [Display(Name = "Potions")]
        Potions = 0,
        [Display(Name = "Treasures")]
        Treasures = 1,
        [Display(Name = "Rings")]
        Rings = 2,
        [Display(Name = "Armors")]
        Armors = 3,
        [Display(Name = "Poisons")]
        Poisons = 4,
        [Display(Name = "Simple Weapons")]
        SimpleWeapons = 5,
        [Display(Name = "Martial Weapons")]
        MartialWeapons = 6,
        [Display(Name = "Rods")]
        Rods = 7,
        [Display(Name = "Staffs")]
        Staffs = 8,
        [Display(Name = "Wands")]
        Wands = 9,
        [Display(Name = "Wondrous Items")]
        WondrousItems = 10,
    }
}
