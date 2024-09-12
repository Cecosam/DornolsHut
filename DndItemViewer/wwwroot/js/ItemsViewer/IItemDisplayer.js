import { showHideDescription } from "./ItemViewerScript.js";
export class IItemDisplayer {
    constructor(data) {
        this.data = data;
    }
    orderDataBy(data, obj, asc) {
        var prop = obj.charAt(0).toLowerCase() + obj.slice(1);
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
        var anchorElement = document.getElementById(`HeadTableAnchorFor${obj}`);
        var newElement = anchorElement.parentNode.appendChild(document.createElement("i"));
        newElement.setAttribute("id", "downArrow");
        //class for the icon. Uses https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css
        newElement.className = "bi bi-caret-down downArrow";
        return data;
    }
    getTableBodyById(id) {
        var tbody = document.getElementById(id);
        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }
        return tbody;
    }
    prepareForSmallDisplay(tableRowElement, item, index) {
        var div = document.createElement("div");
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
    addClassToAnchors(description, classes) {
        let startIndex = description.indexOf(`<a`);
        while (startIndex != -1) {
            let endIndex = description.indexOf(">", startIndex);
            let classToAdd = ` class=\"${classes}\" target=\"_blank\" `;
            let hrefStart = description.indexOf("href", startIndex);
            if (hrefStart > 0 && hrefStart < endIndex)
                description = description.substring(0, startIndex + 2) + classToAdd + description.substring(hrefStart);
            startIndex = description.indexOf(`<a`, startIndex + 2);
        }
        return description;
    }
    appendAnchorWithRefInIt(itemName, itemId, itemCategory) {
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(itemName));
        a.setAttribute("href", `/ItemViewer/ShowItem?category=${itemCategory}&id=${itemId}`);
        return a;
    }
}
//# sourceMappingURL=IItemDisplayer.js.map