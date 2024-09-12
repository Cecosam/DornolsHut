declare const dataCreatures: any;
window.addEventListener("load", function () {

    document.getElementById("creaturesFilter").addEventListener("input", function () { filterCreatures(); }, false);
    document.getElementById("creaturesFilter").addEventListener("mouseenter", showInfoText, false);
    document.getElementById("creaturesFilter").addEventListener("mouseleave", hideInfoText, false);
    initSourceSelect(getCookie(SOURCES_USED_COOKIE_NAME));

    if (getCookie(CREATURE_INPUT_COOKIE_NAME) != "")
        (document.getElementById("creaturesFilter") as HTMLInputElement).value = getCookie(CREATURE_INPUT_COOKIE_NAME);
    filterCreatures(false);
}, false);

let filteredDataWithCreatures: any;
let filteredDataWithCreaturesBySource: any;
let areCreaturesLoaded = false;
let isThereNeedToFilterDataBySource: boolean = true;
let isLargeDeviceForCreatures = true;
let activeCreatureDisplayer = new CreatureDisplayer();

function setSourcesUsedCookie() {
    let selectElement: HTMLSelectElement = document.getElementById("sourcesSelect") as HTMLSelectElement;
    let result: string = "";
    for (var i = 0; i < selectElement.length; i++) {
        if ((selectElement[i] as HTMLOptionElement).selected)
            result += `${i + 1}@`;
    }
    setCookie(SOURCES_USED_COOKIE_NAME, result.substring(0, result.length - 1), new Date(2147483647 * 1000).toUTCString());
}
function initSourceSelect(activeSources: string = "") {
    let optionsValues: string[];
    if (activeSources != "") {
        optionsValues = activeSources.split("@");
    }
    let selectElement: HTMLSelectElement = document.getElementById("sourcesSelect") as HTMLSelectElement;
    let showHideSourcesButton: HTMLButtonElement = document.getElementById("showHideSources") as HTMLButtonElement;
    showHideSourcesButton.addEventListener("click", function (e) {
        let showHideSourcesButton: HTMLButtonElement = e.target as HTMLButtonElement;
        if (showHideSourcesButton.innerText == "Show Sources") {
            (document.getElementById("sourcesSelect") as HTMLSelectElement).hidden = false;
            showHideSourcesButton.innerText = "Filter Sources";
        }
        else {
            (document.getElementById("sourcesSelect") as HTMLSelectElement).hidden = true;
            showHideSourcesButton.innerText = "Show Sources";
            isThereNeedToFilterDataBySource = true;

            setSourcesUsedCookie();
            filterCreatures(false);
        }
    }, false);
    selectElement.addEventListener("mousedown", function (e) {
        const scrollTop = this.scrollTop;
        setTimeout(() => {
            this.scrollTop = scrollTop;
        }, 0);
    }, false);
    selectElement.style.overflow = "auto";

    for (var i = 0; i < selectElement.length; i++) {
        (selectElement[i] as HTMLOptionElement).addEventListener("mousedown", function (e) {
            e.preventDefault();
            if (true == this.selected)
                this.selected = false;
            else
                this.selected = true;
        }, false);

        if (optionsValues) {
            if (optionsValues.includes(`${i + 1}`))
                (selectElement[i] as HTMLOptionElement).selected = true;
        }
        else
            (selectElement[i] as HTMLOptionElement).selected = true;
    }
}
function selectWhatCreaturesToDisplay(data: any): void {
    activeCreatureDisplayer.displayCreatures(isLargeDeviceForCreatures, data);
    areCreaturesLoaded = true;
}

function orderCreaturesBy(event: Event): void {
    showLoadingScreen("ShowCreaturesMainDiv");
    let orderBy: string = (event.target as HTMLAnchorElement).id.replace("HeadTableAnchorFor", "");
    if (orderBy == getCookie(LAST_ORDERED_BY_COOKIE_NAME)) {
        activeCreatureDisplayer.orderData(isLargeDeviceForCreatures, orderBy, false, filteredDataWithCreatures);
        setCookie(LAST_ORDERED_BY_COOKIE_NAME, getCookie(LAST_ORDERED_BY_COOKIE_NAME) + DESCENDING_AS_TEXT);
    }
    else {
        orderBy = activeCreatureDisplayer.orderData(isLargeDeviceForCreatures, orderBy, true, filteredDataWithCreatures);
        setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
    }
    hideLoadingScreen("ShowCreaturesMainDiv");
}

