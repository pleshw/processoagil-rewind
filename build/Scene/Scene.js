import { capitalizeFirstLetter, smoothScrollTo, throttle } from '../utils.js';
import { SceneView } from './SceneView.js';
export class Scene {
    constructor(_scaffold) {
        this.components = [];
        this.animationCallback = null;
        this.content = null;
        this.scaffold = _scaffold;
        this.id = `scene${Scene.idCount++}`;
        this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter(this.id);
        this.content = this.scaffold.element.querySelector('.content');
    }
    showIntro() {
        if (!this.animationCallback)
            return;
        this.animationCallback();
    }
    showContent() {
        throttle(() => {
            clearInterval(Scene.currScrollInterval);
            if (this.content) {
                this.content.classList.add('show');
            }
            Scene.currScrollInterval = smoothScrollTo(this.scaffold.element.offsetTop);
            SceneView.updateControllers();
        }, 1000, 'scrollToSceneThrottle');
        return this;
    }
    hideContent() {
        if (this.content) {
            this.content.classList.remove('show');
        }
        return this;
    }
    showEnding() {
        if (!this.animationCallback)
            return;
        this.animationCallback();
    }
}
Scene.idCount = 0;
Scene.currScrollInterval = 0;
