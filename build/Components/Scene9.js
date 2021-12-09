import { Scene } from '../Scene/Scene.js';
export class Scene9 extends Scene {
    constructor(scaffold) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.clientesVip = document.querySelectorAll('.cliente-vip');
    }
    render() {
        if (!this.usuarioJaViu)
            this.animateRank();
        this.usuarioJaViu = true;
    }
    animateRank() {
        animateVortext();
        setTimeout(() => {
            setInterval(() => {
                animateVortext();
            }, 9500);
        }, 9500);
    }
    hide() {
    }
}
