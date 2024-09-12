using DnDLootGenerator.Models.Models;

namespace DndItemViewer.Helpers.LootGenerators
{
    public interface ILootGenerator
    {
        public void GenerateLoot(int creatureId, List<dynamic> hoardLoot, List<dynamic> personalLoot);
        public List<HarvestableItem> GetHarvestableItems(int creatureId);
    }
}
