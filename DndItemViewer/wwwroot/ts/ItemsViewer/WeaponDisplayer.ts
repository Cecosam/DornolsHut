import { IItemDisplayer } from "./IItemDisplayer.js";
import { orderItemsBy } from "./ItemViewerScriptForWeapons.js";
export class WeaponDisplayer extends IItemDisplayer {
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
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "description", "damage", "additionalInfo", "weight", "rarity"],
            ["name"]);

        if (isLargeDevice)
            this.showTheWeapons(this.orderDataBy(this.data, orderBy, isAscending));
        else
            this.showTheWeaponsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));

        return orderBy;
    }

    private showDataForLargeDevice(orderBy: string, isAscending: boolean): void {
        this.addElementsToHeadOfTable(this.addHeadOfTable("WeaponsHeadOfTable"),
            ["Name", "Description", "Damage", "Additional Info", "Weight", "Rarity"],
            ["name", "description", "damage", "additionalInfo", "weight", "rarity"], "orderWeaponsBy", "Weapon");
        this.showTheWeapons(this.orderDataBy(this.data, orderBy, isAscending));
    }

    private showDataForSmallerDevice(orderBy: string, isAscending: boolean): void {
        this.addElementsToHeadOfTable(this.addHeadOfTable("WeaponsHeadOfTable"),
            ["Name"],
            ["name"], "orderWeaponsBy", "Weapon");
        this.showTheWeaponsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
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

    private showTheWeaponsForSmallDevice(data: any): void {
        let tbody: HTMLElement = this.getTableBodyById("WeaponsTable");
        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));

            let div: HTMLElement = this.prepareForSmallDisplay(tr, data[i], i);
            addInfoToTheToolTip(div, "Weight: ", `${data[i].weight} lb.`);
            addInfoToTheToolTip(div, "Rarity: ", getRarity(data[i].rarity));
            addInfoToTheToolTip(div, "Damage: ", `${data[i].damage} ${data[i].damageType}`);
            addInfoToTheToolTip(div, "Additional Info: ", data[i].additionalInfo);
            div.appendChild(document.createElement("br"));
            addInfoToTheToolTip(div, "Source: ", data[i].source);

            tr.appendChild(div);
        }
    }

    private showTheWeapons(data: any): void {
        let tbody: HTMLElement = this.getTableBodyById("WeaponsTable");
        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.appendAnchorWithRefInIt(data[i].name, data[i].id, data[i].category));
            tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(data[i].description));
            let damage: string = `${data[i].damage} ${data[i].damageType}`;
            tr.appendChild(addTdElementWithClass("text-center", damage));
            this.createAdditionalInfoForWeapons(tr, data[i]);
            let weight: string = `${data[i].weight} lb.`;
            tr.appendChild(addTdElementWithClass("text-center", weight));
            tr.appendChild(addTdElementWithClass("text-center", getRarity(data[i].rarity)));
        }
    }

    private createAdditionalInfoForWeapons(tr: HTMLElement, obj: any): void {
        let td: HTMLTableCellElement = document.createElement("td");
        td.className = "text-center";
        if (obj.isLight == true) {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Light", LIGHT_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isHeavy == true) {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Heavy", HEAVY_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isReach == true) {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Reach", REACH_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isFinesse == true) {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Finesse", FINESSE_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isLoading == true) {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Loading", LOADING_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isRanged == true) {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Range(" + obj.range + ")", RANGE_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isVersatile == true) {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Versatile(" + obj.versatileDamage + ")", VERSATILE_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.slot == "twohand") {
            let div: HTMLDivElement = this.createTooltipForWeaponProperties("Two-handed", TWO_HANDED_WEAPON_MSG);
            td.appendChild(div);
        }

        tr.appendChild(td);
    }

    private createTooltipForWeaponProperties(innerText: string, tooltipText: string): HTMLDivElement {
        let div: HTMLDivElement = document.createElement("div");
        div.addEventListener("mouseover", changeClassOfTooltipInnerDivLeftUpLeftDown, false);
        div.appendChild(document.createTextNode(innerText));
        div.className = "nav-link tooltipCust";
        let innerDiv: HTMLDivElement = document.createElement("div");
        div.appendChild(innerDiv);
        innerDiv.className = "infoTooltip leftCustUp";
        let p: HTMLParagraphElement = document.createElement("p");
        innerDiv.appendChild(p);
        p.appendChild(document.createTextNode(tooltipText));
        p.className = "bg-dark mt-5 p-2 border border-secondary";
        innerDiv.appendChild(document.createElement("i"));

        return div;
    }


    private checkIfAscendingOrder(cookie: string): boolean {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }

    private getLastOrderBy(isLargeDevice: boolean, cookie: string): string {
        let orderBy: string = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "description", "damage", "additionalInfo", "weight", "rarity"],
            ["name"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);

        return orderBy;
    }
}
