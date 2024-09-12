
class CreatureRemover {

    public removeCreature(id: number, dataWithLoot: any, lastSelectedCreature: HTMLElement):void {
        let cookieId: number = getCookie(ACTIVE_CREATURE_COOKIE_NAME) as unknown as number;
        if (cookieId == id) {
            setCookie(ACTIVE_CREATURE_COOKIE_NAME, "None");
        }
        else if (cookieId > id){
            setCookie(ACTIVE_CREATURE_COOKIE_NAME, cookieId - 1);
        }
            
        location.href = `/LootGenerator/RemoveCreature?liElementId=${id}`;
    }
}

function clearLootTable() {
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