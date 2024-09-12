declare const data: any;
declare const sessionData: any;


let creatureLiElementId = 0;
let dataWithLoot = [];
let lastSelectedCreature: HTMLElement;
let creatureToRemoveId: number = 0;
let isLootVisible: boolean = true;
let isPageLoaded: boolean = false;

let creatureAdder: CreatureAdder;
let lootGeneratorManager: LootGeneratorManager;
let creatureRemover: CreatureRemover;
let lootGenerator: LootGenerator;
let lootDisplayer: LootDisplayer;

window.addEventListener("load", function (event: PageTransitionEvent): void{
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

function checkForSession() :void{
    for (let i = 0; i < sessionData.length; i++) {
        let item: any = JSON.parse(sessionData[i], toCamelCase);

        let creatureToAdd: any = "";
        for (let j = 0; j < data.length; j++) {
            if (data[j].id == item.item4) {
                creatureToAdd = data[j];
                break;
            }
        }
        let creatureIdToUse: number = creatureLiElementId;

        addCreatureToUList(creatureToAdd);
        if (item.item1.length == 0) {
            dataWithLoot[creatureIdToUse] = "";
            continue;
        }

        let button: HTMLButtonElement = document.getElementById(`getLootButton${creatureToAdd.id}on${creatureIdToUse}`) as HTMLButtonElement;
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

function showLastActiveCreatureLoot() :void{
    let lastActiveCreature: string = getCookie(ACTIVE_CREATURE_COOKIE_NAME);
    if (lastActiveCreature == "None" || lastActiveCreature == "NaN" || lastActiveCreature == "" || dataWithLoot[(lastActiveCreature as unknown) as number] == "") {
        return;
    }

    if (lastActiveCreature as unknown as number < creatureLiElementId)
        showCreaturesLoot((lastActiveCreature as unknown) as number);
    else if (creatureLiElementId != 0 && dataWithLoot[0] != "")
        showCreaturesLoot(0);
}

function addCreatureToUList(creatureToAdd: any): void{
    creatureLiElementId = creatureAdder.addCreatureToUList(creatureToAdd, creatureLiElementId);
}

function createCreatureModal(): void{
    lootGeneratorManager.openCreateCreatureModal();    
}

function openRemoveCreatureModal(event: Event): void{
    creatureToRemoveId = lootGeneratorManager.openRemoveCreatureModal();
}

function removeTheCreatureFromTheList() :void{
    closeModal();
    removeCreatureFromList(creatureToRemoveId);
}

function closeModal(): void{
    lootGeneratorManager.closeModal();    
}



function chooseCreatureInModal(): void{
    creatureAdder.chooseCreature(data);    
}

function chooseThisCreature(creatureToAdd: string): void {
    (document.getElementById("chooseCreatureInputInModal") as HTMLInputElement).value = creatureToAdd;
    let listWithICreatures: HTMLElement = document.getElementById("listWithCreatures");
    listWithICreatures.style.maxHeight = "0px";
}

function addCreatureToList(): void{
    showLoadingScreen("mainLootGeneratorDiv");
    creatureLiElementId = creatureAdder.addCreature(creatureLiElementId, data);
    hideLoadingScreen("mainLootGeneratorDiv");
}

function removeCreatureFromList(id: number): void{
    showLoadingScreen("mainLootGeneratorDiv");
    creatureRemover.removeCreature(id, dataWithLoot, lastSelectedCreature);
}

function getLoot(event: Event) :void{
    let button: HTMLButtonElement = event.target as HTMLButtonElement;
    showLoadingScreen("mainLootGeneratorDiv");
    lootGenerator.getLoot(button, dataWithLoot);
}

function showCreaturesLootEvent(event: Event):void {
    let thisCreatureId: number = ((event.target as HTMLButtonElement).id.replace("showLootButton", "") as unknown) as number;
    const inputParams = { lastSelectedCreature: lastSelectedCreature, isLootVisible: isLootVisible };
    lootDisplayer.displayLoot(thisCreatureId, dataWithLoot, inputParams);
    lastSelectedCreature = inputParams.lastSelectedCreature;
    isLootVisible = inputParams.isLootVisible;
}

function showCreaturesLoot(thisCreatureId: number): void {
    const inputParams = { lastSelectedCreature: lastSelectedCreature, isLootVisible: isLootVisible };
    lootDisplayer.displayLoot(thisCreatureId, dataWithLoot, inputParams);
    lastSelectedCreature = inputParams.lastSelectedCreature;
    isLootVisible = inputParams.isLootVisible;
}

function goToLootGenerationInfoFuckMS() {
    location.href = '/LootGenerator/LootGenerationInfo';
}

function changeViewForLootGeneratorOnSmallerScreen(e: any): void{
    let creaturesDiv: HTMLElement = document.getElementById("creaturesDiv");
    let lootGeneratorContent: HTMLElement = document.getElementById("lootGeneratorContent");
    let lootDiv: HTMLElement = document.getElementById("lootDiv");
    let creaturesUl: HTMLElement = document.getElementById("creaturesUl");
    let activeLiElement: HTMLElement;
    if (creaturesUl.getElementsByClassName("active").length != 0) {
        activeLiElement = creaturesUl.getElementsByClassName("active")[0] as HTMLElement;
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

function getLootForEvent(event:Event): void{
    getLoot(event);
    event.target.removeEventListener("click", getLootForEvent);
}

const onMediaMinWidthLootGenerator = window.matchMedia('(min-width: 1000px)');

onMediaMinWidthLootGenerator.addEventListener("change", (event) => {
    changeViewForLootGeneratorOnSmallerScreen(event);
});

// Initial check
changeViewForLootGeneratorOnSmallerScreen(onMediaMinWidthLootGenerator);
