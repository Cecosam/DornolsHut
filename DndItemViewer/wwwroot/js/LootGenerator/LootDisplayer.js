class LootDisplayer {
    displayLoot(thisCreatureId, dataWithLoot, params) {
        this.activateCreatureLiElement(thisCreatureId, params);
        this.showLoot(dataWithLoot[thisCreatureId]);
    }
    clearLootTable() {
        clearElements(document.getElementById("LootPersonalTable"));
        clearElements(document.getElementById("LootPersonalHeadOfTable"));
        clearElements(document.getElementById("LootTable"));
        clearElements(document.getElementById("LootHeadOfTable"));
        clearElements(document.getElementById("HarvestHeadOfTable"));
        clearElements(document.getElementById("HarvestTable"));
        document.getElementById("lootableItemsPersonal").hidden = true;
        document.getElementById("lootableItems").hidden = true;
        document.getElementById("harvestableItems").hidden = true;
    }
    showLoot(lootAsJson) {
        if (lootAsJson == "" || !lootAsJson) {
            return;
        }
        this.clearLootTable();
        document.getElementById("lootableItemsPersonal").hidden = false;
        this.addElementsToHeadOfTable(addHeadOfTable("LootPersonalHeadOfTable"), ["Name", "Category", "Rarity", "DC"], "LootPersonal");
        this.addLootPersonalToTable(lootAsJson);
        document.getElementById("lootableItems").hidden = false;
        document.getElementById("harvestableItems").hidden = false;
        this.addElementsToHeadOfTable(addHeadOfTable("LootHeadOfTable"), ["Name", "Category", "Rarity", "DC"], "Loot");
        this.addLootToTable(lootAsJson);
        this.addElementsToHeadOfTable(addHeadOfTable("HarvestHeadOfTable"), ["Name", "DC", "Wieght"], "Harvest");
        this.addHarvestToTable(lootAsJson);
    }
    addHarvestToTable(data) {
        let tbody = document.getElementById("HarvestTable");
        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }
        for (let i = 0; i < data.item2.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            if (showTooltip) {
                tr.appendChild(document.createElement("td")).appendChild(this.createTooltipForHarvest(data.item2[i]));
            }
            else {
                tr.appendChild(document.createElement("td")).appendChild(this.addAnchorElementForHarvestItem(data.item2[i]));
            }
            tr.appendChild(addTdElementWithClass("text-center", `${data.item2[i].skill} skill check to harvest. DC: ${data.item2[i].dc}`));
            if (data.item2[i].weight == "-") {
                tr.appendChild(addTdElementWithClass("text-center", data.item2[i].weight));
            }
            else {
                tr.appendChild(addTdElementWithClass("text-center", `${data.item2[i].weight} lb.`));
            }
        }
        if (data.item2.length == 0) {
            let tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(addTdElementWithClass("text-center", "-"));
            tr.appendChild(addTdElementWithClass("text-center", "-"));
            tr.appendChild(addTdElementWithClass("text-center", "-"));
        }
    }
    addLootPersonalToTable(data) {
        let tbody = document.getElementById("LootPersonalTable");
        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }
        for (var i = 0; i < data.item3.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            if (showTooltip) {
                tr.appendChild(document.createElement("td")).appendChild(this.createTooltipForLoot(data.item3[i]));
            }
            else {
                tr.appendChild(document.createElement("td")).appendChild(this.addAnchorElementForLootItem(data.item3[i]));
            }
            tr.appendChild(addTdElementWithClass("text-center", getCategory(data.item3[i].category)));
            tr.appendChild(addTdElementWithClass("text-center", getRarity(data.item3[i].rarity)));
            //No Arcana check for treasures
            if (data.item3[i].category == 1) {
                tr.appendChild(addTdElementWithClass("text-center", "-"));
            }
            else {
                tr.appendChild(addTdElementWithClass("text-center", this.getDCFromRarity(data.item3[i].rarity)));
            }
        }
        if (data.item3.length == 0) {
            let tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(addTdElementWithClass("text-center", "-"));
            tr.appendChild(addTdElementWithClass("text-center", "-"));
            tr.appendChild(addTdElementWithClass("text-center", "-"));
            tr.appendChild(addTdElementWithClass("text-center", "-"));
        }
    }
    addLootToTable(data) {
        let tbody = document.getElementById("LootTable");
        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }
        for (let i = 0; i < data.item1.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            if (showTooltip) {
                tr.appendChild(document.createElement("td")).appendChild(this.createTooltipForLoot(data.item1[i]));
            }
            else {
                tr.appendChild(document.createElement("td")).appendChild(this.addAnchorElementForLootItem(data.item1[i]));
            }
            tr.appendChild(addTdElementWithClass("text-center", getCategory(data.item1[i].category)));
            tr.appendChild(addTdElementWithClass("text-center", getRarity(data.item1[i].rarity)));
            //No Arcana check for treasures
            if (data.item1[i].category == 1) {
                tr.appendChild(addTdElementWithClass("text-center", "-"));
            }
            else {
                tr.appendChild(addTdElementWithClass("text-center", this.getDCFromRarity(data.item1[i].rarity)));
            }
        }
    }
    addElementsToHeadOfTable(tr, array, thFor) {
        for (let i = 0; i < array.length; i++) {
            let th = tr.appendChild(document.createElement("th"));
            th.className = `${array[i].replace(/ /g, '')}${thFor}`;
            let a = th.appendChild(document.createElement("a"));
            a.setAttribute("id", `HeadTableAnchorFor${array[i]}`);
            a.className = "nav-link";
            a.appendChild(document.createTextNode(array[i]));
        }
    }
    activateCreatureLiElement(creatureId, params) {
        let lootDiv = document.getElementById("lootDiv");
        let newSelectedCreature = document.getElementById(creatureId);
        let creaturesUl = document.getElementById("creaturesUl");
        let button;
        lootDiv.hidden = false;
        //Check if there is previous creature
        if (params.lastSelectedCreature) {
            params.lastSelectedCreature.className = "list-group-item d-flex justify-content-between align-items-center flex-row-c";
            button = params.lastSelectedCreature.getElementsByClassName("btn-info")[0];
            //If it is the same creature show or hide content
            if (params.lastSelectedCreature == newSelectedCreature && params.isLootVisible) {
                setCookie(ACTIVE_CREATURE_COOKIE_NAME, "None");
                lootDiv.hidden = true;
                params.isLootVisible = false;
                button.removeChild(button.firstChild);
                button.appendChild(document.createTextNode(SHOW_LOOT_AS_TEXT));
            }
            else {
                setCookie(ACTIVE_CREATURE_COOKIE_NAME, creatureId);
                params.isLootVisible = true;
                button.removeChild(button.firstChild);
                button.appendChild(document.createTextNode(HIDE_LOOT_AS_TEXT));
            }
        }
        //If it is not the same creature change its button to hide
        if (params.lastSelectedCreature != newSelectedCreature) {
            setCookie(ACTIVE_CREATURE_COOKIE_NAME, creatureId);
            button = newSelectedCreature.getElementsByClassName("btn-info")[0];
            button.removeChild(button.firstChild);
            button.appendChild(document.createTextNode(HIDE_LOOT_AS_TEXT));
            //If there is previous creature, change its button to show 
            if (params.lastSelectedCreature) {
                button = params.lastSelectedCreature.getElementsByClassName("btn-info")[0];
                button.removeChild(button.firstChild);
                button.appendChild(document.createTextNode(SHOW_LOOT_AS_TEXT));
            }
        }
        params.lastSelectedCreature = newSelectedCreature;
        params.lastSelectedCreature.className += " active";
        //If the screen is small or for mobile attach the loot div to the active li element(creature)
        if (creaturesUl.getElementsByTagName("div").length != 0) {
            let activeLiElement = creaturesUl.getElementsByClassName("active")[0];
            activeLiElement.parentNode.insertBefore(lootDiv, activeLiElement.nextSibling);
        }
    }
    addAnchorElementForLootItem(item) {
        let a = document.createElement("a");
        a.setAttribute("href", `/ItemViewer/ShowItem?category=${item.category}&id=${item.id}`);
        a.appendChild(document.createTextNode(item.name));
        return a;
    }
    addTdElementWithClassForLoot(className, text) {
        let item = document.createElement("td");
        item.className = className;
        item.appendChild(document.createTextNode(text));
        return item;
    }
    addAnchorElementForHarvestItem(item) {
        let a = document.createElement("a");
        a.href = `/ItemViewer/ShowHarvest?itemId=${item.id}`;
        a.appendChild(document.createTextNode(item.name));
        return a;
    }
    createTooltipForHarvest(item) {
        let div = document.createElement("div");
        div.appendChild(this.addAnchorElementForHarvestItem(item));
        div.addEventListener("mouseover", changeClassOfTooltipInnerDivLeftTop, false);
        div.className = "nav-link tooltipCust";
        let innerDiv = document.createElement("div");
        div.appendChild(innerDiv);
        innerDiv.className = "leftCustUp lootTooltip";
        let p = document.createElement("p");
        let strong = document.createElement("strong");
        strong.appendChild(document.createTextNode("Description: "));
        p.appendChild(strong);
        p.appendChild(document.createTextNode(item.description));
        p.className = "bg-dark mt-5 p-2 border border-secondary";
        innerDiv.appendChild(p);
        innerDiv.appendChild(document.createElement("i"));
        return div;
    }
    createTooltipForLoot(item) {
        let div = document.createElement("div");
        div.appendChild(this.addAnchorElementForLootItem(item));
        div.addEventListener("mouseover", changeClassOfTooltipInnerDivLeftTop, false);
        div.className = "nav-link tooltipCust ";
        let innerDiv = document.createElement("div");
        div.appendChild(innerDiv);
        innerDiv.className = "leftCustUp lootTooltip";
        let p = document.createElement("p");
        p.style.maxHeight = "440px";
        let strong = document.createElement("strong");
        strong.appendChild(document.createTextNode("Description: "));
        p.appendChild(strong);
        p.style.overflow = "hidden";
        let descDiv = ($('<div>').append(item.description))[0];
        p.appendChild(descDiv);
        p.className = "bg-dark mt-5 p-2 border border-secondary";
        innerDiv.appendChild(p);
        if (item.category == 3) {
            addInfoToTheToolTip(p, "Weight: ", `${item.weight} lb.`);
            addInfoToTheToolTip(p, "Rarity: ", getRarity(item.rarity));
            addInfoToTheToolTip(p, "Armor Type: ", getArmorType(item.armorType));
            addInfoToTheToolTip(p, "AC: ", item.armorClass);
            addInfoToTheToolTip(p, "Additional Info: ", item.additionalInfo);
            addInfoToTheToolTip(p, "Cost: ", item.cost);
            p.appendChild(document.createElement("br"));
            addInfoToTheToolTip(p, "Source: ", item.source);
        }
        else if (item.category == 4) {
            addInfoToTheToolTip(p, "Weight: ", `${item.weight} lb.`);
            addInfoToTheToolTip(p, "Rarity: ", getRarity(item.rarity));
            addInfoToTheToolTip(p, "Poison Type: ", `(${item.name.split("(")[1]}. ${item.poisonTypes}`);
            addInfoToTheToolTip(p, "Cost: ", item.cost);
            p.appendChild(document.createElement("br"));
            addInfoToTheToolTip(p, "Source: ", item.source);
        }
        else if (item.category == 5 || item.category == 6) {
            addInfoToTheToolTip(p, "Weight: ", `${item.weight} lb.`);
            addInfoToTheToolTip(p, "Rarity: ", getRarity(item.rarity));
            addInfoToTheToolTip(p, "Damage: ", `${item.damage} ${item.damageType}`);
            addInfoToTheToolTip(p, "Additional Info: ", item.additionalInfo);
            addInfoToTheToolTip(p, "Cost: ", item.cost);
            p.appendChild(document.createElement("br"));
            addInfoToTheToolTip(p, "Source: ", item.source);
        }
        else if (item.category <= 2 || item.category >= 7) {
            addInfoToTheToolTip(p, "Weight: ", `${item.weight} lb.`);
            addInfoToTheToolTip(p, "Rarity: ", getRarity(item.rarity));
            addInfoToTheToolTip(p, "Cost: ", item.cost);
            p.appendChild(document.createElement("br"));
            addInfoToTheToolTip(p, "Source: ", item.source);
        }
        innerDiv.appendChild(document.createElement("i"));
        return div;
    }
    getDCFromRarity(rarity) {
        if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Common)) {
            return "-";
        }
        else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Uncommon)) {
            return "Arcana skill check to identify. DC: 10";
        }
        else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Rare)) {
            return "Arcana skill check to identify. DC: 15";
        }
        else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.VeryRare)) {
            return "Arcana skill check to identify. DC: 20";
        }
        else if (rarity == getTheKeyFromEnum(RarityEnum, RarityEnum.Legendary)) {
            return "Arcana skill check to identify. DC: 25";
        }
    }
}
//# sourceMappingURL=LootDisplayer.js.map