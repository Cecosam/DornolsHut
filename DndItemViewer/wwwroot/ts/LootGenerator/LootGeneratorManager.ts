//import { removeTheCreatureFromTheList, addCreatureToList, chooseCreatureInModal } from "./LootGeneratorScripts.js";
//console.log("LootGeneratorManager");

class LootGeneratorManager{
    public closeModal(): void {
        let modal: HTMLElement = document.getElementById("Modal");
        let divWithContent: HTMLElement = document.getElementById("ModalContent");
        clearElements(divWithContent);
        modal.hidden = true;
    }

    public openRemoveCreatureModal(): number {
        let creatureLiId: number = (event.target as HTMLElement).id.replace("removeCreatureFromList", "") as unknown as number;
        let modal: HTMLElement = document.getElementById("Modal");
        modal.hidden = false;

        (document.getElementsByClassName("modal-title")[0] as HTMLElement).innerText = "Remove Creature";

        let divWithContent: HTMLElement = document.getElementById("ModalContent");

        let p: HTMLParagraphElement = document.createElement("p");
        p.innerText = "Do you really want to remove the creature from the list?";
        p.className = "text-light";
        divWithContent.appendChild(p);

        let button: HTMLElement = document.getElementById("ModalButton");
        button.innerHTML = "Remove Creature";
        button.className = "btn btn-danger";
        button.addEventListener("click", removeTheCreatureFromTheList, false);
        button.removeEventListener("click", addCreatureToList, false);

        return creatureLiId;
    }

    public openCreateCreatureModal(): void {
        let creaturesDiv: HTMLElement = document.getElementById("Modal");
        creaturesDiv.hidden = false;

        (document.getElementsByClassName("modal-title")[0] as HTMLElement).innerText = "Add Creature";

        let divWithContent: HTMLElement = document.getElementById("ModalContent");

        let label: HTMLLabelElement = document.createElement("label");
        label.setAttribute("for", "input");
        label.innerText = "Choose Creature: ";
        label.className = "text-light";
        divWithContent.appendChild(label);

        let i: HTMLElement = document.createElement("i");
        i.className = "bx bxs-map";
        divWithContent.appendChild(i);

        let input: HTMLElement = document.createElement("input");
        input.setAttribute("id", "chooseCreatureInputInModal");
        input.setAttribute("type", "text");
        input.setAttribute("name", "input");
        input.addEventListener("input", chooseCreatureInModal, false);
        input.setAttribute("placeholder", "Search by Name, CR and Type all Together");
        input.setAttribute("autocomplete", "off");
        input.className = "mt-4 mb-0 InputForModal";

        divWithContent.appendChild(input);

        let ul: HTMLElement = document.createElement("ul");
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