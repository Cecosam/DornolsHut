import { IItemDisplayer } from "./IItemDisplayer.js";
import { orderItemsBy } from "./ItemViewerScriptForWondrous.js";
export class WondrousDisplayer extends IItemDisplayer {
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
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "description"], ["name"]);
        if (isLargeDevice)
            this.showTheWondrousItems(this.orderDataBy(this.data, orderBy, isAscending));
        else
            this.showTheWondrousItemsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
        return orderBy;
    }
    showDataForLargeDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ItemsHeadOfTable"), ["Name", "Description"], ["name", "description"], "orderWondrousItemsBy", "Wonder");
        this.showTheWondrousItems(this.orderDataBy(this.data, orderBy, isAscending));
    }
    showDataForSmallerDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ItemsHeadOfTable"), ["Name"], ["name"], "orderWondrousItemsBy", "");
        this.showTheWondrousItemsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
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
    showTheWondrousItemsForSmallDevice(data) {
        let tbody = this.getTableBodyById("ItemsTable");
        for (let i = 0; i < data.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(this.prepareForSmallDisplay(tr, data[i], i));
        }
    }
    showTheWondrousItems(data) {
        let tbody = this.getTableBodyById("ItemsTable");
        for (let i = 0; i < data.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.appendAnchorWithRefInIt(data[i].name, data[i].id, data[i].category));
            let td = $('<td>').append(data[i].description)[0];
            tr.appendChild(td);
        }
    }
    checkIfAscendingOrder(cookie) {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }
    getLastOrderBy(isLargeDevice, cookie) {
        let orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "description"], ["name"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
        return orderBy;
    }
}
//# sourceMappingURL=WondrousDisplayer.js.map