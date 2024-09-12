using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Enumerations
{
    public enum RarityEnumeration
    {
        [Display(Name = "Common")]
        Common = 0,
        [Display(Name = "Uncommon")]
        Uncommon = 1,
        [Display(Name = "Rare")]
        Rare = 2,
        [Display(Name = "Very Rare")]
        VeryRare = 3,
        [Display(Name = "Legendary")]
        Legendary = 4,
    }
}
