using DnDLootGenerator.Models.Models;
using Newtonsoft.Json;

namespace DndItemViewer.Helpers.SessionManager
{
    public class SessionManager : ILootGeneratorSessionManager
    {
        private IHttpContextAccessor contextAccessor;
        public SessionManager(IHttpContextAccessor httpContextAccessor)
        {
            contextAccessor = httpContextAccessor;
        }
        public void AddLootToSession(int creatureId, int creatureLiElementId, List<dynamic> loot, List<HarvestableItem> harvest, List<dynamic> personalLoot)
        {
            var creaturesIds = contextAccessor.HttpContext.Session.GetString(Constants.CREATURES_ID_TEXT);
            if (creaturesIds == null)
            {
                contextAccessor.HttpContext.Session.SetString(Constants.CREATURES_ID_TEXT, creatureLiElementId.ToString());
                var recordForSession = Tuple.Create<List<dynamic>, List<HarvestableItem>, List<dynamic>, int>(loot, harvest, personalLoot, creatureId);
                contextAccessor.HttpContext.Session.SetString(Constants.CREATURE_TEXT + creatureLiElementId, JsonConvert.SerializeObject(recordForSession));
            }
            else
            {
                contextAccessor.HttpContext.Session.SetString(Constants.CREATURES_ID_TEXT, $"{creaturesIds} {creatureLiElementId}");
                var recordForSession = Tuple.Create<List<dynamic>, List<HarvestableItem>, List<dynamic>, int>(loot, harvest, personalLoot, creatureId);
                contextAccessor.HttpContext.Session.SetString(Constants.CREATURE_TEXT + creatureLiElementId, JsonConvert.SerializeObject(recordForSession));
            }
        }

        public List<dynamic> CheckForSession()
        {
            string? creachers = contextAccessor.HttpContext.Session.GetString(Constants.CREATURES_ID_TEXT);
            List<dynamic> result = new List<dynamic>();
            List<string> resetCreaturesList = new List<string>();
            if (creachers != null)
            {
                foreach (var id in creachers.Split(" "))
                {
                    var creature = contextAccessor.HttpContext.Session.GetString(Constants.CREATURE_TEXT + id);
                    contextAccessor.HttpContext.Session.Remove(Constants.CREATURE_TEXT + id);
                    if (creature != null)
                    {
                        resetCreaturesList.Add(creature);
                        result.Add(creature);
                    }
                }
                List<int> creaturesIdsList = new List<int>();
                for (int i = 0; i < resetCreaturesList.Count; i++)
                {
                    contextAccessor.HttpContext.Session.SetString(Constants.CREATURE_TEXT + i, resetCreaturesList[i]);
                    creaturesIdsList.Add(i);
                }

                contextAccessor.HttpContext.Session.SetString(Constants.CREATURES_ID_TEXT, String.Join(" ", creaturesIdsList));
            }

            return result;
        }

        public void RemoveCreature(int creatureId)
        {
            string? creachers = contextAccessor.HttpContext.Session.GetString(Constants.CREATURES_ID_TEXT);
            List<string> result = new List<string>();
            if (creachers != null)
            {
                foreach (var id in creachers.Split(" "))
                {
                    if (int.Parse(id) == creatureId)
                    {
                        contextAccessor.HttpContext.Session.Remove(Constants.CREATURE_TEXT + id);
                        continue;
                    }
                    result.Add(id);
                }
                if (result.Count == 0)
                    contextAccessor.HttpContext.Session.Remove(Constants.CREATURES_ID_TEXT);
                else
                    contextAccessor.HttpContext.Session.SetString(Constants.CREATURES_ID_TEXT, String.Join(" ", result));
            }
        }
    }
}
