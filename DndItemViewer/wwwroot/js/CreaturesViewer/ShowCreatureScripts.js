window.addEventListener("load", function () {
    $('#info').append(creature.otherInfo);
    addSkillsToCreature();
}, false);
function addSkillsToCreature() {
    let divElement = document.getElementById("skills");
    let skills = creature.skills.split("@");
    for (var i = 0; i < skills.length; i++) {
        var elementToAdd = $('<div>').append(skills[i])[0];
        divElement.appendChild(elementToAdd);
    }
}
//# sourceMappingURL=ShowCreatureScripts.js.map