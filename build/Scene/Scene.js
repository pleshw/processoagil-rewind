import { SceneScaffold } from "./SceneScaffold";
export class Scene {
    constructor(_id, _components, _scaffold) {
        this.scaffold = _scaffold || new SceneScaffold(_id, { x: 0, y: 0 }, { w: window.innerWidth, h: window.innerHeight });
        this.components = _components;
        this.id = _id;
    }
    render(renderOrder) {
        for (const component of this.components) {
            this.scaffold.add(component);
        }
        this.scaffold.render(renderOrder || ComponentAnimationRenderOrder.Sync);
    }
}
