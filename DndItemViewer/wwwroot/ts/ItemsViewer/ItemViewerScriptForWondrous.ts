declare const data: any;
import { WondrousDisplayer } from "./WondrousDisplayer.js";
import { IItemDisplayer } from "./IItemDisplayer.js";
import { filterItems, onItemsInputChange } from "./ItemViewerScript.js";

let isLoaded = false;
let isLargeDevice = true;
let lastOrderedBy = "";
let activeItem: IItemDisplayer = new WondrousDisplayer(data);

let onMediaMinWidthForItemViewer = window.matchMedia('(min-width: 1000px)');
window.addEventListener("load", function () {
    document.getElementById("showButton").addEventListener("click", filterItems, false);
    document.getElementById("ItemsInput").addEventListener("change", function () { onItemsInputChange(this as HTMLSelectElement) }, false);
    selectWhatToDisplay();
}, false);


function selectWhatToDisplay(): void {
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
export function orderItemsBy(event: Event): void {
    let orderBy: string = (event.target as HTMLAnchorElement).id.replace("HeadTableAnchorFor", "");
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