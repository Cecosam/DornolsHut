
class CreatureAdder {

    private lootGeneratorManager: LootGeneratorManager;
    public constructor(lootGeneratorManager: LootGeneratorManager) {
        this.lootGeneratorManager = lootGeneratorManager;
    }

    public addCreatureToUList(creatureToAdd: any, creatureLiElementId:number) {
        let ulElement: HTMLElement = document.getElementById("creaturesUl");
        let liElement: HTMLElement = document.createElement("li");
        liElement.className = "list-group-item d-flex justify-content-between align-items-center flex-row-c";
        liElement.setAttribute("id", creatureLiElementId as unknown as string);

        let span: HTMLElement = document.createElement("span");
        span.appendChild(this.createSpan(`Name: ${creatureToAdd.name}`));
        span.appendChild(this.createSpan(`CR: ${creatureToAdd.creatureRating}`));
        span.appendChild(this.createSpan(`Type: ${creatureToAdd.type}`));
        liElement.appendChild(span);

        span = document.createElement("span");
        span.className = "flex-row-c";
        let button: HTMLElement = document.createElement("button");
        button.appendChild(document.createTextNode("Get loot"));
        button.className = "btn btn-success";
        button.setAttribute("id", `getLootButton${creatureToAdd.id}on${creatureLiElementId}`);
        button.addEventListener("click", getLootForEvent, false);
        span.appendChild(button);

        button = document.createElement("button");
        button.appendChild(document.createTextNode(REMOVE_CREATURE_AS_TEXT));
        button.className = "btn btn-danger";
        button.setAttribute("id", "removeCreatureFromList" + creatureLiElementId);
        button.addEventListener("click", function (event) { openRemoveCreatureModal(event) }, false);
        span.appendChild(button);
        liElement.appendChild(span);

        creatureLiElementId++;

        ulElement.appendChild(liElement);

        return creatureLiElementId;
    }

    public addCreature(creatureLiElementId:number, data:any): number {
        let inputText: string = (document.getElementById("chooseCreatureInputInModal") as HTMLInputElement).value.split(" [")[0];
        let creatureToAdd: any = "";
        if (inputText != "") {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == inputText) {
                    creatureToAdd = data[i];
                    break;
                }
            }
        }

        if (creatureToAdd != "") {
            location.href = `/LootGenerator/AddCreature?creatureId=${creatureToAdd.id}&liElementId=${creatureLiElementId}`;

            //creatureLiElementId = this.addCreatureToUList(creatureToAdd, creatureLiElementId);
            //this.lootGeneratorManager.closeModal();
            //return creatureLiElementId;
        }
        else {
            hideLoadingScreen("mainLootGeneratorDiv");

            let inputField: HTMLInputElement = document.getElementById("chooseCreatureInputInModal") as HTMLInputElement;

            let listWithCreatures: HTMLElement = document.getElementById("listWithCreatures");

            while (listWithCreatures.firstChild) {
                listWithCreatures.firstChild.remove();
            }

            inputField.value = "";
            inputField.setAttribute("placeholder", "Invalid input");
        }
        return creatureLiElementId;
    }

    public chooseCreature(data: any): void {
        let inputText: string[] = (document.getElementById("chooseCreatureInputInModal") as HTMLInputElement).value.split(" ");
        let resultData: any = [];

        if (inputText[0] != "" || inputText.length > 1) {
            resultData = this.filterDataByWordsForLootGeneratorInput(data, inputText, 0);
        }

        let listWithCreatures: HTMLElement = document.getElementById("listWithCreatures");

        while (listWithCreatures.firstChild) {
            listWithCreatures.firstChild.remove();
        }

        if (resultData.length == 0) {
            listWithCreatures.style.maxHeight = "0px";
        }
        else {
            listWithCreatures.style.maxHeight = "250px";
        }
        for (var i = 0; i < resultData.length; i++) {
            //Skip creatures that have not enough info on them
            if ("varies" == resultData[i].creatureRating) {
                return;
            }
            let liElement: HTMLLIElement = document.createElement("li");
            liElement.className = "list-group-item d-flex justify-content-between align-items-center";
            let a: HTMLAnchorElement = document.createElement("a");
            a.href = `javascript:chooseThisCreature('${resultData[i].name.replace("'", "\\'")}')`;
            a.appendChild(document.createTextNode(`${resultData[i].name} [${resultData[i].creatureRating}]`));
            liElement.appendChild(a);
            listWithCreatures.appendChild(liElement);
        }
    }

    private filterDataByWordsForLootGeneratorInput(inputData: any, words: string[], index: number): any {
        if (index >= words.length) {
            return inputData;
        }
        if (words[index] == "") {
            index++;
            return this.filterDataByWordsForLootGeneratorInput(inputData, words, index);
        }

        let resultData: any = [];
        let wordToLower: string = words[index].toLowerCase();
        if (isNumeric(wordToLower)) {
            $.each(inputData, function (i, creature) {
                if (creature.creatureRating == wordToLower) {
                    resultData.push(creature);
                }
            });
        }
        else {
            $.each(inputData, function (i, creature) {
                if (`${creature.name}${creature.creatureRating}${creature.type}`.toLowerCase().includes(wordToLower)) {
                    resultData.push(creature);
                }
            });
        }

        index++;
        return this.filterDataByWordsForLootGeneratorInput(resultData, words, index);
    }

    private createSpan(text: string): HTMLElement {
        let span: HTMLElement = document.createElement("span");
        span.appendChild(document.createTextNode(text));
        span.className = "ms-2 d-block";
        return span;
    }
}