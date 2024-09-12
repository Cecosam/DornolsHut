const PLAYERS_HANDBOOK_URL = "https://dndstore.wizards.com/";
const PLAYERS_HANDBOOK = "Player’s Handbook";
const DUNGEON_MASTERS_GUIDE_URL = "https://dndstore.wizards.com/";
const DUNGEON_MASTERS_GUIDE = "Dungeon Master’s Guide";
const LIGHT_WEAPON_MSG = "A light weapon is small and easy to handle, making it ideal for use when fighting with two weapons.";
const HEAVY_WEAPON_MSG = "Small creatures have disadvantage on attack rolls with heavy weapons. A heavy weapon's size and bulk make it too large for a Small creature to use effectively.";
const REACH_WEAPON_MSG = "This weapon adds 5 feet to your reach when you attack with it, as well as when determining your reach for opportunity attacks with it.";
const FINESSE_WEAPON_MSG = "When making an attack with a finesse weapon, you use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.";
const LOADING_WEAPON_MSG = "Because of the time required to load this weapon, you can fire only one piece of ammunition from it when you use an action, bonus action, or reaction to fire it, regardless of the number of attacks you can normally make.";
const RANGE_WEAPON_MSG = "A weapon that can be used to make a ranged attack has a range in parentheses after the ammunition or thrown property. The range lists two numbers. The first is the weapon’s normal range in feet, and the second indicates the weapon’s long range. When attacking a target beyond normal range, you have disadvantage on the attack roll. You can’t attack a target beyond the weapon’s long range.";
const VERSATILE_WEAPON_MSG = "This weapon can be used with one or two hands. A damage value in parentheses appears with the property the damage when the weapon is used with two hands to make a melee attack.";
const TWO_HANDED_WEAPON_MSG = "This weapon requires two hands when you attack with it.";
const ABJURATION_DESCRIPTION = "The abjuration school of magic encompassed protective spells, though some of them have aggressive uses. They created physical or magical barriers, negated magical or physical abilities, harmed trespassers, or even banished the subject of the spell to another plane of existence. The abjuration school had no subschools. A wizard who specialized in abjuration was known as an abjurer.";
const TRANSMUTATION_DESCRIPTION = "The transmutation school of magic consisted of spells that changed the physical properties of some creature, thing, or condition. They might turn an enemy into a harmless creature, bolster the strength of an ally, make an object move at the caster's command, or enhance a creature's innate healing abilities to rapidly recover from injuries. The school was previously known as alteration. The transmutation school had no subschools. A wizard who specialized in transmutation was known as a transmuter.";
const CONJURATION_DESCRIPTION = "The conjuration school of arcane magic calls materials, creatures or energy to the caster and can also be reversed to send creatures to other places, either over long distances or even to a whole different plane of existence. The spells involve the transportation of objects and creatures from one location to another. The conjuration school had five subschools: calling, summoning, teleportation, healing, and creation. A wizard who specialized in conjurations spells is called a conjurer.";
const DIVINATION_DESCRIPTION = "The divination school of magic contained spells that enabled the caster to reveal information to learn secrets long forgotten, to interpret dreams, to predict the future, to find hidden things, or to foil deceptive spells. Included within the scope of divination were the abilities to detect magic and to scry. A wizard who specialized in divination was known as a diviner. A diviner had a less restrictive range of spells than other specialist wizards and only needed forsake one other school of magic, rather than the normal two, and no other specialist could choose divination as a forsaken school.";
const ENCHANTMENT_DESCRIPTION = "Enchantment spells affect the minds of others, influencing or controlling their behavior. Such spells can make enemies see the caster as a friend, force creatures to take a course of action, or even control another creature like a puppet. This school includes the spells charm person and mind fog. The enchantment school had two subschools: charm and compulsion. A wizard who specializes in enchantment is known as an enchanter or enchantress.";
const ILLUSION_DESCRIPTION = "The Illusion school includes spells that deceive the senses or minds of others. They cause people to see things that are not there, not see things that are there, hear phantom noises, or remember things that never happened. Among these spells are included invisibility and disguise self. The illusion school had five subschools: figment, glamer, pattern, phantasm, and shadow. A wizard who specializes in the schools of illusion is referred to as an illusionist.";
const EVOCATION_DESCRIPTION = "The evocation school of magic included spells that manipulated energy or tapped an unseen source of power in order to produce a desired end. In effect, they created something out of nothing. Many of these spells produced spectacular effects, and evocation spells could deal large amounts of damage. Many iconic offensive spells such as magic missile, lightning bolt and fireball were of the evocation school. The evocation school had no subschools. Other spells were channel energy such as positive energy to heal wounds. A wizard who specialized in evocation was known as an evoker.";
const NECROMANCY_DESCRIPTION = 'Necromancy, also referred to variously as the "Dark Art" or "the Dark School", was a school of magic whose spells manipulated the energies or power of death, unlife, and the life force that was in all living creatures. Such spells can grant an extra reserve of life force, drain the life energy from another creature, create the undead, or even bring the dead back to life. The necromancy school had no subschools, but had moral divisions: white, black, and grey. A wizard who specialized in the necromantic school was called a necromancer.';
const ACTIVE_CREATURE_COOKIE_NAME = "activeCreature";
const CREATURE_INPUT_COOKIE_NAME = "creatureInput";
const LAST_ORDERED_BY_COOKIE_NAME = "lastOrderedBy";
const SOURCES_USED_COOKIE_NAME = "SourcesUsed";
const DESCENDING_AS_TEXT = "Descending";
const SHOW_LOOT_AS_TEXT = "Show";
const HIDE_LOOT_AS_TEXT = "Hide";
const REMOVE_CREATURE_AS_TEXT = "Remove";
const onMediaMinWidthSite = window.matchMedia('(min-width: 1000px)');
function setCookie(cookieName, cookieValue, expiresDate = "") {
    if (expiresDate == "")
        document.cookie = `${cookieName}=${cookieValue}; SameSite=Strict`;
    else
        document.cookie = `${cookieName}=${cookieValue}; expires=${expiresDate}; SameSite=Strict`;
}
function getCookie(cookieName) {
    cookieName = `${cookieName}=`;
    let cookiesArray = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}
