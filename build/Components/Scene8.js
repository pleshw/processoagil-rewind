import { Scene } from '../Scene/Scene.js';
export class Scene8 extends Scene {
    constructor(scaffold) {
        super(scaffold);
        this.usuarioJaViu = false;
    }
    render() {
        if (!this.usuarioJaViu)
            this.animateSpotlight();
        this.usuarioJaViu = true;
    }
    animateSpotlight() {
        setTimeout(() => {
            document.querySelector('.spotlight').style.display = 'flex';
        }, 1000);
    }
    hide() {
    }
}
