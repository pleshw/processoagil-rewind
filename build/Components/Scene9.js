import { Scene } from '../Scene/Scene.js';
export class Scene9 extends Scene {
    constructor(scaffold, nomeClientes) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.clientesVip = document.querySelectorAll('.cliente-vip');
        document.getElementById('verRanking').addEventListener('click', () => {
            this.verRanking();
        });
        nomeClientes.slice(0, 5).forEach((customerName, i) => {
            document.querySelectorAll('.el-ranking')[i].innerHTML = `<h1 class="text-light text-truncate"><i>
      ${i + 1}º -  ${customerName.nome}</i></h1><h2> ${customerName.total} processos
      </h2>`;
        });
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
    verRanking() {
        document.getElementById('verRanking').style.display = 'none';
        anime({
            targets: document.getElementById('pen'),
            translateY: '-20vw',
            opacity: {
                value: 0,
                duration: 300
            },
            duration: 1000,
            easing: 'easeOutExpo',
        });
        anime({
            targets: '.el-ranking',
            translateX: '35%',
            opacity: {
                value: 1,
                duration: 100
            },
            easing: 'easeOutExpo',
            delay: anime.stagger(200),
            complete: () => {
                anime({
                    targets: '.el-ranking h2',
                    translateX: '5%',
                    opacity: {
                        value: 1,
                        duration: 100
                    },
                    easing: 'easeOutExpo',
                    delay: anime.stagger(200)
                });
            }
        });
    }
    hide() {
    }
}
