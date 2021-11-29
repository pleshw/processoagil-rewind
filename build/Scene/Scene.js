import { capitalizeFirstLetter } from '../utils.js';
export class Scene {
    constructor(_scaffold) {
        this.components = [];
        this.animationCallback = null;
        this.scaffold = _scaffold;
        this.id = `scene${Scene.idCount++}`;
        this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter(this.id);
    }
    render() {
        if (!this.animationCallback)
            return;
        this.animationCallback();
    }
}
Scene.idCount = 0;
