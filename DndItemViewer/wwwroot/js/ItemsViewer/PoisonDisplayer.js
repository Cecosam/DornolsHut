import { IItemDisplayer } from "./IItemDisplayer.js";
import { orderItemsBy } from "./ItemViewerScriptForPoisons.js";
export class PoisonDisplayer extends IItemDisplayer {
    constructor(data) {
        super(data);
    }
    showData(isLargeDevice) {
        let isAscending = this.checkIfAscendingOrder(getCookie(LAST_ORDERED_BY_COOKIE_NAME));
        let orderBy = this.getLastOrderBy(isLargeDevice, getCookie(LAST_ORDERED_BY_COOKIE_NAME));
        if (isLargeDevice)
            this.showDataForLargeDevice(orderBy, isAscending);
        else
            this.showDataForSmallerDevice(orderBy, isAscending);
    }
    orderData(isLargeDevice, orderBy, isAscending) {
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "description", "weight", "poisonTypes", "cost"], ["name"]);
        if (isLargeDevice)
            this.showThePoisons(this.orderDataBy(this.data, orderBy, isAscending));
        else
            this.showThePoisonsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
        return orderBy;
    }
    showDataForLargeDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("PoisonsHeadOfTable"), ["Name", "Description", "Weight", "Poison Type", "Cost"], ["name", "description", "weight", "poisonTypes", "cost"], "orderPoisonsBy", "Poison");
        this.showThePoisons(this.orderDataBy(this.data, orderBy, isAscending));
    }
    showDataForSmallerDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("PoisonsHeadOfTable"), ["Name"], ["name"], "orderPoisonsBy", "Poison");
        this.showThePoisonsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
    }
    addElementsToHeadOfTable(tableRowElement, arrayForNames, arrayWithTheKeysFromJson, orderByFuncName, tableFor) {
        for (var i = 0; i < arrayForNames.length; i++) {
            var th = tableRowElement.appendChild(document.createElement("th"));
            th.className = arrayForNames[i].replace(/ /g, '') + tableFor;
            var div = th.appendChild(document.createElement("div"));
            if (arrayForNames[i] != "Name" && arrayForNames[i] != "Description")
                div.className = "d-flex justify-content-center";
            var a = div.appendChild(document.createElement("a"));
            a.setAttribute("id", "HeadTableAnchorFor" + arrayWithTheKeysFromJson[i]);
            a.className = "nav-link downArrow";
            a.addEventListener("click", function (e) { orderItemsBy(e); }, false);
            a.appendChild(document.createTextNode(arrayForNames[i]));
        }
    }
    addHeadOfTable(elementId) {
        var thead = document.getElementById(elementId);
        while (thead.firstChild)
            thead.firstChild.remove();
        return thead.appendChild(document.createElement("tr"));
    }
    showThePoisonsForSmallDevice(data) {
        let tbody = this.getTableBodyById("PoisonsTable");
        for (let i = 0; i < data.length; i++) {
            var tr = tbody.appendChild(document.createElement("tr"));
            var div = this.prepareForSmallDisplay(tr, data[i], i);
            addInfoToTheToolTip(div, "Weight: ", `${data[i].weight} lb.`);
            addInfoToTheToolTip(div, "Rarity: ", getRarity(data[i].rarity));
            addInfoToTheToolTip(div, "Poison Type: ", `(${data[i].name.split("(")[1]}. ${data[i].poisonTypes}`);
            div.appendChild(document.createElement("br"));
            addInfoToTheToolTip(div, "Source: ", data[i].source);
            tr.appendChild(div);
        }
    }
    showThePoisons(data) {
        let tbody = this.getTableBodyById("PoisonsTable");
        for (let i = 0; i < data.length; i++) {
            var tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.appendAnchorWithRefInIt(data[i].name, data[i].id, data[i].category));
            tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(data[i].description));
            tr.appendChild(addTdElementWithClass("text-center", `${data[i].weight} lb.`));
            tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(data[i].poisonTypes));
            tr.appendChild(addTdElementWithClass("text-center", data[i].cost));
        }
    }
    checkIfAscendingOrder(cookie) {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }
    getLastOrderBy(isLargeDevice, cookie) {
        let orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "description", "weight", "poisonTypes", "cost"], ["name"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
        return orderBy;
    }
}
//# sourceMappingURL=PoisonDisplayer.js.map