class CreatureRemover {
    removeCreature(id, dataWithLoot, lastSelectedCreature) {
        let cookieId = getCookie(ACTIVE_CREATURE_COOKIE_NAME);
        if (cookieId == id) {
            setCookie(ACTIVE_CREATURE_COOKIE_NAME, "None");
        }
        else if (cookieId > id) {
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
//# sourceMappingURL=CreatureRemover.js.map