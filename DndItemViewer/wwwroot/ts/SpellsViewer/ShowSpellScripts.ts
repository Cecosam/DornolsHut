declare const spell: any;
window.addEventListener("load", function () {
    showDescription();
}, false);

function showDescription(): void {
    $('#descriptionForSpell').append(spell.description);
}
