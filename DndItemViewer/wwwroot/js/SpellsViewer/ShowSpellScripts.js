window.addEventListener("load", function () {
    showDescription();
}, false);
function showDescription() {
    $('#descriptionForSpell').append(getDescription(spell.description));
}
function getDescription(description) {
    description = description.replaceAll("@@li@@", "<li>");
    description = description.replaceAll("@@/li@@", "</li>");
    description = description.replaceAll("@@ul@@", "<ul>");
    description = description.replaceAll("@@/ul@@", "</ul>");
    description = description.replaceAll("@@b@@", "<b>");
    description = description.replaceAll("@@/b@@", "</b>");
    description = description.replaceAll("@@i@@", "<i>");
    description = description.replaceAll("@@/i@@", "</i>");
    description = description.replaceAll("@@br@@", "<br>");
    console.log(description);
    description = getTablesFromDescription(description);
    let index = description.indexOf("@@/div@@");
    description = replaceAtFunc(description, "@@/div@@", index, "");
    return description;
}
function getTablesFromDescription(description) {
    while (description.indexOf("@@table@@") != -1) {
        let index = 0;
        let next = 0;
        while (description.indexOf("@@title@@") != -1) {
            index = description.indexOf("@@title@@");
            description = replaceAtFunc(description, "@@title@@", index, "<h3>");
            index = description.indexOf("@@/div@@", index);
            description = replaceAtFunc(description, "@@/div@@", index, "</h3>");
        }
        index = description.indexOf("@@table@@");
        description = replaceAtFunc(description, "@@table@@", index, '<table class="table table-bordered table-striped">');
        while (true) {
            index = description.indexOf("@@thr@@", index);
            description = replaceAtFunc(description, "@@thr@@", index, "<tr>");
            while (true) {
                index = description.indexOf("@@div@@", index);
                description = replaceAtFunc(description, "@@div@@", index, "<th>");
                index = description.indexOf("@@/div@@", index);
                description = replaceAtFunc(description, "@@/div@@", index, "</th>");
                next = description.indexOf("@@", index);
                if (description[next + 2] == '/') {
                    index = description.indexOf("@@/div@@", index);
                    description = replaceAtFunc(description, "@@/div@@", index, "</tr>");
                    break;
                }
            }
            while (true) {
                index = description.indexOf("@@tdr@@", index);
                description = replaceAtFunc(description, "@@tdr@@", index, "<tr>");
                next = 0;
                while (true) {
                    index = description.indexOf("@@div@@", index);
                    description = replaceAtFunc(description, "@@div@@", index, "<td>");
                    index = description.indexOf("@@/div@@", index);
                    description = replaceAtFunc(description, "@@/div@@", index, "</td>");
                    next = description.indexOf("@@", index);
                    if (description[next + 2] == '/') {
                        index = description.indexOf("@@/div@@", index);
                        description = replaceAtFunc(description, "@@/div@@", index, "</tr>");
                        break;
                    }
                }
                next = description.indexOf("@@", index);
                if (description[next + 2] == '/' || description.substring(next, next + 7).includes("thr")) {
                    break;
                }
            }
            next = description.indexOf("@@", index);
            if (description[next + 2] == '/') {
                index = description.indexOf("@@/div@@", index);
                description = replaceAtFunc(description, "@@/div@@", index, "</table>");
                break;
            }
        }
    }
    return description;
}
//@@table @@
//@@thr @@
//@@div @@Knowledge @@/div@@
//@@div @@Save Mod @@/div@@
//@@/div@@
//@@tdr @@
//@@div @@Secondhand(you have heard of the target) @@/div@@
//@@div @@+5@@/div@@
//@@/div@@
//@@tdr @@
//@@div @@Firsthand(you have met the target) @@/div@@
//@@div @@0@@/div@@
//@@/div@@
//@@tdr @@
//@@div @@Familiar(you know the target well) @@/div@@
//@@div @@-5@@/div@@
//@@/div@@
//@@tdr @@
//@@div @@@@/div@@
//@@div @@@@/div@@
//@@/div@@
//@@thr @@
//@@div @@Connection @@/div@@
//@@div @@Save Mod @@/div@@
//@@/div@@
//@@tdr @@
//@@div @@Likeness or picture @@/div@@
//@@div @@-2@@/div@@
//@@/div@@
//@@tdr @@
//@@div @@Possession or garment @@/div@@
//@@div @@-4@@/div@@
//@@/div@@
//@@tdr @@
//@@div @@Body part, lock of hair, bit of nail, or the like @@/div@@
//@@div @@-10@@/div@@
//@@/div@@
//@@/div@@On a successful save, the target isn't affected, and you can't use this spell against it again for 24 hours.@@br @@
//# sourceMappingURL=ShowSpellScripts.js.map