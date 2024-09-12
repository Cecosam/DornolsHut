using DndItemViewer.Helpers.LootGenerators;
using DndItemViewer.Helpers.SessionManager;
using DnDLootGenerator.Data.Data;
using DnDLootGenerator.Models.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DndItemViewer.Controllers
{
    public class LootGeneratorController : Controller
    {
        //public class InputData
        //{
        //    public int creatureId { get; set; }
        //    public int liElementId { get; set; }
        //}
        private ApplicationDbContext dbContext;
        private ILootGeneratorSessionManager sessionManager;
        public LootGeneratorController(ApplicationDbContext db, IHttpContextAccessor contAccessor)
        {
            dbContext = db;
            sessionManager = new SessionManager(contAccessor);
        }
        public IActionResult LootGenerator()
        {
            List<ICreatureForLootGenerator> listOfCreatures = castCreatures(dbContext.Set<Creature>().AsEnumerable());
            var result = sessionManager.CheckForSession();

            return View(Tuple.Create<List<ICreatureForLootGenerator>, List<dynamic>>(listOfCreatures, result));
        }

        public IActionResult LootGenerationInfo()
        {
            return View();
        }
        public IActionResult GetLoot(int creatureId, int liElementId)
        {
            var lootGenerator = new LootGenerator(dbContext);
            var hoardLoot = new List<dynamic>();
            var personalLoot = new List<dynamic>();

            lootGenerator.GenerateLoot(creatureId, hoardLoot, personalLoot);
            var harvest = lootGenerator.GetHarvestableItems(creatureId);
            sessionManager.AddLootToSession(creatureId, liElementId, hoardLoot, harvest, personalLoot);

            return Redirect("LootGenerator");
        }

        public IActionResult AddCreature(int creatureId, int liElementId)
        {
            sessionManager.AddLootToSession(creatureId, liElementId, new List<dynamic>(), new List<HarvestableItem>(), new List<dynamic>());
            return Redirect("LootGenerator");
        }

        public IActionResult RemoveCreature(int liElementId)
        {
            sessionManager.RemoveCreature(liElementId);
            return Redirect("LootGenerator");
        }

        private List<ICreatureForLootGenerator> castCreatures(IEnumerable<Creature> input)
        {
            List<ICreatureForLootGenerator> result = new List<ICreatureForLootGenerator>();
            foreach (var item in input)
            {
                result.Add(item);
            }
            return result;
        }
    }
}
