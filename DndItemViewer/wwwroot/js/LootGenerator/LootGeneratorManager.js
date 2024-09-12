//import { removeTheCreatureFromTheList, addCreatureToList, chooseCreatureInModal } from "./LootGeneratorScripts.js";
//console.log("LootGeneratorManager");
class LootGeneratorManager {
    closeModal() {
        let modal = document.getElementById("Modal");
        let divWithContent = document.getElementById("ModalContent");
        clearElements(divWithContent);
        modal.hidden = true;
    }
    openRemoveCreatureModal() {
        let creatureLiId = event.target.id.replace("removeCreatureFromList", "");
        let modal = document.getElementById("Modal");
        modal.hidden = false;
        document.getElementsByClassName("modal-title")[0].innerText = "Remove Creature";
        let divWithContent = document.getElementById("ModalContent");
        let p = document.createElement("p");
        p.innerText = "Do you really want to remove the creature from the list?";
        p.className = "text-light";
        divWithContent.appendChild(p);
        let button = document.getElementById("ModalButton");
        button.innerHTML = "Remove Creature";
        button.className = "btn btn-danger";
        button.addEventListener("click", removeTheCreatureFromTheList, false);
        button.removeEventListener("click", addCreatureToList, false);
        return creatureLiId;
    }
    openCreateCreatureModal() {
        let creaturesDiv = document.getElementById("Modal");
        creaturesDiv.hidden = false;
        document.getElementsByClassName("modal-title")[0].innerText = "Add Creature";
        let divWithContent = document.getElementById("ModalContent");
        let label = document.createElement("label");
        label.setAttribute("for", "input");
        label.innerText = "Choose Creature: ";
        label.className = "text-light";
        divWithContent.appendChild(label);
        let i = document.createElement("i");
        i.className = "bx bxs-map";
        divWithContent.appendChild(i);
        let input = document.createElement("input");
        input.setAttribute("id", "chooseCreatureInputInModal");
        input.setAttribute("type", "text");
        input.setAttribute("name", "input");
        input.addEventListener("input", chooseCreatureInModal, false);
        input.setAttribute("placeholder", "Search by Name, CR and Type all Together");
        input.setAttribute("autocomplete", "off");
        input.className = "mt-4 mb-0 InputForModal";
        divWithContent.appendChild(input);
        let ul = document.createElement("ul");
        ul.setAttribute("id", "listWithCreatures");
        ul.className = "list-group overflow-auto searchBoxModal";
        divWithContent.appendChild(ul);
        var button = document.getElementById("ModalButton");
        button.innerHTML = "Add Creature";
        button.className = "btn btn-success";
        button.addEventListener("click", addCreatureToList, false);
        button.removeEventListener("click", removeTheCreatureFromTheList, false);
        input.focus();
    }
}
//# sourceMappingURL=LootGeneratorManager.js.map