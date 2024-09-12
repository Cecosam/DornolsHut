using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Enumerations
{
    public enum ItemTypeEnumeration
    {
        [Display(Name = "Magic Item")]
        MagicItem = 0,
        [Display(Name = "Item")]
        Item = 1,
    }
}
