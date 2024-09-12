
using DnDLootGenerator.Data.Data;
using DnDLootGenerator.Models.Enumerations;
using DnDLootGenerator.Models.Models;

namespace DndItemViewer.Helpers.LootGenerators
{
    public class LootGenerator : ILootGenerator
    {
        public const int D_100_DICE = 101;
        private ApplicationDbContext dbContext;

        public LootGenerator(ApplicationDbContext appDbContext)
        {
            dbContext = appDbContext;
        }
        public List<HarvestableItem> GetHarvestableItems(int creatureId)
        {
            var creature = dbContext.Creatures.FirstOrDefault(creature => creature.Id == creatureId);
            return dbContext.HarvestableItems.Where(item => item.ItemFor == creature.Name).ToList();
        }

        public void GenerateLoot(int creatureId, List<dynamic> hoardLoot, List<dynamic> personalLoot)
        {
            var creature = dbContext.Creatures.FirstOrDefault(creature => creature.Id == creatureId);
            if (creature != null)
            {
                //for creatures that have rating under 1 --- 1/8, 1/4 ....
                int creatureRating = 0;
                if (!int.TryParse(creature.CreatureRating, out creatureRating))
                {
                    creatureRating = 1;
                }
                var rng = new Random();
                //Items count - 1d4 + CR/5
                var itemsCount = rng.Next(1, 5) + (creatureRating / 5);

                for (int i = 0; i < itemsCount; i++)
                {
                    hoardLoot.Add(SelectItem(rng, creatureRating));
                }

                var listOfPersonalItems = creature.Equipment.Split("@");
                for (int i = 0; i < listOfPersonalItems.Length; i++)
                {
                    if (listOfPersonalItems[i] != string.Empty)
                    {
                        var result = GetPersonalItemFromList(rng, creatureRating, listOfPersonalItems[i].Trim());
                        if (result != null)
                        {
                            personalLoot.Add(result);
                        }
                    }
                }
            }
        }

        private dynamic GetArmor(RarityEnumeration rarity, ArmorNameEnumeration armor)
        {
            return dbContext.Armors.Where(item => item.Rarity == rarity && item.ArmorName == armor).OrderBy(r => Guid.NewGuid()).Take(1).First();
        }

        private dynamic GetLegendaryWeapon(RarityEnumeration rarity, CategoryEnumeration weaponCategory, WeaponGroupEnumeration weapon)
        {
            return dbContext.Weapons.Where(item => item.Rarity == rarity && item.Category == weaponCategory && item.WeaponGroup == weapon)
                .OrderBy(r => Guid.NewGuid()).Take(1).First();
        }

        private dynamic GetNonLegendaryWeapon(RarityEnumeration rarity, CategoryEnumeration weaponCategory, WeaponGroupEnumeration weapon)
        {
            if (rarity == RarityEnumeration.Legendary)
                rarity--;
            return dbContext.Weapons.Where(item => item.Rarity == rarity && item.Category == weaponCategory && item.WeaponGroup == weapon)
                .OrderBy(r => Guid.NewGuid()).Take(1).First();
        }

