export default class KeybindModule {
    constructor(inputModule, keybindings) {
        this.player = null;
        this.inputModule = inputModule;
        this.keybindings = keybindings;
    }
    setPlayer(player) {
        this.player = player;
    }
    perform() {
        if (this.player == null)
            throw Error('Must be registered to player');
        this.inputModule.getActiveKeys().forEach((key) => {
            if (this.player == null)
                throw Error('Must be registered to player');
            const action = this.keybindings.get(key);
            if (action == undefined)
                return;
            console.log(`[KeybindModule#perform] '${key}'`);
            action.perform(this.player.getTransform().position);
        });
    }
}
