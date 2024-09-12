

class LootGenerator {
    public getLoot(button: HTMLButtonElement, dataWithLoot:any): void {
        let buttonIdAsParams: string[] = button.id.replace("getLootButton", "").split("on");

        let creatureId: number = (buttonIdAsParams[0] as unknown) as number;
        let creatureLiId: number = (buttonIdAsParams[1] as unknown) as number;

        setCookie(ACTIVE_CREATURE_COOKIE_NAME, creatureLiId);

        location.href = `/LootGenerator/GetLoot?creatureId=${creatureId}&liElementId=${creatureLiId}`;
    }
}