class LootGenerator {
    getLoot(button, dataWithLoot) {
        let buttonIdAsParams = button.id.replace("getLootButton", "").split("on");
        let creatureId = buttonIdAsParams[0];
        let creatureLiId = buttonIdAsParams[1];
        setCookie(ACTIVE_CREATURE_COOKIE_NAME, creatureLiId);
        location.href = `/LootGenerator/GetLoot?creatureId=${creatureId}&liElementId=${creatureLiId}`;
    }
}
//# sourceMappingURL=LootGenerator.js.map