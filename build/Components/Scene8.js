import { Scene } from '../Scene/Scene.js';
export class Scene8 extends Scene {
    constructor(scaffold) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.clientesVipContainer = document.getElementById('clientesVipContainer');
    }
    render() {
        if (!this.usuarioJaViu)
            this.animateSpotlight();
        this.usuarioJaViu = true;
    }
    animateSpotlight() {
    }
    hide() {
    }
}
