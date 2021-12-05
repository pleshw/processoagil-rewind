import { capitalizeFirstLetter, smoothScrollTo, throttle } from '../utils.js';
import { SceneView } from './SceneView.js';
export class Scene {
    constructor(_scaffold) {
        this.components = [];
        this.scaffold = _scaffold;
        this.id = `scene${Scene.idCount++}`;
        this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter(this.id);
        this.intro = this.scaffold.element.querySelector('.intro');
        this.content = this.scaffold.element.querySelector('.content');
    }
    scroll() {
        throttle(() => {
            clearInterval(Scene.currScrollInterval);
            this.content.classList.add('show');
            Scene.currScrollInterval = smoothScrollTo(this.scaffold.element.offsetTop);
            SceneView.updateControllers();
        }, 100, 'scrollToSceneThrottle');
        return this;
    }
}
Scene.idCount = 0;
Scene.currScrollInterval = 0;
