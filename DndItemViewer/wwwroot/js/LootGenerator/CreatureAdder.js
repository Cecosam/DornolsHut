class CreatureAdder {
    constructor(lootGeneratorManager) {
        this.lootGeneratorManager = lootGeneratorManager;
    }
    addCreatureToUList(creatureToAdd, creatureLiElementId) {
        let ulElement = document.getElementById("creaturesUl");
        let liElement = document.createElement("li");
        liElement.className = "list-group-item d-flex justify-content-between align-items-center flex-row-c";
        liElement.setAttribute("id", creatureLiElementId);
        let span = document.createElement("span");
        let linkToCreature = document.createElement("a");
        linkToCreature.href = `/CreatureViewer/ShowCreature?Id=${creatureToAdd.id}`;
        linkToCreature.innerText = `${creatureToAdd.name}`;
        //linkToCreature.className = "ms-2 d-block";
        let spanWithThelinkToCreature = this.createSpan(`Name: `);
        spanWithThelinkToCreature.className = "ms-2 d-block";
        spanWithThelinkToCreature.appendChild(linkToCreature);
        span.appendChild(spanWithThelinkToCreature);
        span.appendChild(this.createSpan(`CR: ${creatureToAdd.creatureRating}`));
        span.appendChild(this.createSpan(`Type: ${creatureToAdd.type}`));
        liElement.appendChild(span);
        span = document.createElement("span");
        span.className = "flex-row-c";
        let button = document.createElement("button");
        button.appendChild(document.createTextNode("Get loot"));
        button.className = "btn btn-success";
        button.setAttribute("id", `getLootButton${creatureToAdd.id}on${creatureLiElementId}`);
        button.addEventListener("click", getLootForEvent, false);
        span.appendChild(button);
        button = document.createElement("button");
        button.appendChild(document.createTextNode(REMOVE_CREATURE_AS_TEXT));
        button.className = "btn btn-danger";
        button.setAttribute("id", "removeCreatureFromList" + creatureLiElementId);
        button.addEventListener("click", function (event) { openRemoveCreatureModal(event); }, false);
        span.appendChild(button);
        liElement.appendChild(span);
        creatureLiElementId++;
        ulElement.appendChild(liElement);
        return creatureLiElementId;
    }
    addCreature(creatureLiElementId, data) {
        let inputText = document.getElementById("chooseCreatureInputInModal").value.split(" [")[0];
        let creatureToAdd = "";
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
            let inputField = document.getElementById("chooseCreatureInputInModal");
            let listWithCreatures = document.getElementById("listWithCreatures");
            while (listWithCreatures.firstChild) {
                listWithCreatures.firstChild.remove();
            }
            inputField.value = "";
            inputField.setAttribute("placeholder", "Invalid input");
        }
        return creatureLiElementId;
    }
    chooseCreature(data) {
        let inputText = document.getElementById("chooseCreatureInputInModal").value.split(" ");
        let resultData = [];
        if (inputText[0] != "" || inputText.length > 1) {
            resultData = this.filterDataByWordsForLootGeneratorInput(data, inputText, 0);
        }
        let listWithCreatures = document.getElementById("listWithCreatures");
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
            let liElement = document.createElement("li");
            liElement.className = "list-group-item d-flex justify-content-between align-items-center";
            let a = document.createElement("a");
            a.href = `javascript:chooseThisCreature('${resultData[i].name.replace("'", "\\'")}')`;
            a.appendChild(document.createTextNode(`${resultData[i].name} [${resultData[i].creatureRating}]`));
            liElement.appendChild(a);
            listWithCreatures.appendChild(liElement);
        }
    }
    filterDataByWordsForLootGeneratorInput(inputData, words, index) {
        if (index >= words.length) {
            return inputData;
        }
        if (words[index] == "") {
            index++;
            return this.filterDataByWordsForLootGeneratorInput(inputData, words, index);
        }
        let resultData = [];
        let wordToLower = words[index].toLowerCase();
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
    createSpan(text) {
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(text));
        span.className = "ms-2 d-block";
        return span;
    }
}
//# sourceMappingURL=CreatureAdder.js.map