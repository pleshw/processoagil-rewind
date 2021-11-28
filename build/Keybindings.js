class KeyCommand {
    constructor(keyName, command) {
        this.key = keyName;
        this._command = command;
        window.addEventListener('keydown', this.keypressCallback, false);
    }
    keypressCallback(evt) {
        return (evt.key === this.key) ? this._command.execute() : {};
    }
    set command(cmd) {
        this._command = cmd;
    }
}
export class Keybindings {
    static setKeymap(newMap) {
        this.keymap = newMap;
    }
    static setKey(key, command) {
        this.keymap.set(key, command);
    }
}
