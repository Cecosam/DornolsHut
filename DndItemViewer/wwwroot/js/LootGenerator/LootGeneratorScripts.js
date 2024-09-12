let creatureLiElementId = 0;
let dataWithLoot = [];
let lastSelectedCreature;
let creatureToRemoveId = 0;
let isLootVisible = true;
let isPageLoaded = false;
let creatureAdder;
let lootGeneratorManager;
let creatureRemover;
let lootGenerator;
let lootDisplayer;
window.addEventListener("load", function (event) {
    addEventListenersInit();
    dependenciesInit();
    if (window.innerWidth < 1000) {
        showTooltip = false;
    }
    isPageLoaded = true;
    checkForSession();
    hideLoadingScreen("mainLootGeneratorDiv");
}, false);
function dependenciesInit() {
    lootGeneratorManager = new LootGeneratorManager();
    lootDisplayer = new LootDisplayer();
    lootGenerator = new LootGenerator();
    creatureRemover = new CreatureRemover();
    creatureAdder = new CreatureAdder(lootGeneratorManager);
}
function addEventListenersInit() {
    document.getElementById("AddCreatureButton").addEventListener("click", createCreatureModal, false);
    document.getElementById("LootGenerationInfo").addEventListener("click", goToLootGenerationInfoFuckMS, false);
    document.getElementById("CloseModalAsX").addEventListener("click", closeModal, false);
    document.getElementById("CloseModalAsButton").addEventListener("click", closeModal, false);
}
function checkForSession() {
    for (let i = 0; i < sessionData.length; i++) {
        let item = JSON.parse(sessionData[i], toCamelCase);
        let creatureToAdd = "";
        for (let j = 0; j < data.length; j++) {
            if (data[j].id == item.item4) {
                creatureToAdd = data[j];
                break;
            }
        }
        let creatureIdToUse = creatureLiElementId;
        addCreatureToUList(creatureToAdd);
        if (item.item1.length == 0) {
            dataWithLoot[creatureIdToUse] = "";
            continue;
        }
        let button = document.getElementById(`getLootButton${creatureToAdd.id}on${creatureIdToUse}`);
        button.removeChild(button.firstChild);
        button.appendChild(document.createTextNode(SHOW_LOOT_AS_TEXT));
        button.className = "btn btn-info";
        button.setAttribute("id", `showLootButton${creatureIdToUse}`);
        button.addEventListener("click", function (event) { showCreaturesLootEvent(event); }, false);
        button.removeEventListener("click", getLootForEvent);
        dataWithLoot[creatureIdToUse] = item;
    }
    showLastActiveCreatureLoot();
}
function showLastActiveCreatureLoot() {
    let lastActiveCreature = getCookie(ACTIVE_CREATURE_COOKIE_NAME);
    if (lastActiveCreature == "None" || lastActiveCreature == "NaN" || lastActiveCreature == "" || dataWithLoot[lastActiveCreature] == "") {
        return;
    }
    if (lastActiveCreature < creatureLiElementId)
        showCreaturesLoot(lastActiveCreature);
    else if (creatureLiElementId != 0 && dataWithLoot[0] != "")
        showCreaturesLoot(0);
}
function addCreatureToUList(creatureToAdd) {
    creatureLiElementId = creatureAdder.addCreatureToUList(creatureToAdd, creatureLiElementId);
}
function createCreatureModal() {
    lootGeneratorManager.openCreateCreatureModal();
}
function openRemoveCreatureModal(event) {
    creatureToRemoveId = lootGeneratorManager.openRemoveCreatureModal();
}
function removeTheCreatureFromTheList() {
    closeModal();
    removeCreatureFromList(creatureToRemoveId);
}
function closeModal() {
    lootGeneratorManager.closeModal();
}
function chooseCreatureInModal() {
    creatureAdder.chooseCreature(data);
}
function chooseThisCreature(creatureToAdd) {
    document.getElementById("chooseCreatureInputInModal").value = creatureToAdd;
    let listWithICreatures = document.getElementById("listWithCreatures");
    listWithICreatures.style.maxHeight = "0px";
}
function addCreatureToList() {
    showLoadingScreen("mainLootGeneratorDiv");
    creatureLiElementId = creatureAdder.addCreature(creatureLiElementId, data);
}
function removeCreatureFromList(id) {
    showLoadingScreen("mainLootGeneratorDiv");
    creatureRemover.removeCreature(id, dataWithLoot, lastSelectedCreature);
}
function getLoot(event) {
    let button = event.target;
    showLoadingScreen("mainLootGeneratorDiv");
    lootGenerator.getLoot(button, dataWithLoot);
}
function showCreaturesLootEvent(event) {
    let thisCreatureId = event.target.id.replace("showLootButton", "");
    const inputParams = { lastSelectedCreature: lastSelectedCreature, isLootVisible: isLootVisible };
    lootDisplayer.displayLoot(thisCreatureId, dataWithLoot, inputParams);
    lastSelectedCreature = inputParams.lastSelectedCreature;
    isLootVisible = inputParams.isLootVisible;
}
function showCreaturesLoot(thisCreatureId) {
    const inputParams = { lastSelectedCreature: lastSelectedCreature, isLootVisible: isLootVisible };
    lootDisplayer.displayLoot(thisCreatureId, dataWithLoot, inputParams);
    lastSelectedCreature = inputParams.lastSelectedCreature;
    isLootVisible = inputParams.isLootVisible;
}
function goToLootGenerationInfoFuckMS() {
    location.href = '/LootGenerator/LootGenerationInfo';
}
function changeViewForLootGeneratorOnSmallerScreen(e) {
    let creaturesDiv = document.getElementById("creaturesDiv");
    let lootGeneratorContent = document.getElementById("lootGeneratorContent");
    let lootDiv = document.getElementById("lootDiv");
    let creaturesUl = document.getElementById("creaturesUl");
    let activeLiElement;
    if (creaturesUl.getElementsByClassName("active").length != 0) {
        activeLiElement = creaturesUl.getElementsByClassName("active")[0];
    }
    if (e.matches) {
        showTooltip = true;
        creaturesDiv.style.width = "50%";
        lootDiv.style.width = "50%";
        lootDiv.style.marginBottom = "4.5rem";
        if (creaturesUl.contains(lootDiv)) {
            creaturesUl.removeChild(lootDiv);
            lootGeneratorContent.appendChild(lootDiv);
        }
        if (isPageLoaded) {
            showLastActiveCreatureLoot();
        }
    }
    else {
        showTooltip = false;
        creaturesDiv.style.width = "100%";
        lootDiv.style.width = "100%";
        lootDiv.style.marginBottom = "0.5rem";
        lootGeneratorContent.removeChild(lootDiv);
        if (activeLiElement) {
            activeLiElement.parentNode.insertBefore(lootDiv, activeLiElement.nextSibling);
        }
        else {
            creaturesUl.appendChild(lootDiv);
        }
        if (isPageLoaded) {
            showLastActiveCreatureLoot();
        }
    }
}
function getLootForEvent(event) {
    getLoot(event);
    event.target.removeEventListener("click", getLootForEvent);
}
const onMediaMinWidthLootGenerator = window.matchMedia('(min-width: 1000px)');
onMediaMinWidthLootGenerator.addEventListener("change", (event) => {
    changeViewForLootGeneratorOnSmallerScreen(event);
});
// Initial check
changeViewForLootGeneratorOnSmallerScreen(onMediaMinWidthLootGenerator);
//# sourceMappingURL=LootGeneratorScripts.js.map