import { IItemDisplayer } from "./IItemDisplayer.js";
import { orderItemsBy } from "./ItemViewerScriptForWeapons.js";
export class WeaponDisplayer extends IItemDisplayer {
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
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "description", "damage", "additionalInfo", "weight", "rarity"], ["name"]);
        if (isLargeDevice)
            this.showTheWeapons(this.orderDataBy(this.data, orderBy, isAscending));
        else
            this.showTheWeaponsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
        return orderBy;
    }
    showDataForLargeDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("WeaponsHeadOfTable"), ["Name", "Description", "Damage", "Additional Info", "Weight", "Rarity"], ["name", "description", "damage", "additionalInfo", "weight", "rarity"], "orderWeaponsBy", "Weapon");
        this.showTheWeapons(this.orderDataBy(this.data, orderBy, isAscending));
    }
    showDataForSmallerDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTable(this.addHeadOfTable("WeaponsHeadOfTable"), ["Name"], ["name"], "orderWeaponsBy", "Weapon");
        this.showTheWeaponsForSmallDevice(this.orderDataBy(this.data, orderBy, isAscending));
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
    showTheWeaponsForSmallDevice(data) {
        let tbody = this.getTableBodyById("WeaponsTable");
        for (let i = 0; i < data.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            let div = this.prepareForSmallDisplay(tr, data[i], i);
            addInfoToTheToolTip(div, "Weight: ", `${data[i].weight} lb.`);
            addInfoToTheToolTip(div, "Rarity: ", getRarity(data[i].rarity));
            addInfoToTheToolTip(div, "Damage: ", `${data[i].damage} ${data[i].damageType}`);
            addInfoToTheToolTip(div, "Additional Info: ", data[i].additionalInfo);
            div.appendChild(document.createElement("br"));
            addInfoToTheToolTip(div, "Source: ", data[i].source);
            tr.appendChild(div);
        }
    }
    showTheWeapons(data) {
        let tbody = this.getTableBodyById("WeaponsTable");
        for (let i = 0; i < data.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.appendAnchorWithRefInIt(data[i].name, data[i].id, data[i].category));
            tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(data[i].description));
            let damage = `${data[i].damage} ${data[i].damageType}`;
            tr.appendChild(addTdElementWithClass("text-center", damage));
            this.createAdditionalInfoForWeapons(tr, data[i]);
            let weight = `${data[i].weight} lb.`;
            tr.appendChild(addTdElementWithClass("text-center", weight));
            tr.appendChild(addTdElementWithClass("text-center", getRarity(data[i].rarity)));
        }
    }
    createAdditionalInfoForWeapons(tr, obj) {
        let td = document.createElement("td");
        td.className = "text-center";
        if (obj.isLight == true) {
            let div = this.createTooltipForWeaponProperties("Light", LIGHT_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isHeavy == true) {
            let div = this.createTooltipForWeaponProperties("Heavy", HEAVY_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isReach == true) {
            let div = this.createTooltipForWeaponProperties("Reach", REACH_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isFinesse == true) {
            let div = this.createTooltipForWeaponProperties("Finesse", FINESSE_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isLoading == true) {
            let div = this.createTooltipForWeaponProperties("Loading", LOADING_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isRanged == true) {
            let div = this.createTooltipForWeaponProperties("Range(" + obj.range + ")", RANGE_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.isVersatile == true) {
            let div = this.createTooltipForWeaponProperties("Versatile(" + obj.versatileDamage + ")", VERSATILE_WEAPON_MSG);
            td.appendChild(div);
        }
        if (obj.slot == "twohand") {
            let div = this.createTooltipForWeaponProperties("Two-handed", TWO_HANDED_WEAPON_MSG);
            td.appendChild(div);
        }
        tr.appendChild(td);
    }
    createTooltipForWeaponProperties(innerText, tooltipText) {
        let div = document.createElement("div");
        div.addEventListener("mouseover", changeClassOfTooltipInnerDivLeftUpLeftDown, false);
        div.appendChild(document.createTextNode(innerText));
        div.className = "nav-link tooltipCust";
        let innerDiv = document.createElement("div");
        div.appendChild(innerDiv);
        innerDiv.className = "infoTooltip leftCustUp";
        let p = document.createElement("p");
        innerDiv.appendChild(p);
        p.appendChild(document.createTextNode(tooltipText));
        p.className = "bg-dark mt-5 p-2 border border-secondary";
        innerDiv.appendChild(document.createElement("i"));
        return div;
    }
    checkIfAscendingOrder(cookie) {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }
    getLastOrderBy(isLargeDevice, cookie) {
        let orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "description", "damage", "additionalInfo", "weight", "rarity"], ["name"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
        return orderBy;
    }
}
//# sourceMappingURL=WeaponDisplayer.js.map