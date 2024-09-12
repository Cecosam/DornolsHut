
class CreatureDisplayer {

    public orderData(isLargeDevice: boolean, orderBy: string, isAscending: boolean, data: any): string {
        orderBy = checkIfLastOrderByCookieIsValid(isLargeDevice, orderBy, ["name", "type", "creatureRating", "source", "size"],
            ["name", "type", "creatureRating", "size"]);
        if (isLargeDevice) {
            this.showTheCreatures(this.orderDataBy(data, orderBy, isAscending));
        }
        else {
            this.showTheCreaturesForSmallerDevice(this.orderDataBy(data, orderBy, isAscending));
        }
        return orderBy;
    }

    public displayCreatures(isLargeDevice: boolean, data: any): void {
        let isAscending: boolean = this.checkIfAscendingOrder(getCookie(LAST_ORDERED_BY_COOKIE_NAME)); 
        let orderBy: string = this.getLastOrderBy(isLargeDevice, getCookie(LAST_ORDERED_BY_COOKIE_NAME));
        
        if (isLargeDevice) {
            this.displayForLargeDevice(data, orderBy, isAscending);
        }
        else {
            this.displayForSmallDevice(data, orderBy, isAscending);
        }
    }

    private displayForLargeDevice(data: any, orderBy: string, isAscending: boolean): void {
        this.addElementsToHeadOfTableForCreatures(addHeadOfTable("CreaturesHeadOfTable"),
            ["Name", "Type", "CR", "Size","Source"],
            ["name", "type", "creatureRating", "size", "source"]
        );
        this.showTheCreatures(this.orderDataBy(data, orderBy, isAscending));
    }
    private displayForSmallDevice(data: any, orderBy: string, isAscending:boolean) {
        this.addElementsToHeadOfTableForCreatures(addHeadOfTable("CreaturesHeadOfTable"),
            ["Name", "Type", "CR", "Size"],
            ["name", "type", "creatureRating", "size"]
        );
        this.showTheCreaturesForSmallerDevice(this.orderDataBy(data, orderBy, isAscending));
    }

    private addElementsToHeadOfTableForCreatures(tr, arrayForNames, arrayWithTheKeysFromJson): void {
        for (let i = 0; i < arrayForNames.length; i++) {
            let th: HTMLElement = tr.appendChild(document.createElement("th"));
            th.className = `${arrayForNames[i].replace(/ /g, '')}Creature`;
            let div: HTMLDivElement = th.appendChild(document.createElement("div"));
            if (arrayForNames[i] != "Name")
                div.className = "d-flex justify-content-center";
            let a: HTMLAnchorElement = div.appendChild(document.createElement("a"));
            a.setAttribute("id", "HeadTableAnchorFor" + arrayWithTheKeysFromJson[i]);
            a.className = "nav-link downArrow";
            a.addEventListener("click", function (e: Event) { orderCreaturesBy(e); }, false);
            a.appendChild(document.createTextNode(arrayForNames[i]));
        }
    }
    private showTheCreaturesForSmallerDevice(data: any): void {
        let table: HTMLElement = document.getElementById("Creatures");
        table.children[1].remove();
        let tbody: HTMLElement = document.createElement("tbody");
        tbody.setAttribute("id", "CreaturesTable");
        tbody.classList.add("opacity-custom-95");

        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.addLinkToCreature(data[i]));
            tr.appendChild(addTdElementWithClass("text-center", data[i].type));
            tr.appendChild(addTdElementWithClass("text-center", data[i].creatureRating));
            //tr.appendChild(addTdElementWithClass("text-center", data[i].ac));
            tr.appendChild(addTdElementWithClass("text-center", getCreaturesSizeAsText(data[i].size).charAt(0)));
        }

        table.appendChild(tbody);
    }

    private addLinkToCreature(creature: any): HTMLAnchorElement {
        let a: HTMLAnchorElement = document.createElement("a");
        a.href = `/CreatureViewer/ShowCreature?id=${creature.id}`;
        a.appendChild(document.createTextNode(creature.name));
        return a;
    }

    private showTheCreatures(data: any): void {
        let table: HTMLElement = document.getElementById("Creatures");
        table.children[1].remove();
        let tbody: HTMLElement = document.createElement("tbody");
        tbody.setAttribute("id", "CreaturesTable");
        tbody.classList.add("opacity-custom-95");

        for (let i = 0; i < data.length; i++) {
            let tr: HTMLElement = tbody.appendChild(document.createElement("tr"));
            tr.appendChild(document.createElement("td")).appendChild(this.addLinkToCreature(data[i]));
            tr.appendChild(addTdElementWithClass("text-center", data[i].type));
            tr.appendChild(addTdElementWithClass("text-center", data[i].creatureRating));
            tr.appendChild(addTdElementWithClass("text-center", getCreaturesSizeAsText(data[i].size)));
            let td: HTMLElement = document.createElement("td");
            td.appendChild(this.createTooltipForSource(data[i].sourceShort, data[i].source));
            td.className = "text-center";
            tr.appendChild(td);
        }

        table.appendChild(tbody);
    }

    private orderDataBy(data: any, obj: string, asc: boolean): any {
        var prop = obj;

        if (obj == "creatureRating") {
            data.sort(function (a, b) {
                if (a[prop] == "Unknown") 
                    return 10000;
                if (b[prop] == "Unknown")
                    return -10000;

                let firstNumber: number = a[prop];
                let secondNumber: number = b[prop];
                if ("1/2" == a[prop])
                    firstNumber = 0.5;
                else if ("1/4" == a[prop])
                    firstNumber = 0.25;
                else if ("1/8" == a[prop])
                    firstNumber = 0.125;

                if ("1/2" == b[prop])
                    secondNumber = 0.5;
                else if ("1/4" == b[prop])
                    secondNumber = 0.25;
                else if ("1/8" == b[prop])
                    secondNumber = 0.125;

                if (asc) {
                    return firstNumber - secondNumber
                }
                else {
                    return secondNumber - firstNumber;
                }
            });
        }
        else {
            data.sort(function (a, b) {
                if (asc) {
                    return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                } else {
                    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                }
            });
        }

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

    private createTooltipForSource(sourceShort: string, source: string): HTMLDivElement {
        let div: HTMLDivElement = document.createElement("div");
        div.appendChild(document.createTextNode(sourceShort));
        div.addEventListener("mouseover", changeClassOfTooltipInnerDivLeftUpLeftDown, false);
        div.className = "nav-link tooltipCust";
        let innerDiv: HTMLDivElement = document.createElement("div");
        div.appendChild(innerDiv);
        innerDiv.className = "infoTooltip leftCustUp"

        let p: HTMLParagraphElement = document.createElement("p");
        p.appendChild(document.createTextNode(source));
        p.className = "bg-dark mt-5 p-2 border border-secondary";
        innerDiv.appendChild(p);
        innerDiv.appendChild(document.createElement("i"));

        return div;
    }

    private checkIfAscendingOrder(cookie: string): boolean {
        if (cookie.includes(DESCENDING_AS_TEXT))
            return false;
        return true;
    }

    private getLastOrderBy(isLargeDevice: boolean, cookie: string): string {
        let orderBy: string = checkIfLastOrderByCookieIsValid(isLargeDevice, cookie.replace(DESCENDING_AS_TEXT, ""), ["name", "type", "creatureRating", "source", "size"],
            ["name", "type", "creatureRating", "size"]);
        if (orderBy != cookie.replace(DESCENDING_AS_TEXT, ""))
            setCookie(LAST_ORDERED_BY_COOKIE_NAME, orderBy);

        return orderBy;
    }
}