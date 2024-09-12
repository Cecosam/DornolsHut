using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DnDLootGenerator.Models.Enumerations
{
    public enum CreatureSizeEnumeration
    {
        [Display(Name ="Tiny")]
        Tiny = 0,
        [Display(Name = "Small")]
        Small = 1,
        [Display(Name = "Medium")]
        Medium = 2,
        [Display(Name = "Large")]
        Large = 3,
        [Display(Name = "Huge")]
        Huge = 4,
        [Display(Name = "Gargantuan")]
        Gargantuan = 5,
    }
}
