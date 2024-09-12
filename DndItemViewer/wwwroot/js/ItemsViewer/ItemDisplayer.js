import { IItemDisplayer } from "./IItemDisplayer.js";
import { orderItemsBy } from "./ItemViewerScriptForItems.js";
export class ItemDisplayer extends IItemDisplayer {
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
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "description", "deight", "rarity", "cost"], ["name"]);
        if (isLargeDevice)
            this.showTheItemsForLargeDevice(this.orderDataBy(this.data, orderBy, isAscending));
        else
            this.showTheItemsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
        return orderBy;
    }
    showDataForLargeDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ItemsHeadOfTable"), ["Name", "Description", "Weight", "Rarity", "Cost"], ["name", "description", "weight", "rarity", "cost"], "orderItemsBy", "");
        this.showTheItemsForLargeDevice(this.orderDataBy(this.data, orderBy, isAscending));
    }
    showDataForSmallerDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ItemsHeadOfTable"), ["Name"], ["name"], "orderItemsBy", "");
        this.showTheItemsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
    }
    addElementsToHeadOfTable(tableRowElement, arrayForNames, arrayWithTheKeysFromJson, orderByFuncName, tableFor) {
        let length = arrayForNames.length;
        if (document.getElementById("ItemsInput").value != getTheKeyFromEnum(CategoryEnum, CategoryEnum.Treasures)) {
            if (length != 1)
                length -= 1;
        }
        for (var i = 0; i < length; i++) {
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
    showTheItemsForSmallDevice(data) {
        var tbody = this.getTableBodyById("ItemsTable");
        for (var i = 0; i < data.length; i++) {
            var tr = tbody.appendChild(document.createElement("tr"));
            var div = this.prepareForSmallDisplay(tr, data[i], i);
            addInfoToTheToolTip(div, "Weight: ", data[i].weight + " lb.");
            addInfoToTheToolTip(div, "Rarity: ", getRarity(data[i].rarity));
            if (data[i].category == 1) {
                addInfoToTheToolTip(div, "Cost: ", `${data[i].cost} gp.`);
            }
            div.appendChild(document.createElement("br"));
            addInfoToTheToolTip(div, "Source: ", data[i].source);
            tr.appendChild(div);
        }
    }
    showTheItemsForLargeDevice(data) {
        var tbody = this.getTableBodyById("ItemsTable");
        for (var i = 0; i < data.length; i++) {
            var tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.appendAnchorWithRefInIt(data[i].name, data[i].id, data[i].category));
            let td = $('<td>').append(data[i].description)[0];
            tr.appendChild(td);
            //tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(data[i].description));
            tr.appendChild(addTdElementWithClass("text-center", data[i].weight + " lb."));
            tr.appendChild(addTdElementWithClass("text-center", getRarity(data[i].rarity)));
            if (document.getElementById("ItemsInput").value == "1") {
                tr.appendChild(addTdElementWithClass("text-center", data[i].cost));
            }
        }
    }
    checkIfAscendingOrder(cookie) {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }
    getLastOrderBy(isLargeDevice, cookie) {
        let orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "description", "weight", "rarity", "cost"], ["name"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
        return orderBy;
    }
}
//# sourceMappingURL=ItemDisplayer.js.map