function getDataByMultipleParams(inputData: any, words: string): any {
    let inputWords: string[] = words.split("<>");
    if (isNumeric(inputWords[0]) && isNumeric(inputWords[1])) {
        let array: string[] = [];
        $.each(inputData, function (j, creature) {
            if (Number(creature.creatureRating) >= Number(inputWords[0]) && Number(creature.creatureRating) <= Number(inputWords[1])) {
                array.push(creature);
            }
        });
        return array;
    }

    let arrays: any[][] = [];
    for (var i = 0; i < inputWords.length; i++) {
        if (inputWords[i] == "")
            continue;
        arrays[i] = [];
        let wordToLower: string = inputWords[i].toLowerCase();
        $.each(inputData, function (j, creature) {
            if (`${creature.name} ${creature.creatureRating} ${creature.type} ${getCreaturesSizeAsText(creature.size)}`.toLowerCase().includes(wordToLower)) {
                arrays[i].push(creature);
            }
        });
    }

    let result: any[] = [];
    for (var i = 0; i < arrays.length; i++) {
        for (var j = 0; j < arrays[i].length; j++) {
            result.push(arrays[i][j]);
        }
    }

    return result;
}
function filterCreaturesByWords(inputData: any, words: string[], index: number): any {
    if (index >= words.length) {
        return inputData;
    }
    if (words[index] == "") {
        index++;
        return filterCreaturesByWords(inputData, words, index);
    }
    if (words[index].split("<>").length > 1) {
        index++;
        return filterCreaturesByWords(getDataByMultipleParams(inputData, words[index - 1]), words, index);
    }

    let resultData: any = [];
    let wordToLower: string = words[index].toLowerCase();
    if (isNumeric(wordToLower)) {
        $.each(inputData, function (i, creature) {
            if (creature.creatureRating == wordToLower) {
                resultData.push(creature);
            }
        });
    }
    else {
        $.each(inputData, function (i, creature) {
            if (`${creature.name} ${creature.creatureRating} ${creature.type} ${getCreaturesSizeAsText(creature.size)}`.toLowerCase().includes(wordToLower)) {
                resultData.push(creature);
            }
        });
    }

    index++;
    return filterCreaturesByWords(resultData, words, index);
}


function filterCreatures(isCalledFromFilterInput: boolean = true): void {
    if (!isCalledFromFilterInput)
        showLoadingScreen("ShowCreaturesMainDiv");

    let text: string = (document.getElementById("creaturesFilter") as HTMLInputElement).value;
    let inputText: string[] = text.split(" ");
    setCookie(CREATURE_INPUT_COOKIE_NAME, text);
    if (true == isThereNeedToFilterDataBySource) {
        filteredDataWithCreaturesBySource = filterCreaturesBySource(dataCreatures);
        isThereNeedToFilterDataBySource = false;
    }
    if (inputText[0] != "" || inputText.length > 1) {
        filteredDataWithCreatures = filterCreaturesByWords(filteredDataWithCreaturesBySource, inputText, 0);
        selectWhatCreaturesToDisplay(filteredDataWithCreatures);
    }
    else {
        filteredDataWithCreatures = filteredDataWithCreaturesBySource;
        selectWhatCreaturesToDisplay(filteredDataWithCreatures);
    }

    if (!isCalledFromFilterInput)
        hideLoadingScreen("ShowCreaturesMainDiv");
}

function filterCreaturesBySource(data: any[]): any[] {
    let selectElement: HTMLSelectElement = document.getElementById("sourcesSelect") as HTMLSelectElement;
    let result: any[] = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < selectElement.length; j++) {
            if ((selectElement[j] as HTMLOptionElement).selected == true) {
                if ((selectElement[j] as HTMLOptionElement).innerText == (data[i].source as string)) {
                    result.push(data[i]);
                    break;
                }
            }
        }
    }
    return result;
}
function changeViewForCreatureViewerOnSmallerScreen(e) {
    if (e.matches) {

        isLargeDeviceForCreatures = true;
        if (areCreaturesLoaded) {
            selectWhatCreaturesToDisplay(filteredDataWithCreatures);
        }
    }
    else {
        isLargeDeviceForCreatures = false;
        if (areCreaturesLoaded) {
            selectWhatCreaturesToDisplay(filteredDataWithCreatures);
        }
    }
}


function getCreaturesSizeAsText(size: number) {
    //CreatureSizeEnumeration
    if (getTheKeyFromEnum<CreatureSizeEnumeration>(CreatureSizeEnumeration, CreatureSizeEnumeration.Tiny) == size) {
        return CreatureSizeEnumeration.Tiny;
    }
    else if (getTheKeyFromEnum<CreatureSizeEnumeration>(CreatureSizeEnumeration, CreatureSizeEnumeration.Small) == size) {
        return CreatureSizeEnumeration.Small;
    }
    else if (getTheKeyFromEnum<CreatureSizeEnumeration>(CreatureSizeEnumeration, CreatureSizeEnumeration.Medium) == size) {
        return CreatureSizeEnumeration.Medium;
    }
    else if (getTheKeyFromEnum<CreatureSizeEnumeration>(CreatureSizeEnumeration, CreatureSizeEnumeration.Large) == size) {
        return CreatureSizeEnumeration.Large;
    }
    else if (getTheKeyFromEnum<CreatureSizeEnumeration>(CreatureSizeEnumeration, CreatureSizeEnumeration.Huge) == size) {
        return CreatureSizeEnumeration.Huge;
    }
    else if (getTheKeyFromEnum<CreatureSizeEnumeration>(CreatureSizeEnumeration, CreatureSizeEnumeration.Gargantuan) == size) {
        return CreatureSizeEnumeration.Gargantuan;
    }
}

function showInfoText() {
    document.getElementById("searchBoxInfo").hidden = false;
}

function hideInfoText() {
    document.getElementById("searchBoxInfo").hidden = true;
}

const onMediaMinWidthForCreatureViewer = window.matchMedia('(min-width: 1000px)');

onMediaMinWidthForCreatureViewer.addEventListener("change", (event) => {
    changeViewForCreatureViewerOnSmallerScreen(event);
});

// Initial check
changeViewForCreatureViewerOnSmallerScreen(onMediaMinWidthForCreatureViewer);