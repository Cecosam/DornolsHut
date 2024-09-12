import { showHideDescription } from "./ItemViewerScript.js";
export abstract class IItemDisplayer {

    protected data: any;
    protected constructor(data: any) {
        this.data = data;
    }
    public abstract showData(isLargeDevice: boolean): void;
    public abstract orderData(isLargeDevice: boolean, orderBy: string, isAscending: boolean): string;

    protected orderDataBy(data: any, obj: string, asc: boolean): any {
        var prop: string = obj.charAt(0).toLowerCase() + obj.slice(1);
        data.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        //"downArrow" is the arrow next to the parameter, that the table has been orderd by.
        var elementToRemove: HTMLElement = document.getElementById("downArrow");
        if (elementToRemove) {
            elementToRemove.remove();
        }

        var anchorElement: HTMLAnchorElement = document.getElementById(`HeadTableAnchorFor${obj}`) as HTMLAnchorElement;
        var newElement: HTMLElement = anchorElement.parentNode.appendChild(document.createElement("i"));
        newElement.setAttribute("id", "downArrow");
        //class for the icon. Uses https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css
        newElement.className = "bi bi-caret-down downArrow";

        return data;
    }

    protected getTableBodyById(id: string): HTMLElement {
        var tbody: HTMLElement = document.getElementById(id);

        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }

        return tbody;
    }
    protected prepareForSmallDisplay(tableRowElement: HTMLElement, item: any, index: number) {
        var div: HTMLElement = document.createElement("div");
        tableRowElement.appendChild(div);

        var td = document.createElement("td");
        td.appendChild(this.appendAnchorWithRefInIt(item.name, item.id, item.category));
        div.appendChild(td);

        var newElement = document.createElement("i");
        newElement.setAttribute("id", "downArrow");
        newElement.addEventListener("click", function () { showHideDescription(`tableRow${index}`); }, false);
        newElement.className = "bi bi-caret-down downArrow";
        div.appendChild(newElement);

        div.className = "d-flex justify-content-between";
        div.setAttribute("id", `tableRow${index}`);
        div = $('<div>').append("<strong>Description: </strong>").append(this.addClassToAnchors(item.description, "text-dark"))[0];
        div.className = "table-light text-dark";
        div.hidden = true;

        return div;
    }

    private addClassToAnchors(description: string, classes: string): string {
        let startIndex: number = description.indexOf(`<a`);
        while (startIndex != -1) {
            let endIndex: number = description.indexOf(">", startIndex);
            let classToAdd = ` class=\"${classes}\" target=\"_blank\" `;
            let hrefStart = description.indexOf("href", startIndex);
            if (hrefStart > 0 && hrefStart < endIndex)
                description = description.substring(0, startIndex + 2) + classToAdd + description.substring(hrefStart);           
            startIndex = description.indexOf(`<a`, startIndex + 2);
        }

        return description;
    }

    protected appendAnchorWithRefInIt(itemName, itemId, itemCategory) {
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(itemName));
        a.setAttribute("href", `/ItemViewer/ShowItem?category=${itemCategory}&id=${itemId}`);
        return a;
    }
}