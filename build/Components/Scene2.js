import { Scene } from '../Scene/Scene.js';
export class Scene2 extends Scene {
    constructor(scaffold) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.divQtdPublicacoes = document.getElementById('qtdPublicacoes');
        this.divQtdAndamentos = document.getElementById('qtdAndamentos');
        this.divQtdExpedientes = document.getElementById('qtdExpedientes');
    }
    render() {
        if (!this.usuarioJaViu)
            this.animatePodio();
        this.usuarioJaViu = true;
    }
    animatePodio() {
        let timeline = anime.timeline({
            easing: 'easeOutExpo',
        });
        timeline
            .add({
            targets: this.divQtdPublicacoes,
            translateX: [
                { value: 800, duration: 1000, delay: 500 },
                { value: 0, duration: 1000, delay: 500 }
            ],
            width: [
                { value: 48, duration: 3000, delay: 500 },
                { value: '35vw', duration: 500, delay: 0 }
            ],
            height: [
                { value: 48, duration: 3000, delay: 500 },
                { value: '23%', duration: 500, delay: 0 }
            ],
            borderRadius: [
                { value: '50%', duration: 2000, delay: 500 },
                { value: '9px', duration: 500, delay: 0 },
            ],
            translateY: [
                { value: 900, duration: 500 },
                { value: 0, duration: 500, delay: 1000 }
            ],
            scaleX: [
                { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 },
                { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 }
            ],
            scaleY: [
                { value: [1.75, 1], duration: 500 },
                { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 },
                { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 }
            ],
            opacity: [{ value: 1, duration: 300, easing: 'linear' }],
            easing: 'easeOutElastic(1, .8)',
            begin: () => {
                this.scaffold.element.style.backgroundColor = '#212529';
            },
            complete: () => {
                this.divQtdPublicacoes.style.color = 'white';
            }
        })
            .add({
            targets: this.divQtdAndamentos,
            translateX: [
                { value: -800, duration: 1000, delay: 500 },
                { value: 0, duration: 1000, delay: 500 }
            ],
            width: [
                { value: 48, duration: 3000, delay: 500 },
                { value: '35vw', duration: 500, delay: 0 }
            ],
            height: [
                { value: 48, duration: 3000, delay: 500 },
                { value: '23%', duration: 500, delay: 0 }
            ],
            borderRadius: [
                { value: '50%', duration: 2000, delay: 500 },
                { value: '9px', duration: 500, delay: 0 },
            ],
            translateY: [
                { value: 900, duration: 500 },
                { value: 40, duration: 500, delay: 1000 },
                { value: 0, duration: 500, delay: 1000 }
            ],
            scaleX: [
                { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 },
                { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 }
            ],
            scaleY: [
                { value: [1, 1], duration: 500 },
                { value: 1, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 },
                { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 }
            ],
            opacity: [{ value: 1, duration: 300, easing: 'linear' }],
            easing: 'easeOutElastic(1, .8)',
            begin: () => {
                this.scaffold.element.style.backgroundColor = '#dc3545';
            },
            complete: () => {
                this.divQtdAndamentos.style.color = 'white';
            }
        })
            .add({
            targets: this.divQtdExpedientes,
            translateX: [
                { value: 800, duration: 1000, delay: 500 },
                { value: 0, duration: 1000, delay: 500 }
            ],
            width: [
                { value: 48, duration: 3000, delay: 500 },
                { value: '35vw', duration: 500, delay: 0 }
            ],
            height: [
                { value: 48, duration: 3000, delay: 500 },
                { value: '23%', duration: 500, delay: 0 }
            ],
            borderRadius: [
                { value: '50%', duration: 2000, delay: 500 },
                { value: '9px', duration: 500, delay: 0 },
            ],
            translateY: [
                { value: 900, duration: 500 },
                { value: 40, duration: 500, delay: 1000 },
                { value: 0, duration: 500, delay: 1000 }
            ],
            scaleX: [
                { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 },
                { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
                { value: 1, duration: 900 }
            ],
            scaleY: [
                { value: [1, 1], duration: 500 },
                { value: 1, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 },
                { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
                { value: 1, duration: 450 }
            ],
            opacity: [{ value: 1, duration: 300, easing: 'linear' }],
            easing: 'easeOutElastic(1, .8)',
            begin: () => {
                this.scaffold.element.style.backgroundColor = '#0d6efd';
            },
            complete: () => {
                this.divQtdExpedientes.style.color = 'white';
                this.scaffold.element.style.backgroundColor = '#ffc107';
            }
        });
    }
    hide() {
    }
}
