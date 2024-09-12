using DnDLootGenerator.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace DnDLootGenerator.Data.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }


        public DbSet<Item> Items { get; set; }
        public DbSet<Armor> Armors { get; set; }
        public DbSet<Poison> Poisons { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<Creature> Creatures { get; set; }
        public DbSet<HarvestableItem> HarvestableItems { get; set; }
        public DbSet<Spell> Spells { get; set; }
    }
}