        private dynamic GetStaff(RarityEnumeration rarity)
        {
            if (rarity == RarityEnumeration.Legendary)
                rarity--;
            else if (rarity == RarityEnumeration.Common)
                rarity++;
            return dbContext.Items.Where(item => item.Rarity == rarity && item.Category == CategoryEnumeration.Staffs)
                .OrderBy(r => Guid.NewGuid()).Take(1).First();
        }
        //HUGE THING!!!
        private dynamic GetPersonalItemFromList(Random rng, int creatureRating, string itemAsString)
        {
            itemAsString = itemAsString.Trim();
            RarityEnumeration rarity = GetRarityOfTheItem(creatureRating);
            if ("Breastplate" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.Breastplate);
            else if ("Hide" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.Hide);
            else if ("Half" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.HalfPlate);
            else if ("Chain Mail" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.ChainMail);
            else if ("Chain Shirt" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.ChainShirt);
            else if ("Leather" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.Leather);
            else if ("Plate" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.Plate);
            else if ("Ring Mail" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.RingMail);
            else if ("Scale Mail" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.ScaleMail);
            else if ("Studded" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.StuddedLeather);
            else if ("Splint" == itemAsString)
                return GetArmor(rarity, ArmorNameEnumeration.Splint);
            else if ("Elven Chain" == itemAsString)
                return dbContext.Armors.Where(item => item.Name == "Elven Chain").First();
            else if ("Shield" == itemAsString)
            {
                if (rarity == RarityEnumeration.Legendary)
                    rarity--;
                return GetArmor(rarity, ArmorNameEnumeration.Shield);
            }
            else if ("Flail" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Flail);
            else if ("Battleaxe" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Battleaxe);
            else if ("Club" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Club);
            else if ("Dagger" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Dagger);
            else if ("Dart" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Dart);
            else if ("Glaive" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Glaive);
            else if ("Greataxe" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Greataxe);
            else if ("Greatclub" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Greatclub);
            else if ("Greatsword" == itemAsString)
                return GetLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Greatsword);
            else if ("Halberd" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Halberd);    
            else if ("Hand Crossbow" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.CrossbowHand);
            else if ("Heavy Crossbow" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.CrossbowHeavy);
            else if ("Javelin" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Javelin);
            else if ("Lance" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Lance);
            else if ("Light Crossbow" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.CrossbowLight);
            else if ("Longbow" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Longbow);
            else if ("Longsword" == itemAsString)
                return GetLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Longsword);
            else if ("Mace" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Mace);
            else if ("Maul" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Maul);
            else if ("Morningstar" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Morningstar);
            else if ("Pike" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Pike);
            else if ("Quarterstaff" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Quarterstaff);
            else if ("Scimitar" == itemAsString)
                return GetLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Scimitar);
            else if ("Shortbow" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Shortbow);
            else if ("Shortsword" == itemAsString)
                return GetLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Shortsword);
            else if ("Scythe" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Sickle);
            else if ("Sling" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Sling);
            else if ("Spear" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.SimpleWeapons, WeaponGroupEnumeration.Spear);
            else if ("Staff" == itemAsString)
                return GetStaff(rarity);
            else if ("Trident" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Trident);
            else if ("War Pick" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.WarPick);
            else if ("Warhammer" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Warhammer);
            else if ("Whip" == itemAsString)
                return GetNonLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Whip);
            else if ("Oathbow" == itemAsString)
                return dbContext.Weapons.Where(item => item.Name == "Longbow Oathbow").First();
            else if ("Rapier" == itemAsString)
                return GetLegendaryWeapon(rarity, CategoryEnumeration.MartialWeapons, WeaponGroupEnumeration.Rapier);

            return null;
        }

        private dynamic SelectItem(Random rng, int creatureRating)
        {
            //Roll d100
            var category = rng.Next(1, D_100_DICE);
            dynamic lootItem = null;
            RarityEnumeration rarity = GetRarityOfTheItem(creatureRating);

            //If there are no items with that rarity => try again
            while (true)
            {
                try
                {
                    //20% to roll potion
                    if (category > 80)
                        lootItem = dbContext.Items.Where(item => item.Category == CategoryEnumeration.Potions && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //5% to roll poisons
                    else if (category > 75)
                        lootItem = dbContext.Poisons.OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //15% to roll armor
                    else if (category > 60)
                        lootItem = dbContext.Armors.Where(item => item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //15% to roll treasures
                    else if (category > 45)
                        lootItem = dbContext.Items.Where(item => item.Category == CategoryEnumeration.Treasures && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //10% to roll rings
                    else if (category > 35)
                        lootItem = dbContext.Items.Where(item => item.Category == CategoryEnumeration.Rings && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //6% to roll simple weapons
                    else if (category > 29)
                        lootItem = dbContext.Weapons.Where(item => item.Category == CategoryEnumeration.SimpleWeapons && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //9% to roll matrial weapons
                    else if (category > 20)
                        lootItem = dbContext.Weapons.Where(item => item.Category == CategoryEnumeration.MartialWeapons && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //3% to roll rods
                    else if (category > 17)
                        lootItem = dbContext.Items.Where(item => item.Category == CategoryEnumeration.Rods && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //3% to roll staffs
                    else if (category > 14)
                        lootItem = dbContext.Items.Where(item => item.Category == CategoryEnumeration.Staffs && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //4% to roll wands
                    else if (category > 10)
                        lootItem = dbContext.Items.Where(item => item.Category == CategoryEnumeration.Wands && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    //10% to roll wondrous
                    else if (category > 0)
                        lootItem = dbContext.Items.Where(item => item.Category == CategoryEnumeration.WondrousItems && item.Rarity == rarity).OrderBy(r => Guid.NewGuid()).Take(1).First();
                    break;
                }
                catch (InvalidOperationException)
                {
                    //Roll d100 ... again
                    category = rng.Next(1, D_100_DICE);
                }
            }

            return lootItem;
        }
        //Cosmic Magic numbers method
        private RarityEnumeration GetRarityOfTheItem(int creatureRating)
        {
            int commonItemDropRate = 10;
            int bias = creatureRating / 4;
            bias = bias * bias;

            creatureRating = creatureRating * 2;
            commonItemDropRate += creatureRating * 2 + (int)(bias * 3.4);

            Random rng = new Random();

            int chance = rng.Next(0, commonItemDropRate);

            if (chance < creatureRating - 50 + bias * 0.5)
            {
                return RarityEnumeration.Legendary;
            }
            else if (chance < creatureRating - 35 + bias * 0.8)
            {
                return RarityEnumeration.VeryRare;
            }
            else if (chance < creatureRating - 25 + bias * 1.4)
            {
                return RarityEnumeration.Rare;
            }
            else if (chance < creatureRating - 10 + bias * 2.2)
            {
                return RarityEnumeration.Uncommon;
            }
            else
            {
                return RarityEnumeration.Common;
            }
        }
    }
}
