using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Enumerations
{
    public enum ArmorNameEnumeration
    {
        [Display(Name = "Padded")]
        Padded = 0,
        [Display(Name = "Leather")]
        Leather = 1,
        [Display(Name = "Studded Leather")]
        StuddedLeather = 2,
        [Display(Name = "Hide")]
        Hide = 3,
        [Display(Name = "Chain Shirt")]
        ChainShirt = 4,
        [Display(Name = "Scale Mail")]
        ScaleMail = 5,
        [Display(Name = "Breastplate")]
        Breastplate = 6,
        [Display(Name = "Half Plate")]
        HalfPlate = 7,
        [Display(Name = "Ring Mail")]
        RingMail = 8,
        [Display(Name = "Chain Mail")]
        ChainMail = 9,
        [Display(Name = "Splint")]
        Splint = 10,
        [Display(Name = "Plate")]
        Plate = 11,
        [Display(Name = "Shield")]
        Shield = 12,
    }
}
