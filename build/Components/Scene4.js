import { Scene } from '../Scene/Scene.js';
export class Scene4 extends Scene {
    constructor(scaffold, numMovimentados) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.numMovimentados = numMovimentados;
    }
    render() {
        if (!this.usuarioJaViu) {
            document.getElementById('numProcessosMovimentados').innerHTML = this.numMovimentados.toString();
            setTimeout(() => {
                document.getElementById('numProcessosMovimentados').classList.add('spotlight2');
                document.getElementById('numProcessosMovimentados').setAttribute('data-text', this.numMovimentados.toString());
                document.getElementById('numProcessosMovimentados').style.left = '5vw';
                document.getElementById('numProcessosMovimentados').style.opacity = '1';
                document.getElementById('numProcessosMovimentados').style.transform = 'scale(1.1)';
                fitText(document.getElementById('numProcessosMovimentados'), 0.3);
            }, 2300);
        }
        this.usuarioJaViu = true;
    }
    hide() {
    }
}
