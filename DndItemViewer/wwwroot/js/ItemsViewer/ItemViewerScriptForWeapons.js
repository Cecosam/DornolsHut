import { WeaponDisplayer } from "./WeaponDisplayer.js";
import { filterItems, onItemsInputChange } from "./ItemViewerScript.js";
let isLoaded = false;
let isLargeDevice = true;
let lastOrderedBy = "";
let activeItem = new WeaponDisplayer(data);
let onMediaMinWidthForItemViewer = window.matchMedia('(min-width: 1000px)');
window.addEventListener("load", function () {
    document.getElementById("showButton").addEventListener("click", filterItems, false);
    document.getElementById("ItemsInput").addEventListener("change", function () { onItemsInputChange(this); }, false);
    selectWhatToDisplay();
}, false);
function selectWhatToDisplay() {
    activeItem.showData(isLargeDevice);
    isLoaded = true;
    removeLoadingScreen();
    document.getElementById("ShowItemsMainDiv").hidden = false;
}
function changeViewForItemViewerOnSmallerScreen(e) {
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
export function orderItemsBy(event) {
    let orderBy = event.target.id.replace("HeadTableAnchorFor", "");
    if (orderBy == getCookie(LAST_ORDERED_BY_COOKIE_NAME)) {
        activeItem.orderData(isLargeDevice, orderBy, false);
        setCookie(LAST_ORDERED_BY_COOKIE_NAME, getCookie(LAST_ORDERED_BY_COOKIE_NAME) + DESCENDING_AS_TEXT);
    }
    else {
        orderBy = activeItem.orderData(isLargeDevice, orderBy, true);
        setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
    }
}
onMediaMinWidthForItemViewer.addEventListener("change", (event) => {
    changeViewForItemViewerOnSmallerScreen(event);
});
// Initial check
changeViewForItemViewerOnSmallerScreen(onMediaMinWidthForItemViewer);
//# sourceMappingURL=ItemViewerScriptForWeapons.js.map