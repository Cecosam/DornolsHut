
using DndItemViewer.Helpers;
using DnDLootGenerator.Data.Data;
using DnDLootGenerator.Models.Enumerations;
using DnDLootGenerator.Models.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DndItemViewer.Controllers
{
    public class ItemViewerController : Controller
    {
        private ApplicationDbContext dbContext;

        public ItemViewerController(ApplicationDbContext db)
        {
            dbContext = db;
        }

        public IActionResult ShowItem(int category, int id)
        {
            IItem result = GetItemByNameAndCategory(id, category);

            return View(result);
        }

        public IActionResult ShowHarvest(int itemId)
        {
            HarvestableItem item = dbContext.HarvestableItems.Where(harvest => harvest.Id == itemId).FirstOrDefault();

            return View(item);
        }

        public IActionResult ShowWondrousItems(int rarity)
        {
            var listOfItems = dbContext.Items.Where(item => item.Category == CategoryEnumeration.WondrousItems &&
                item.Rarity == (RarityEnumeration)rarity).ToList();

            AddIntToTempData(Constants.ITEM_CATEGORY_MSG, (int)CategoryEnumeration.WondrousItems);
            AddIntToTempData(Constants.ITEM_TO_DISPLAY_MSG, rarity);

            return View(listOfItems);
        }

        public IActionResult ShowItems(int category)
        {
            var listOfItems = dbContext.Items.Where(item => item.Category == (CategoryEnumeration)category).ToList();

            AddIntToTempData(Constants.ITEM_CATEGORY_MSG, category);

            return View(listOfItems);
        }

        public IActionResult ShowArmors(int name)
        {
            List<Armor> list = dbContext.Armors.Where(item => item.Category == CategoryEnumeration.Armors && item.ArmorName == (ArmorNameEnumeration)name).ToList();

            AddIntToTempData(Constants.ITEM_CATEGORY_MSG, (int)CategoryEnumeration.Armors);
            AddIntToTempData(Constants.ITEM_TO_DISPLAY_MSG, name);

            return View(list);
        }

        public IActionResult ShowPoisons()
        {
            List<Poison> list = dbContext.Poisons.Where(item => item.Category == CategoryEnumeration.Poisons).ToList();

            AddIntToTempData(Constants.ITEM_CATEGORY_MSG, (int)CategoryEnumeration.Poisons);

            return View(list);
        }

        public IActionResult ShowWeapons(int category, int name)
        {
            List<Weapon> list = dbContext.Weapons.Where(item => item.Category == (CategoryEnumeration)category
                && item.WeaponGroup == (WeaponGroupEnumeration)name).ToList();

            AddIntToTempData(Constants.ITEM_CATEGORY_MSG, category);
            AddIntToTempData(Constants.ITEM_TO_DISPLAY_MSG, name);

            return View(list);
        }

        private void AddIntToTempData(string key, int value)
        {
            if (TempData.ContainsKey(key))
                TempData.Remove(key);
            TempData.Add(key, value);
        }

        private IItem GetItemByNameAndCategory(int id, int category)
        {
            IItem result = null;
            if (category == (int)CategoryEnumeration.Poisons)
            {
                result = dbContext.Poisons.Where(item => item.Id == id).FirstOrDefault();
            }
            else if (category == (int)CategoryEnumeration.Armors)
            {
                result = dbContext.Armors.Where(item => item.Id == id).FirstOrDefault();
            }
            else if (category == (int)CategoryEnumeration.SimpleWeapons || category == (int)CategoryEnumeration.MartialWeapons)
            {
                result = dbContext.Weapons.Where(item => item.Id == id).FirstOrDefault();
            }
            else
            {
                result = dbContext.Items.Where(item => item.Id == id).FirstOrDefault();
            }

            return result;
        }
        private CategoryEnumeration GetCategory(string category)
        {
            if (CategoryEnumeration.Treasures.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.Treasures;
            }
            else if (CategoryEnumeration.Potions.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.Potions;
            }
            else if (CategoryEnumeration.Poisons.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.Poisons;
            }
            else if (CategoryEnumeration.Armors.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.Armors;
            }
            else if (CategoryEnumeration.Rings.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.Rings;
            }
            else if (CategoryEnumeration.SimpleWeapons.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.SimpleWeapons;
            }
            else if (CategoryEnumeration.MartialWeapons.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.MartialWeapons;
            }
            else if (CategoryEnumeration.Staffs.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.Staffs;
            }
            else if (CategoryEnumeration.Wands.GetAttribute<DisplayAttribute>().Name == category)
            {
                return CategoryEnumeration.Wands;
            }
            else
            {
                return CategoryEnumeration.Rods;
            }
        }

        //private List<string> CreateWeaponsList(string category)
        //{
        //    List<string> listOfItems = new List<string>();
        //    if ("Simple Weapons" == category)
        //    {
        //        listOfItems.Add(WeaponGroupEnumeration.Club.GetAttribute<DisplayAttribute>().Name);                          
        //        listOfItems.Add(WeaponGroupEnumeration.Dagger.GetAttribute<DisplayAttribute>().Name);                        
        //        listOfItems.Add(WeaponGroupEnumeration.Greatclub.GetAttribute<DisplayAttribute>().Name);                     
        //        listOfItems.Add(WeaponGroupEnumeration.Handaxe.GetAttribute<DisplayAttribute>().Name);                       
        //        listOfItems.Add(WeaponGroupEnumeration.Javelin.GetAttribute<DisplayAttribute>().Name);                       
        //        listOfItems.Add(WeaponGroupEnumeration.LightHammer.GetAttribute<DisplayAttribute>().Name);                   
        //        listOfItems.Add(WeaponGroupEnumeration.Mace.GetAttribute<DisplayAttribute>().Name);                          
        //        listOfItems.Add(WeaponGroupEnumeration.Quarterstaff.GetAttribute<DisplayAttribute>().Name);                  
        //        listOfItems.Add(WeaponGroupEnumeration.Sickle.GetAttribute<DisplayAttribute>().Name);                        
        //        listOfItems.Add(WeaponGroupEnumeration.Spear.GetAttribute<DisplayAttribute>().Name);                         
        //        listOfItems.Add(WeaponGroupEnumeration.CrossbowLight.GetAttribute<DisplayAttribute>().Name);                  
        //        listOfItems.Add(WeaponGroupEnumeration.Dart.GetAttribute<DisplayAttribute>().Name);                          
        //        listOfItems.Add(WeaponGroupEnumeration.Shortbow.GetAttribute<DisplayAttribute>().Name);                      
        //        listOfItems.Add(WeaponGroupEnumeration.Sling.GetAttribute<DisplayAttribute>().Name);                         
        //    }
        //    else
        //    {
        //        listOfItems.Add(WeaponGroupEnumeration.Battleaxe.GetAttribute<DisplayAttribute>().Name);                     
        //        listOfItems.Add(WeaponGroupEnumeration.Flail.GetAttribute<DisplayAttribute>().Name);                         
        //        listOfItems.Add(WeaponGroupEnumeration.Glaive.GetAttribute<DisplayAttribute>().Name);                        
        //        listOfItems.Add(WeaponGroupEnumeration.Greataxe.GetAttribute<DisplayAttribute>().Name);                      
        //        listOfItems.Add(WeaponGroupEnumeration.Greatsword.GetAttribute<DisplayAttribute>().Name);                    
        //        listOfItems.Add(WeaponGroupEnumeration.Halberd.GetAttribute<DisplayAttribute>().Name);                       
        //        listOfItems.Add(WeaponGroupEnumeration.Lance.GetAttribute<DisplayAttribute>().Name);                         
        //        listOfItems.Add(WeaponGroupEnumeration.Longsword.GetAttribute<DisplayAttribute>().Name);                     
        //        listOfItems.Add(WeaponGroupEnumeration.Maul.GetAttribute<DisplayAttribute>().Name);                          
        //        listOfItems.Add(WeaponGroupEnumeration.Morningstar.GetAttribute<DisplayAttribute>().Name);                   
        //        listOfItems.Add(WeaponGroupEnumeration.Pike.GetAttribute<DisplayAttribute>().Name);                          
        //        listOfItems.Add(WeaponGroupEnumeration.Rapier.GetAttribute<DisplayAttribute>().Name);                        
        //        listOfItems.Add(WeaponGroupEnumeration.Scimitar.GetAttribute<DisplayAttribute>().Name);                      
        //        listOfItems.Add(WeaponGroupEnumeration.Shortsword.GetAttribute<DisplayAttribute>().Name);                    
        //        listOfItems.Add(WeaponGroupEnumeration.Trident.GetAttribute<DisplayAttribute>().Name);                       
        //        listOfItems.Add(WeaponGroupEnumeration.WarPick.GetAttribute<DisplayAttribute>().Name);                       
        //        listOfItems.Add(WeaponGroupEnumeration.Warhammer.GetAttribute<DisplayAttribute>().Name);                     
        //        listOfItems.Add(WeaponGroupEnumeration.Whip.GetAttribute<DisplayAttribute>().Name);                          
        //        listOfItems.Add(WeaponGroupEnumeration.Blowgun.GetAttribute<DisplayAttribute>().Name);                       
        //        listOfItems.Add(WeaponGroupEnumeration.CrossbowHand.GetAttribute<DisplayAttribute>().Name);                  
        //        listOfItems.Add(WeaponGroupEnumeration.CrossbowHeavy.GetAttribute<DisplayAttribute>().Name);                 
        //        listOfItems.Add(WeaponGroupEnumeration.Longbow.GetAttribute<DisplayAttribute>().Name);                       
        //    }

        //    return listOfItems;
        //}

        //private WeaponGroupEnumeration GetWeaponGroupEnumerationFromString(string input)
        //{
        //    if (input == "Club")
        //        return WeaponGroupEnumeration.Club;
        //    else if (input == "Dagger")
        //        return WeaponGroupEnumeration.Dagger;
        //    else if (input == "Greatclub")
        //        return WeaponGroupEnumeration.Greatclub;
        //    else if (input == "Handaxe")
        //        return WeaponGroupEnumeration.Handaxe;
        //    else if (input == "Javelin")
        //        return WeaponGroupEnumeration.Javelin;
        //    else if (input == "Light Hammer")
        //        return WeaponGroupEnumeration.LightHammer;
        //    else if (input == "Mace")
        //        return WeaponGroupEnumeration.Mace;
        //    else if (input == "Quarterstaff")
        //        return WeaponGroupEnumeration.Quarterstaff;
        //    else if (input == "Sickle")
        //        return WeaponGroupEnumeration.Sickle;
        //    else if (input == "Spear")
        //        return WeaponGroupEnumeration.Spear;
        //    else if (input == "Crossbow, Light")
        //        return WeaponGroupEnumeration.CrossbowLight;
        //    else if (input == "Dart")
        //        return WeaponGroupEnumeration.Dart;
        //    else if (input == "Shortbow")
        //        return WeaponGroupEnumeration.Shortbow;
        //    else if (input == "Sling")
        //        return WeaponGroupEnumeration.Sling;
        //    else if (input == "Battleaxe")
        //        return WeaponGroupEnumeration.Battleaxe;
        //    else if (input == "Flail")
        //        return WeaponGroupEnumeration.Flail;
        //    else if (input == "Glaive")
        //        return WeaponGroupEnumeration.Glaive;
        //    else if (input == "Greataxe")
        //        return WeaponGroupEnumeration.Greataxe;
        //    else if (input == "Greatsword")
        //        return WeaponGroupEnumeration.Greatsword;
        //    else if (input == "Halberd")
        //        return WeaponGroupEnumeration.Halberd;
        //    else if (input == "Lance")
        //        return WeaponGroupEnumeration.Lance;
        //    else if (input == "Longsword")
        //        return WeaponGroupEnumeration.Longsword;
        //    else if (input == "Maul")
        //        return WeaponGroupEnumeration.Maul;
        //    else if (input == "Morningstar")
        //        return WeaponGroupEnumeration.Morningstar;
        //    else if (input == "Pike")
        //        return WeaponGroupEnumeration.Pike;
        //    else if (input == "Rapier")
        //        return WeaponGroupEnumeration.Rapier;
        //    else if (input == "Scimitar")
        //        return WeaponGroupEnumeration.Scimitar;
        //    else if (input == "Shortsword")
        //        return WeaponGroupEnumeration.Shortsword;
        //    else if (input == "Trident")
        //        return WeaponGroupEnumeration.Trident;
        //    else if (input == "War Pick")
        //        return WeaponGroupEnumeration.WarPick;
        //    else if (input == "Warhammer")
        //        return WeaponGroupEnumeration.Warhammer;
        //    else if (input == "Whip")
        //        return WeaponGroupEnumeration.Whip;
        //    else if (input == "Blowgun")
        //        return WeaponGroupEnumeration.Blowgun;
        //    else if (input == "Crossbow, Hand")
        //        return WeaponGroupEnumeration.CrossbowHand;
        //    else if (input == "Crossbow, Heavy")
        //        return WeaponGroupEnumeration.CrossbowHeavy;
        //    else 
        //        return WeaponGroupEnumeration.Longbow;
        //}
        private ArmorNameEnumeration getArmorNameEnumerationFromString(string input)
        {
            if (input == "Padded")
            {
                return ArmorNameEnumeration.Padded;
            }
            else if (input == "Leather")
            {
                return ArmorNameEnumeration.Leather;
            }
            else if (input == "Studded Leather")
            {
                return ArmorNameEnumeration.StuddedLeather;
            }
            else if (input == "Hide")
            {
                return ArmorNameEnumeration.Hide;
            }
            else if (input == "Chain Shirt")
            {
                return ArmorNameEnumeration.ChainShirt;
            }
            else if (input == "Scale Mail")
            {
                return ArmorNameEnumeration.ScaleMail;
            }
            else if (input == "Breastplate")
            {
                return ArmorNameEnumeration.Breastplate;
            }
            else if (input == "Half Plate")
            {
                return ArmorNameEnumeration.HalfPlate;
            }
            else if (input == "Ring Mail")
            {
                return ArmorNameEnumeration.RingMail;
            }
            else if (input == "Chain Mail")
            {
                return ArmorNameEnumeration.ChainMail;
            }
            else if (input == "Splint")
            {
                return ArmorNameEnumeration.Splint;
            }
            else if (input == "Plate")
            {
                return ArmorNameEnumeration.Plate;
            }
            else
            {
                return ArmorNameEnumeration.Shield;
            }
        }
        //private List<string> CreateArmorTypesList()
        //{
        //    List<string> listOfItems = new List<string>();
        //    //listOfItems.Add("All");
        //    listOfItems.Add("Padded");
        //    listOfItems.Add("Leather");
        //    listOfItems.Add("Studded Leather");
        //    listOfItems.Add("Hide");
        //    listOfItems.Add("Chain Shirt");
        //    listOfItems.Add("Scale Mail");
        //    listOfItems.Add("Breastplate");
        //    listOfItems.Add("Half Plate");
        //    listOfItems.Add("Ring Mail");
        //    listOfItems.Add("Chain Mail");
        //    listOfItems.Add("Splint");
        //    listOfItems.Add("Plate");
        //    listOfItems.Add("Shield");

        //    return listOfItems;
        //}
    }
}
