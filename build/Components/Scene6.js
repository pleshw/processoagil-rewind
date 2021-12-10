import { Scene } from '../Scene/Scene.js';
export class Scene6 extends Scene {
    constructor(scaffold, processosPorEstado) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.processosPorEstado = [];
        this.processosPorEstado = processosPorEstado;
    }
    render() {
        if (!this.usuarioJaViu) {
            loadBrasil();
        }
        this.usuarioJaViu = true;
    }
    hide() {
    }
}
