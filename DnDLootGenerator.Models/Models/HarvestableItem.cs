using System.ComponentModel.DataAnnotations;

namespace DnDLootGenerator.Models.Models
{
    public class HarvestableItem
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ItemFor { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Weight { get; set; }
        [Required]
        public string Cost { get; set; }
        [Required]
        public string Dc { get; set; }
        [Required]
        public string Skill { get; set; }
    }
}
