class SpellDisplayer {
    constructor(data) {
        this.data = data;
    }
    orderData(isLargeDevice, orderBy, isAscending) {
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["spellName", "spellLevel", "castingTime", "components", "school"], ["spellName", "spellLevel", "school"]);
        if (isLargeDevice) {
            this.showTheSpells(this.orderDataBy(this.data, orderBy, isAscending));
        }
        else {
            this.showTheSpellsForSmallerDevice(this.orderDataBy(this.data, orderBy, isAscending));
        }
        return orderBy;
    }
    displaySpells(isLargeDevice) {
        document.getElementById("spellLevelsInput").value = filterLevel;
        document.getElementById("spellSchoolsInput").value = filterSchool;
        document.getElementById("spellClassesInput").value = filterClass;
        let isAscending = this.checkIfAscendingOrder(getCookie(LAST_ORDERED_BY_COOKIE_NAME));
        let orderBy = this.getLastOrderBy(isLargeDevice, getCookie(LAST_ORDERED_BY_COOKIE_NAME));
        if (isLargeDevice) {
            this.displayForLargeDevice(orderBy, isAscending);
        }
        else {
            this.displayForSmallDevice(orderBy, isAscending);
        }
    }
    displayForLargeDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTableForSpells(addHeadOfTable("SpellsHeadOfTable"), ["Name", "Level", "Casting Time", "Components", "School"], ["spellName", "spellLevel", "castingTime", "components", "school"]);
        this.showTheSpells(this.orderDataBy(this.data, orderBy, isAscending));
    }
    displayForSmallDevice(orderBy, isAscending) {
        this.addElementsToHeadOfTableForSpells(addHeadOfTable("SpellsHeadOfTable"), ["Name", "Level", "School"], ["spellName", "spellLevel", "school"]);
        this.showTheSpellsForSmallerDevice(this.orderDataBy(this.data, orderBy, isAscending));
    }
    addElementsToHeadOfTableForSpells(tr, arrayForNames, arrayWithTheKeysFromJson) {
        for (let i = 0; i < arrayForNames.length; i++) {
            let th = tr.appendChild(document.createElement("th"));
            th.className = `${arrayForNames[i].replace(/ /g, '')}Spell`;
            let div = th.appendChild(document.createElement("div"));
            if (arrayForNames[i] != "Name")
                div.className = "d-flex justify-content-center";
            let a = div.appendChild(document.createElement("a"));
            a.setAttribute("id", "HeadTableAnchorFor" + arrayWithTheKeysFromJson[i]);
            a.className = "nav-link downArrow";
            a.addEventListener("click", function (e) { orderSpellsBy(e); }, false);
            a.appendChild(document.createTextNode(arrayForNames[i]));
        }
    }
    showTheSpellsForSmallerDevice(data) {
        let tbody = document.getElementById("SpellsTable");
        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }
        for (let i = 0; i < data.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.addLinkToSpell(data[i]));
            tr.appendChild(addTdElementWithClass("text-center", getSpellLevelAsText(data[i].spellLevel)));
            tr.appendChild(addTdElementWithClass("text-center", data[i].school));
        }
    }
    addLinkToSpell(spell) {
        let a = document.createElement("a");
        a.href = `/SpellViewer/ShowSpell?id=${spell.id}`;
        a.appendChild(document.createTextNode(spell.spellName));
        return a;
    }
    showTheSpells(data) {
        let tbody = document.getElementById("SpellsTable");
        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }
        for (let i = 0; i < data.length; i++) {
            let tr = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.createTooltipForSpell(data[i]));
            tr.appendChild(addTdElementWithClass("text-center", getSpellLevelAsText(data[i].spellLevel)));
            tr.appendChild(addTdElementWithClass("text-center", data[i].castingTime));
            tr.appendChild(addTdElementWithClass("text-center", data[i].components));
            let td = document.createElement("td");
            td.appendChild(this.createTooltipForSchools(data[i].school, this.getTooltipDescriptionForSpellSchool(data[i].school)));
            td.className = "text-center";
            tr.appendChild(td);
        }
    }
    orderDataBy(data, obj, asc) {
        var prop = obj;
        data.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        //"downArrow" is the arrow next to the parameter, that the table has been orderd by.          
        var elementToRemove = document.getElementById("downArrow");
        if (elementToRemove) {
            elementToRemove.remove();
        }
        var a = document.getElementById("HeadTableAnchorFor" + obj);
        var newElement = a.parentNode.appendChild(document.createElement("i"));
        newElement.setAttribute("id", "downArrow");
        //class for the icon. Uses https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css
        newElement.className = "bi bi-caret-down downArrow";
        return data;
    }
    createTooltipForSpell(spell) {
        let div = document.createElement("div");
        let a = document.createElement("a");
        a.href = "/SpellViewer/ShowSpell?id=" + spell.id;
        a.appendChild(document.createTextNode(spell.spellName));
        div.appendChild(a);
        div.addEventListener("mouseover", changeClassOfTooltipInnerDivRightUpRightDown, false);
        div.className = "nav-link tooltipCust";
        let innerDiv = document.createElement("div");
        div.appendChild(innerDiv);
        innerDiv.className = "spellTooltip rightCustDown";
        let p = $('<p>').append(this.getDescription(spell.description))[0];
        p.className = "bg-dark mt-5 p-2 border border-secondary";
        p.style.overflow = "hidden";
        p.style.maxHeight = "500px";
        innerDiv.appendChild(p);
        let i = document.createElement("i");
        i.className = "fixForIElementsInTooltip";
        innerDiv.appendChild(i);
        return div;
    }
    getDescription(description) {
        description = description.replaceAll("@@li@@", "<li>");
        description = description.replaceAll("@@/li@@", "</li>");
        description = description.replaceAll("@@ul@@", "<ul>");
        description = description.replaceAll("@@/ul@@", "</ul>");
        description = description.replaceAll("@@b@@", "<b>");
        description = description.replaceAll("@@/b@@", "</b>");
        description = description.replaceAll("@@i@@", "<i>");
        description = description.replaceAll("@@/i@@", "</i>");
        description = description.replaceAll("@@br@@", "<br>");
        description = this.getTablesFromDescription(description);
        let index = description.indexOf("@@/div@@");
        description = replaceAtFunc(description, "@@/div@@", index, "");
        return description;
    }
    getTablesFromDescription(description) {
        while (description.indexOf("@@table@@") != -1) {
            let index = 0;
            let next = 0;
            while (description.indexOf("@@title@@") != -1) {
                index = description.indexOf("@@title@@");
                description = replaceAtFunc(description, "@@title@@", index, "<h3>");
                index = description.indexOf("@@/div@@", index);
                description = replaceAtFunc(description, "@@/div@@", index, "</h3>");
            }
            index = description.indexOf("@@table@@");
            description = replaceAtFunc(description, "@@table@@", index, '<table class="table table-bordered table-striped">');
            while (true) {
                index = description.indexOf("@@thr@@", index);
                description = replaceAtFunc(description, "@@thr@@", index, "<tr>");
                while (true) {
                    index = description.indexOf("@@div@@", index);
                    description = replaceAtFunc(description, "@@div@@", index, "<th>");
                    index = description.indexOf("@@/div@@", index);
                    description = replaceAtFunc(description, "@@/div@@", index, "</th>");
                    next = description.indexOf("@@", index);
                    if (description[next + 2] == '/') {
                        index = description.indexOf("@@/div@@", index);
                        description = replaceAtFunc(description, "@@/div@@", index, "</tr>");
                        break;
                    }
                }
                while (true) {
                    index = description.indexOf("@@tdr@@", index);
                    description = replaceAtFunc(description, "@@tdr@@", index, "<tr>");
                    next = 0;
                    while (true) {
                        index = description.indexOf("@@div@@", index);
                        description = replaceAtFunc(description, "@@div@@", index, "<td>");
                        index = description.indexOf("@@/div@@", index);
                        description = replaceAtFunc(description, "@@/div@@", index, "</td>");
                        next = description.indexOf("@@", index);
                        if (description[next + 2] == '/') {
                            index = description.indexOf("@@/div@@", index);
                            description = replaceAtFunc(description, "@@/div@@", index, "</tr>");
                            break;
                        }
                    }
                    next = description.indexOf("@@", index);
                    if (description[next + 2] == '/' || description.substring(next, next + 7).includes("thr")) {
                        break;
                    }
                }
                next = description.indexOf("@@", index);
                if (description[next + 2] == '/') {
                    index = description.indexOf("@@/div@@", index);
                    description = replaceAtFunc(description, "@@/div@@", index, "</table>");
                    break;
                }
            }
        }
        return description;
    }
    createTooltipForSchools(name, description) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(name));
        div.addEventListener("mouseover", changeClassOfTooltipInnerDivLeftUpLeftDown, false);
        div.className = "nav-link tooltipCust";
        let innerDiv = document.createElement("div");
        div.appendChild(innerDiv);
        innerDiv.className = "infoTooltip leftCustUp";
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(description));
        p.className = "bg-dark mt-5 p-2 border border-secondary";
        innerDiv.appendChild(p);
        innerDiv.appendChild(document.createElement("i"));
        return div;
    }
    getTooltipDescriptionForSpellSchool(school) {
        if (SpellSchoolEnum.ABJURATION == school)
            return ABJURATION_DESCRIPTION;
        else if (SpellSchoolEnum.TRANSMUTATION == school)
            return TRANSMUTATION_DESCRIPTION;
        else if (SpellSchoolEnum.CONJURATION == school)
            return CONJURATION_DESCRIPTION;
        else if (SpellSchoolEnum.DIVINATION == school)
            return DIVINATION_DESCRIPTION;
        else if (SpellSchoolEnum.ENCHANTMENT == school)
            return ENCHANTMENT_DESCRIPTION;
        else if (SpellSchoolEnum.ILLUSION == school)
            return ILLUSION_DESCRIPTION;
        else if (SpellSchoolEnum.EVOCATION == school)
            return EVOCATION_DESCRIPTION;
        else if (SpellSchoolEnum.NECROMANCY == school)
            return NECROMANCY_DESCRIPTION;
    }
    checkIfAscendingOrder(cookie) {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }
    getLastOrderBy(isLargeDevice, cookie) {
        let orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["spellName", "spellLevel", "castingTime", "components", "school"], ["spellName", "spellLevel", "school"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);
        return orderBy;
    }
}
//# sourceMappingURL=SpellDisplayer.js.map