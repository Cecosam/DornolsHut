import { IItemDisplayer } from "./IItemDisplayer.js";
import { orderItemsBy } from "./ItemViewerScriptForArmors.js";
export class ArmorDisplayer extends IItemDisplayer {
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
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "description", "armorType", "armorClass", "additionalInfo", "weight", "rarity"],
            ["name"]);
        if (isLargeDevice)
            this.showTheArmors(this.orderDataBy(this.data, orderBy, isAscending));
        else
            this.showTheArmorsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));

        return orderBy;
    }

    private showDataForLargeDevice(orderBy: string, isAscending: boolean): void {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ArmorsHeadOfTable"),
            ["Name", "Description", "Armor Type", "AC", "Additional Info", "Weight", "Rarity"],
            ["name", "description", "armorType", "armorClass", "additionalInfo", "weight", "rarity"], "orderArmorBy", "Armor");
        this.showTheArmors(this.orderDataBy(this.data, orderBy, isAscending));
    }

    private showDataForSmallerDevice(orderBy: string, isAscending: boolean): void {
        this.addElementsToHeadOfTable(this.addHeadOfTable("ArmorsHeadOfTable"),
            ["Name"],
            ["name"], "orderArmorBy", "Armor");
        this.showTheArmorsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
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

    private showTheArmorsForSmallDevice(data: any): void {
        let tbody: HTMLElement = this.getTableBodyById("ArmorsTable");
        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));

            let div: HTMLElement = this.prepareForSmallDisplay(tr, data[i], i);
            addInfoToTheToolTip(div, "Weight: ", data[i].weight + " lb.");
            addInfoToTheToolTip(div, "Rarity: ", getRarity(data[i].rarity));
            addInfoToTheToolTip(div, "Armor Type: ", getArmorType(data[i].armorType));
            addInfoToTheToolTip(div, "AC: ", data[i].armorClass);
            addInfoToTheToolTip(div, "Additional Info: ", data[i].additionalInfo ? data[i].additionalInfo : "-");
            div.appendChild(document.createElement("br"));
            addInfoToTheToolTip(div, "Source: ", data[i].source);

            tr.appendChild(div);
        }
    }
    private showTheArmors(data: any): void {
        let tbody: HTMLElement = this.getTableBodyById("ArmorsTable");
        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));

            tr.appendChild(document.createElement("td")).appendChild(this.appendAnchorWithRefInIt(data[i].name, data[i].id, data[i].category));
            let td: HTMLElement = $('<td>').append(data[i].description)[0];
            tr.appendChild(td);
            tr.appendChild(addTdElementWithClass("text-center", getArmorType(data[i].armorType)));
            tr.appendChild(addTdElementWithClass("text-center", data[i].armorClass));
            tr.appendChild(addTdElementWithClass("text-center", data[i].additionalInfo));
            let weight = data[i].weight + " lb.";
            tr.appendChild(addTdElementWithClass("text-center", weight));
            tr.appendChild(addTdElementWithClass("text-center", getRarity(data[i].rarity)));
        }
    }

    private checkIfAscendingOrder(cookie: string): boolean {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }

    private getLastOrderBy(isLargeDevice: boolean, cookie: string): string {
        let orderBy: string = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "description", "armorType", "armorClass", "additionalInfo", "weight", "rarity"],
            ["name"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);

        return orderBy;
    }
}
