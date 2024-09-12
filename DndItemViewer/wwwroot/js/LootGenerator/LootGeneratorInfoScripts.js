window.addEventListener("load", function () {
    document.getElementById("CrInputInModal").addEventListener("input", showRarities, false);
}, false);
function showRarities() {
    let input = document.getElementById("CrInputInModal");
    if (isNumeric(input.value) == true) {
        let inputAsNumber = input.value;
        if (inputAsNumber > 30 || inputAsNumber < 0) {
            input.value = "";
            return;
        }
        //The cosmic magic starts here
        let commonItemDropRate = 10;
        let creatureRating = inputAsNumber;
        let bias = creatureRating / 4;
        bias = bias * bias;
        creatureRating = creatureRating * 2;
        commonItemDropRate += creatureRating * 2 + bias * 3.4;
        var legendaryRating = (creatureRating - 50 + bias * 0.5) >= 0 ? creatureRating - 50 + bias * 0.5 : 0;
        var veryRare = (creatureRating - 35 + bias * 0.8) >= 0 ? creatureRating - 35 + bias * 0.8 : 0;
        var rare = (creatureRating - 25 + bias * 1.4) >= 0 ? creatureRating - 25 + bias * 1.4 : 0;
        var uncommon = (creatureRating - 10 + bias * 2.2) >= 0 ? creatureRating - 10 + bias * 2.2 : 0;
        addNewValueForParagraphRarity("ParagraphLegendary", "Legendary: " + ((legendaryRating / commonItemDropRate) * 100).toFixed(3) + " %");
        addNewValueForParagraphRarity("ParagraphVeryRare", "Very rare: " + (((veryRare - legendaryRating) / commonItemDropRate) * 100).toFixed(3) + " %");
        addNewValueForParagraphRarity("ParagraphRare", "Rare: " + (((rare - veryRare) / commonItemDropRate) * 100).toFixed(3) + " %");
        addNewValueForParagraphRarity("ParagraphUncommon", "Uncommon: " + (((uncommon - rare) / commonItemDropRate) * 100).toFixed(3) + " %");
        addNewValueForParagraphRarity("ParagraphCommon", "Common: " + (((commonItemDropRate - uncommon) / commonItemDropRate) * 100).toFixed(3) + " %");
    }
    else
        input.value = "";
}
function addNewValueForParagraphRarity(id, newValue) {
    var rarityParagraph = document.getElementById(id);
    rarityParagraph.removeChild(rarityParagraph.firstChild);
    rarityParagraph.appendChild(document.createTextNode(newValue));
}
//# sourceMappingURL=LootGeneratorInfoScripts.js.map