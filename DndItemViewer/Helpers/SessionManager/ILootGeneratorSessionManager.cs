using DnDLootGenerator.Models.Models;

namespace DndItemViewer.Helpers.SessionManager
{
    public interface ILootGeneratorSessionManager
    {
        public List<dynamic> CheckForSession();
        public void RemoveCreature(int creatureId);
        public void AddLootToSession(int creatureId, int creatureLiEleId, List<dynamic> loot, List<HarvestableItem> harvest, List<dynamic> personalLoot);
    }
}
