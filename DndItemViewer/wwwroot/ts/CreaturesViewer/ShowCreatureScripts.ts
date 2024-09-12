declare const creature: any;
window.addEventListener("load", function () {
    $('#info').append(creature.otherInfo);
    addSkillsToCreature();
}, false);

function addSkillsToCreature() {
    let divElement: HTMLElement = document.getElementById("skills");

    let skills: string[] = (creature.skills as string).split("@");

    for (var i = 0; i < skills.length; i++) {
        var elementToAdd: HTMLElement = $('<div>').append(skills[i])[0];
        divElement.appendChild(elementToAdd);    
    }
}