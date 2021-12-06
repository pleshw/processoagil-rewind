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
        anime({
            targets: '.cliente-vip',
            translateX: 240,
            opacity: {
                value: 1,
                duration: 300,
                easing: 'linear'
            },
            easing: 'easeOutExpo',
            delay: anime.stagger(300, { start: 500, from: 'last' }) // increase delay by 100ms for each elements.
        });
    }
    hide() {
    }
}
