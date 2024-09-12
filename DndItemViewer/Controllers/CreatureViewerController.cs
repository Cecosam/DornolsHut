using DnDLootGenerator.Data.Data;
using DnDLootGenerator.Models.Models;
using Microsoft.AspNetCore.Mvc;

namespace DndItemViewer.Controllers
{
    public class CreatureViewerController : Controller
    {
        private ApplicationDbContext dbContext;

        public CreatureViewerController(ApplicationDbContext db)
        {
            dbContext = db;
        }
        public IActionResult ShowCreature(int id)
        {
            return View(dbContext.Creatures.Where(creature => creature.Id == id).FirstOrDefault());
        }

        public IActionResult ShowCreatures()
        {
            return View(castCreatures(dbContext.Creatures.AsEnumerable()));
        }
        private List<ICreatureForShowCreatures> castCreatures(IEnumerable<Creature> input)
        {
            List<ICreatureForShowCreatures> result = new List<ICreatureForShowCreatures>();
            foreach (var item in input)
            {
                result.Add(item);
            }
            return result;
        }
    }
}
