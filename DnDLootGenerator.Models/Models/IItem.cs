using DnDLootGenerator.Models.Enumerations;

namespace DnDLootGenerator.Models.Models
{
    public interface IItem
    {
        public string? Name { get; set; }
        public ItemTypeEnumeration Type { get; set; }
        public string? Description { get; set; }
        public CategoryEnumeration Category { get; set; }
        public float Weight { get; set; }
        public RarityEnumeration Rarity { get; set; }
        public int Cost { get; set; }
        public string Source { get; set; }
    }
}
