
window.addEventListener("load", function () {
    document.getElementById("filterSpellsButton").addEventListener("click", filter, false);
    selectWhatToDisplay();
}, false);

let isLoaded = false;
let isLargeDevice = true;
let activeSpellDisplayer: SpellDisplayer = new SpellDisplayer(data);

function selectWhatToDisplay() {
    activeSpellDisplayer.displaySpells(isLargeDevice);

    isLoaded = true;
    removeLoadingScreen();
    document.getElementById("ShowSpellsMainDiv").hidden = false;
}

function orderSpellsBy(event: Event): void {
    let orderBy: string = (event.target as HTMLAnchorElement).id.replace("HeadTableAnchorFor", "");
    if (orderBy == getCookie(LAST_ORDERED_BY_COOKIE_NAME)) {
        activeSpellDisplayer.orderData(isLargeDevice, orderBy, false);
        setCookie(LAST_ORDERED_BY_COOKIE_NAME, getCookie(LAST_ORDERED_BY_COOKIE_NAME) + DESCENDING_AS_TEXT);
        //lastOrderedBy += "Next";
    }
    else {
        orderBy = activeSpellDisplayer.orderData(isLargeDevice, orderBy, true);
        setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
        //lastOrderedBy = orderBy;
    }
}

function filter() {
    var filterLevel = (document.getElementById("spellLevelsInput") as HTMLSelectElement).value;
    var filterSchool = (document.getElementById("spellSchoolsInput") as HTMLSelectElement).value;
    var filterClass = (document.getElementById("spellClassesInput") as HTMLSelectElement).value;

    location.href = `/SpellViewer/ShowSpells?spellsLevel=${filterLevel}&spellsSchool=${filterSchool}&spellsFor=${filterClass}`;
}
function changeViewForSpellViewerOnSmallerScreen(e) {
    if (e.matches) {

        isLargeDevice = true;
        if (isLoaded) {
            selectWhatToDisplay();
        }
    }
    else {
        isLargeDevice = false;
        if (isLoaded) {
            selectWhatToDisplay();
        }
    }
}
const onMediaMinWidthForSpellViewer = window.matchMedia('(min-width: 1000px)');

onMediaMinWidthForSpellViewer.addEventListener("change", (event) => {
    changeViewForSpellViewerOnSmallerScreen(event);
});

// Initial check
changeViewForSpellViewerOnSmallerScreen(onMediaMinWidthForSpellViewer);