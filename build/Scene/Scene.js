import { ComponentAnimationRenderOrder } from '../types.js';
import { capitalizeFirstLetter } from '../utils.js';
export class Scene {
    constructor(_scaffold, _components) {
        this.scaffold = _scaffold;
        this.id = `scene${Scene.idCount++}`;
        this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter(this.id);
        this.components = _components || [];
    }
    render(renderOrder) {
        for (const component of this.components) {
            this.scaffold.add(component);
        }
        this.scaffold.render(renderOrder || ComponentAnimationRenderOrder.Sync);
    }
}
Scene.idCount = 0;