function checkIfLastOrderByCookieIsValid(isisLargeDevice, orderBy, arrayForLarge, arrayForSmall) {
    let array;
    if (isisLargeDevice) {
        array = arrayForLarge;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == orderBy) {
                return orderBy;
            }
        }
    }
    else {
        array = arrayForSmall;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == orderBy) {
                return orderBy;
            }
        }
    }
    return arrayForLarge[0];
}
function changeViewForOnSmallerScreen(e) {
    if (e.matches) {
        document.getElementById("contacts").hidden = false;
    }
    else {
        document.getElementById("contacts").hidden = true;
    }
}
onMediaMinWidthSite.addEventListener("change", (event) => {
    changeViewForOnSmallerScreen(event);
});
// Initial check
changeViewForOnSmallerScreen(onMediaMinWidthSite);
function getSpellLevelAsText(spellLevel) {
    if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Cantrip)) {
        return SpellLevelEnum.Cantrip;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level1)) {
        return SpellLevelEnum.Level1;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level2)) {
        return SpellLevelEnum.Level2;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level3)) {
        return SpellLevelEnum.Level3;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level4)) {
        return SpellLevelEnum.Level4;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level5)) {
        return SpellLevelEnum.Level5;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level6)) {
        return SpellLevelEnum.Level6;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level7)) {
        return SpellLevelEnum.Level7;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level8)) {
        return SpellLevelEnum.Level8;
    }
    else if (spellLevel == getTheKeyFromEnum(SpellLevelEnum, SpellLevelEnum.Level9)) {
        return SpellLevelEnum.Level9;
    }
}
function replaceAtFunc(inputWord, wordToReplace, index, replacement) {
    var startWord = inputWord.substring(0, index);
    var endWord = inputWord.substring(index + wordToReplace.length);
    return startWord + replacement + endWord;
}
function addInfoToTheToolTip(container, propertyName, propertyContent) {
    var p = document.createElement("p");
    var div = document.createElement("div");
    var strong = document.createElement("strong");
    strong.appendChild(document.createTextNode(propertyName));
    div.appendChild(strong);
    div.appendChild(document.createTextNode(propertyContent));
    container.appendChild(div);
}
function toCamelCase(key, value) {
    if (value && typeof value === 'object') {
        for (var k in value) {
            if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
                value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                delete value[k];
            }
        }
    }
    return value;
}
function clearElements(element) {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}
function isNumeric(inputString) {
    if (typeof inputString != "string")
        return false;
    return !isNaN(inputString) && !isNaN(parseFloat(inputString));
}
function addTdElementWithClass(className, text) {
    let item = document.createElement("td");
    item.className = className;
    item.appendChild(document.createTextNode(text));
    return item;
}
function addHeadOfTable(id) {
    let thead = document.getElementById(id);
    while (thead.firstChild) {
        thead.firstChild.remove();
    }
    return thead.appendChild(document.createElement("tr"));
}
function getTheKeyFromEnum(enumeration, enumerationValue) {
    let keys = Object.keys(enumeration);
    for (var i = 0; i < keys.length; i++) {
        if (enumeration[keys[i]].toLowerCase() == enumerationValue.toLowerCase()) {
            return i;
        }
    }
    return undefined; // Couldn't find it
}
getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Shield);
function getArmorName(armorName) {
    if (ArmorNameEnum.Padded == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Padded);
    else if (ArmorNameEnum.Leather == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Leather);
    else if (ArmorNameEnum.StuddedLeather == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.StuddedLeather);
    else if (ArmorNameEnum.Hide == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Hide);
    else if (ArmorNameEnum.ChainShirt == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.ChainShirt);
    else if (ArmorNameEnum.ScaleMail == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.ScaleMail);
    else if (ArmorNameEnum.Breastplate == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Breastplate);
    else if (ArmorNameEnum.HalfPlate == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.HalfPlate);
    else if (ArmorNameEnum.RingMail == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.RingMail);
    else if (ArmorNameEnum.ChainMail == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.ChainMail);
    else if (ArmorNameEnum.Splint == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Splint);
    else if (ArmorNameEnum.Plate == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Plate);
    else if (ArmorNameEnum.Shield == armorName)
        return getTheKeyFromEnum(ArmorNameEnum, ArmorNameEnum.Shield);
}
function getRarity(rarity) {
    if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Common)) {
        return RarityEnum.Common;
    }
    else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Uncommon)) {
        return RarityEnum.Uncommon;
    }
    else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Rare)) {
        return RarityEnum.Rare;
    }
    else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.VeryRare)) {
        return RarityEnum.VeryRare;
    }
    else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Legendary)) {
        return RarityEnum.Legendary;
    }
}
function getCategory(category) {
    if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Potions))
        return CategoryEnum.Potions;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Treasures))
        return CategoryEnum.Treasures;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Rings))
        return CategoryEnum.Rings;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Armors))
        return CategoryEnum.Armors;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Poisons))
        return CategoryEnum.Poisons;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.SimpleWeapons))
        return CategoryEnum.SimpleWeapons;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.MartialWeapons))
        return CategoryEnum.MartialWeapons;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Rods))
        return CategoryEnum.Rods;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Staffs))
        return CategoryEnum.Staffs;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.Wands))
        return CategoryEnum.Wands;
    else if (category == getTheKeyFromEnum(CategoryEnum, CategoryEnum.WondrousItems))
        return CategoryEnum.WondrousItems;
}
function getArmorType(type) {
    if (type == getTheKeyFromEnum(ArmorTypeEnum, ArmorTypeEnum.Light))
        return ArmorTypeEnum.Light;
    else if (type == getTheKeyFromEnum(ArmorTypeEnum, ArmorTypeEnum.Medium))
        return ArmorTypeEnum.Medium;
    else if (type == getTheKeyFromEnum(ArmorTypeEnum, ArmorTypeEnum.Heavy))
        return ArmorTypeEnum.Heavy;
    else
        return ArmorTypeEnum.Shield;
}
function getItemType(type) {
    if (type == 0) {
        return "Magic Item";
    }
    else if (type == 1) {
        return "Item";
    }
}
function getSourceUrl(source) {
    if (source == DUNGEON_MASTERS_GUIDE)
        return DUNGEON_MASTERS_GUIDE_URL;
    else if (source == PLAYERS_HANDBOOK)
        return PLAYERS_HANDBOOK_URL;
}
//Functionality for changing tooltips
let showTooltip = true;
function changeClassOfTooltipInnerDivLeftTop(event) {
    //Change tooltips when needed
    var tooltip = event.target.getElementsByClassName("lootTooltip");
    if (tooltip.length != 0) {
        if (event.clientY > 500) {
            if (showTooltip == true) {
                tooltip[0].className = "topCust lootTooltip";
            }
            else {
                tooltip[0].className = "hiddenTooltip lootTooltip";
            }
        }
        else {
            if (showTooltip == true) {
                tooltip[0].className = "leftCustUp lootTooltip";
            }
            else {
                tooltip[0].className = "hiddenTooltip lootTooltip";
            }
        }
    }
}
function changeClassOfTooltipInnerDivLeftUpLeftDown(event) {
    var tooltip = event.target.getElementsByClassName("infoTooltip");
    if (tooltip.length != 0) {
        if (event.clientY > 500) {
            tooltip[0].className = "leftCustDown infoTooltip";
        }
        else {
            tooltip[0].className = "leftCustUp infoTooltip";
        }
    }
}
function changeClassOfTooltipInnerDivRightUpRightDown(event) {
    var tooltip = event.target.getElementsByClassName("spellTooltip");
    if (tooltip.length != 0) {
        if (event.clientY > 500) {
            if (showTooltip == true) {
                tooltip[0].className = "rightCustDown spellTooltip";
            }
            else {
                tooltip[0].className = "hiddenTooltip spellTooltip";
            }
        }
        else {
            if (showTooltip == true) {
                tooltip[0].className = "rightCustUp spellTooltip";
            }
            else {
                tooltip[0].className = "hiddenTooltip spellTooltip";
            }
        }
    }
}
//# sourceMappingURL=site.js.map