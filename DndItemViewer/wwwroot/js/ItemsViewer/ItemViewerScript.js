export function filterItems() {
    var item = document.getElementById("ItemsInput").value;
    if (item == "3") {
        var armorType = document.getElementById("ArmorTypeInput");
        if (armorType)
            location.href = `/ItemViewer/ShowArmors?name=${armorType.value}`;
        else
            location.href = `/ItemViewer/ShowArmors?name=0`;
    }
    else if (item == "5") {
        var weaponType = document.getElementById("SimpleWeaponTypeInput");
        if (weaponType)
            location.href = `/ItemViewer/ShowWeapons?category=${item}&name=${weaponType.value}`;
        else
            location.href = `/ItemViewer/ShowWeapons?category=${item}&name=0`;
    }
    else if (item == "6") {
        var weaponType = document.getElementById("MartialWeaponTypeInput");
        if (weaponType)
            location.href = `/ItemViewer/ShowWeapons?category=${item}&name=${weaponType.value}`;
        else
            location.href = `/ItemViewer/ShowWeapons?category=${item}&name=14`;
    }
    else if (item == "4") {
        location.href = `/ItemViewer/ShowPoisons`;
    }
    else if (item == "10") {
        var rarity = document.getElementById("WondrousRarityInput");
        if (rarity)
            location.href = `/ItemViewer/ShowWondrousItems?rarity=${rarity.value}`;
        else
            location.href = `/ItemViewer/ShowWondrousItems?rarity=4`;
    }
    else {
        location.href = `/ItemViewer/ShowItems?category=${item}`;
    }
}
export function onItemsInputChange(select) {
    if (select.value == display) {
        var div = document.getElementById("additionalSelectDiv");
        if (div) {
            div.hidden = false;
        }
    }
    else {
        var div = document.getElementById("additionalSelectDiv");
        if (div) {
            div.hidden = true;
        }
    }
}
export function showHideDescription(id) {
    var div = document.getElementById(id);
    var i = div.getElementsByTagName("i")[0];
    i.remove();
    var nextTr = div.nextSibling;
    var newElement = document.createElement("i");
    newElement.setAttribute("id", "downArrow");
    newElement.addEventListener("click", function () { showHideDescription(`${id}`); }, false);
    if (nextTr.hidden == true) {
        newElement.className = "bi bi-caret-right downArrow";
        nextTr.hidden = false;
    }
    else {
        newElement.className = "bi bi-caret-down downArrow";
        nextTr.hidden = true;
    }
    div.appendChild(newElement);
}
//# sourceMappingURL=ItemViewerScript.js.map