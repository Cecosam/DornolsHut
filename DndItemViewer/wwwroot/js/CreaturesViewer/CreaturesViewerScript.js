window.addEventListener("load", function () {
    document.getElementById("creaturesFilter").addEventListener("input", function () { filterCreatures(); }, false);
    document.getElementById("creaturesFilter").addEventListener("mouseenter", showInfoText, false);
    document.getElementById("creaturesFilter").addEventListener("mouseleave", hideInfoText, false);
    initSourceSelect(getCookie(SOURCES_USED_COOKIE_NAME));
    if (getCookie(CREATURE_INPUT_COOKIE_NAME) != "")
        document.getElementById("creaturesFilter").value = getCookie(CREATURE_INPUT_COOKIE_NAME);
    filterCreatures(false);
}, false);
let filteredDataWithCreatures;
let filteredDataWithCreaturesBySource;
let areCreaturesLoaded = false;
let isThereNeedToFilterDataBySource = true;
let isLargeDeviceForCreatures = true;
let activeCreatureDisplayer = new CreatureDisplayer();
function setSourcesUsedCookie() {
    let selectElement = document.getElementById("sourcesSelect");
    let result = "";
    for (var i = 0; i < selectElement.length; i++) {
        if (selectElement[i].selected)
            result += `${i + 1}@`;
    }
    setCookie(SOURCES_USED_COOKIE_NAME, result.substring(0, result.length - 1), new Date(2147483647 * 1000).toUTCString());
}
function initSourceSelect(activeSources = "") {
    let optionsValues;
    if (activeSources != "") {
        optionsValues = activeSources.split("@");
    }
    let selectElement = document.getElementById("sourcesSelect");
    let showHideSourcesButton = document.getElementById("showHideSources");
    showHideSourcesButton.addEventListener("click", function (e) {
        let showHideSourcesButton = e.target;
        if (showHideSourcesButton.innerText == "Show Sources") {
            document.getElementById("sourcesSelect").hidden = false;
            showHideSourcesButton.innerText = "Filter Sources";
        }
        else {
            document.getElementById("sourcesSelect").hidden = true;
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
        selectElement[i].addEventListener("mousedown", function (e) {
            e.preventDefault();
            if (true == this.selected)
                this.selected = false;
            else
                this.selected = true;
        }, false);
        if (optionsValues) {
            if (optionsValues.includes(`${i + 1}`))
                selectElement[i].selected = true;
        }
        else
            selectElement[i].selected = true;
    }
}
function selectWhatCreaturesToDisplay(data) {
    activeCreatureDisplayer.displayCreatures(isLargeDeviceForCreatures, data);
    areCreaturesLoaded = true;
}
function orderCreaturesBy(event) {
    showLoadingScreen("ShowCreaturesMainDiv");
    let orderBy = event.target.id.replace("HeadTableAnchorFor", "");
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
function getDataByMultipleParams(inputData, words) {
    let inputWords = words.split("<>");
    if (isNumeric(inputWords[0]) && isNumeric(inputWords[1])) {
        let array = [];
        $.each(inputData, function (j, creature) {
            if (Number(creature.creatureRating) >= Number(inputWords[0]) && Number(creature.creatureRating) <= Number(inputWords[1])) {
                array.push(creature);
            }
        });
        return array;
    }
    let arrays = [];
    for (var i = 0; i < inputWords.length; i++) {
        if (inputWords[i] == "")
            continue;
        arrays[i] = [];
        let wordToLower = inputWords[i].toLowerCase();
        $.each(inputData, function (j, creature) {
            if (`${creature.name} ${creature.creatureRating} ${creature.type} ${getCreaturesSizeAsText(creature.size)}`.toLowerCase().includes(wordToLower)) {
                arrays[i].push(creature);
            }
        });
    }
    let result = [];
    for (var i = 0; i < arrays.length; i++) {
        for (var j = 0; j < arrays[i].length; j++) {
            result.push(arrays[i][j]);
        }
    }
    return result;
}
function filterCreaturesByWords(inputData, words, index) {
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
    let resultData = [];
    let wordToLower = words[index].toLowerCase();
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
function filterCreatures(isCalledFromFilterInput = true) {
    if (!isCalledFromFilterInput)
        showLoadingScreen("ShowCreaturesMainDiv");
    let text = document.getElementById("creaturesFilter").value;
    let inputText = text.split(" ");
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
function filterCreaturesBySource(data) {
    let selectElement = document.getElementById("sourcesSelect");
    let result = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < selectElement.length; j++) {
            if (selectElement[j].selected == true) {
                if (selectElement[j].innerText == data[i].source) {
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
function getCreaturesSizeAsText(size) {
    //CreatureSizeEnumeration
    if (getTheKeyFromEnum(CreatureSizeEnumeration, CreatureSizeEnumeration.Tiny) == size) {
        return CreatureSizeEnumeration.Tiny;
    }
    else if (getTheKeyFromEnum(CreatureSizeEnumeration, CreatureSizeEnumeration.Small) == size) {
        return CreatureSizeEnumeration.Small;
    }
    else if (getTheKeyFromEnum(CreatureSizeEnumeration, CreatureSizeEnumeration.Medium) == size) {
        return CreatureSizeEnumeration.Medium;
    }
    else if (getTheKeyFromEnum(CreatureSizeEnumeration, CreatureSizeEnumeration.Large) == size) {
        return CreatureSizeEnumeration.Large;
    }
    else if (getTheKeyFromEnum(CreatureSizeEnumeration, CreatureSizeEnumeration.Huge) == size) {
        return CreatureSizeEnumeration.Huge;
    }
    else if (getTheKeyFromEnum(CreatureSizeEnumeration, CreatureSizeEnumeration.Gargantuan) == size) {
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
//# sourceMappingURL=CreaturesViewerScript.js.map