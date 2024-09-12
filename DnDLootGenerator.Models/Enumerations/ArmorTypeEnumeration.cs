using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Enumerations
{
    public enum ArmorTypeEnumeration
    {
        [Display(Name = "Light")]
        Light = 0,
        [Display(Name = "Medium")]
        Medium = 1,
        [Display(Name = "Heavy")]
        Heavy = 2,
        [Display(Name = "Shield")]
        Shield = 3,
    }
}
