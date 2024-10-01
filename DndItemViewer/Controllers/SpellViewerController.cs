using DndItemViewer.Helpers;
using DnDLootGenerator.Data.Data;
using DnDLootGenerator.Models.Models;
using Microsoft.AspNetCore.Mvc;


namespace DndItemViewer.Controllers
{
    public class SpellViewerController : Controller
    {
        private ApplicationDbContext dbContext;
        private List<Spell> storedData;

        public SpellViewerController(ApplicationDbContext db)
        {
            dbContext = db;
            storedData = dbContext.Spells.ToList();
        }

        public IActionResult ShowSpells(int spellsLevel = Constants.SPELL_LEVEL_ALL_FILTER_TEXT,
            string spellsSchool = Constants.SPELL_SCHOOL_ALL_FILTER_TEXT,
            string spellsFor = Constants.SPELL_CLASS_ALL_FILTER_TEXT)
        {
            SetFilters(spellsLevel, spellsSchool, spellsFor);
            return View(FilterSpellsByLevel(storedData, spellsLevel, spellsSchool, spellsFor).ToList());
        }

        public IActionResult ShowSpell(int id)
        {
            return View(dbContext.Spells.Where(spell => spell.Id == id).FirstOrDefault());
        }

        public IActionResult SpellShow(string spellName)
        {
            spellName = spellName.Replace("-s-", "'s-").Replace("-", " ").Replace("enlarge/reduce", "Enlarge / Reduce");
            var spell = dbContext.Spells.Where(spell => spell.SpellName == spellName).FirstOrDefault();
            if (null == spell)
                return View("SpellNotFound");
            return View("ShowSpell",dbContext.Spells.Where(spell => spell.SpellName == spellName).FirstOrDefault());
        }

        private IEnumerable<Spell> FilterSpellsByLevel(IEnumerable<Spell> spells, int spellsLevel, string spellsSchool, string spellsFor)
        {
            if (spellsLevel != Constants.SPELL_LEVEL_ALL_FILTER_TEXT)
            {
                return FilterSpellsBySchool(spells.Where(spell => spell.SpellLevel == spellsLevel), spellsSchool, spellsFor);
            }
            return FilterSpellsBySchool(spells, spellsSchool, spellsFor);
        }

        private IEnumerable<Spell> FilterSpellsBySchool(IEnumerable<Spell> spells, string spellsSchool, string spellsFor)
        {
            if (spellsSchool != Constants.SPELL_SCHOOL_ALL_FILTER_TEXT)
            {
                return FilterSpellsByClass(spells.Where(spell => spell.School == spellsSchool), spellsFor);
            }
            return FilterSpellsByClass(spells, spellsFor);
        }

        private IEnumerable<Spell> FilterSpellsByClass(IEnumerable<Spell> spells, string spellsFor)
        {
            if (spellsFor != Constants.SPELL_CLASS_ALL_FILTER_TEXT)
            {
                return spells.Where(spell => spell.Classes.Contains(spellsFor));
            }
            return spells;
        }

        public void SetFilters(int spellsLevel, string spellsSchool, string spellsFor)
        {
            if (TempData.ContainsKey(Constants.SPELL_LEVEL_FILTER_TEXT))
                TempData.Remove(Constants.SPELL_LEVEL_FILTER_TEXT);
            TempData.Add(Constants.SPELL_LEVEL_FILTER_TEXT, spellsLevel);
            if (TempData.ContainsKey(Constants.SPELL_SCHOOL_FILTER_TEXT))
                TempData.Remove(Constants.SPELL_SCHOOL_FILTER_TEXT);
            TempData.Add(Constants.SPELL_SCHOOL_FILTER_TEXT, spellsSchool);
            if (TempData.ContainsKey(Constants.SPELL_CLASS_FILTER_TEXT))
                TempData.Remove(Constants.SPELL_CLASS_FILTER_TEXT);
            TempData.Add(Constants.SPELL_CLASS_FILTER_TEXT, spellsFor);
        }
    }
}
