import { IItemDisplayer } from "./IItemDisplayer.js";
import { orderItemsBy } from "./ItemViewerScriptForWondrous.js";
export class WondrousDisplayer extends IItemDisplayer {
    public constructor(data: any) {
        super(data);
    }

    public showData(isLargeDevice: boolean): void {
        let isAscending: boolean = this.checkIfAscendingOrder(getCookie(LAST_ORDERED_BY_COOKIE_NAME));
        let orderBy: string = this.getLastOrderBy(isLargeDevice, getCookie(LAST_ORDERED_BY_COOKIE_NAME));

        if (isLargeDevice)
            this.showDataForLargeDevice(orderBy, isAscending);
        else
            this.showDataForSmallerDevice(orderBy, isAscending);
    }

    public orderData(isLargeDevice: boolean, orderBy: string, isAscending: boolean): string {
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "description"],["name"]);
        if (isLargeDevice)
            this.showTheWondrousItems(this.orderDataBy(this.data, orderBy, isAscending));
        else
            this.showTheWondrousItemsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));

        return orderBy;
    }

    private showDataForLargeDevice(orderBy: string, isAscending: boolean): void {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ItemsHeadOfTable"), ["Name", "Description"], ["name", "description"], "orderWondrousItemsBy", "Wonder");
        this.showTheWondrousItems(this.orderDataBy(this.data, orderBy, isAscending));
    }

    private showDataForSmallerDevice(orderBy: string, isAscending: boolean): void {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ItemsHeadOfTable"), ["Name"], ["name"], "orderWondrousItemsBy", "");
        this.showTheWondrousItemsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
    }

    private addElementsToHeadOfTable(tableRowElement: HTMLElement, arrayForNames: string[], arrayWithTheKeysFromJson: string[], orderByFuncName: string, tableFor: string): void {
        for (var i: number = 0; i < arrayForNames.length; i++) {
            var th: HTMLElement = tableRowElement.appendChild(document.createElement("th"));
            th.className = arrayForNames[i].replace(/ /g, '') + tableFor;
            var div: HTMLElement = th.appendChild(document.createElement("div"));
            if (arrayForNames[i] != "Name" && arrayForNames[i] != "Description")
                div.className = "d-flex justify-content-center";
            var a: HTMLAnchorElement = div.appendChild(document.createElement("a"));
            a.setAttribute("id", "HeadTableAnchorFor" + arrayWithTheKeysFromJson[i]);
            a.className = "nav-link downArrow";
            a.addEventListener("click", function (e: Event) { orderItemsBy(e); }, false);
            a.appendChild(document.createTextNode(arrayForNames[i]));
        }
    }

    private addHeadOfTable(elementId: string): HTMLElement {
        var thead = document.getElementById(elementId);

        while (thead.firstChild)
            thead.firstChild.remove();

        return thead.appendChild(document.createElement("tr"));
    }

    private showTheWondrousItemsForSmallDevice(data: any): void {
        let tbody: HTMLElement = this.getTableBodyById("ItemsTable");
        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(this.prepareForSmallDisplay(tr, data[i], i));
        }
    }
    private showTheWondrousItems(data: any): void {
        let tbody: HTMLElement = this.getTableBodyById("ItemsTable");
        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.appendAnchorWithRefInIt(data[i].name, data[i].id, data[i].category));
            let td: HTMLElement = $('<td>').append(data[i].description)[0];
            tr.appendChild(td);
        }
    }


    private checkIfAscendingOrder(cookie: string): boolean {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }

    private getLastOrderBy(isLargeDevice: boolean, cookie: string): string {
        let orderBy: string = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "description"], ["name"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);

        return orderBy;
    }
}
