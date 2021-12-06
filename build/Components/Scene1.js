import { Scene } from '../Scene/Scene.js';
export class Scene1 extends Scene {
    constructor(scaffold, numOcorrencias) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.logo = document.getElementById('logoScene1');
        this.introText1 = document.getElementById('introText1');
        this.introText2 = document.getElementById('introText2');
        this.introText = document.getElementById('introText');
        this.verMaisButton = document.getElementById('verMaisButton');
        this.movCounterContainer = document.getElementById('numMovContainer');
        this.movCounterText = document.getElementById('numMovimentacoesScene1Text');
        this.movCounter = document.getElementById('numMovimentacoesScene1');
        this.sceneControls = document.getElementById('sceneControllers');
        this.numOcorrencias = {
            ocorrencias: 0
        };
        this.numOcorrencias.ocorrencias = numOcorrencias;
    }
    render() {
        if (!this.usuarioJaViu)
            this.animateIntroText();
        this.usuarioJaViu = true;
    }
    animateIntroText() {
        let timeline = anime.timeline({
            easing: 'easeOutExpo',
        });
        timeline
            .add({
            targets: this.introText1,
            opacity: {
                value: 1,
                duration: 300,
                easing: 'linear'
            },
        }).add({
            targets: this.introText1,
            opacity: {
                value: 0,
                duration: 300,
                easing: 'linear'
            },
        }, "+=3500")
            .add({
            targets: this.introText2,
            opacity: {
                value: 1,
                duration: 300,
                easing: 'linear'
            },
        }, "+=1000")
            .add({
            targets: this.introText2,
            opacity: {
                value: 0,
                duration: 300,
                easing: 'linear'
            },
        }, "+=3500")
            .add({
            targets: this.introText,
            opacity: {
                value: 1,
                duration: 100,
                easing: 'linear'
            },
            complete: () => {
                this.animateControls();
                this.animateLogo();
                this.animateOcorrencias();
                this.animateVerMais();
            }
        }, "+=1000");
    }
    animateOcorrencias() {
        let timeline = anime.timeline({
            easing: 'easeOutExpo',
        });
        anime({
            targets: this.movCounterText,
            delay: 500,
            opacity: {
                value: 1,
                duration: 300,
                easing: 'linear'
            },
            translateY: {
                value: -130,
                duration: 400,
                easing: 'linear'
            }
        });
        timeline
            .add({
            targets: this.movCounterContainer,
            delay: 1000,
            opacity: {
                value: 1,
                duration: 300,
                easing: 'linear'
            },
            translateY: {
                value: -150,
                duration: 400,
                easing: 'linear'
            }
        })
            .add({
            targets: this.numOcorrencias,
            ocorrencias: 100000,
            round: 1,
            duration: 7000,
            update: () => {
                this.movCounter.innerHTML = this.numOcorrencias.ocorrencias.toString();
                this.movCounter.style.scale = `${this.numOcorrencias.ocorrencias / 1000}px`;
            }
        });
    }
    animateVerMais() {
        anime({
            targets: this.verMaisButton,
            delay: 2500,
            translateY: {
                value: -250,
                duration: 300,
                easing: 'linear'
            },
            opacity: {
                value: 1,
                duration: 500,
                easing: 'linear'
            }
        });
    }
    animateLogo() {
        anime({
            targets: this.logo,
            delay: 1500,
            translateY: {
                value: -50,
                duration: 300,
                easing: 'linear'
            },
            opacity: {
                value: 1,
                duration: 500,
                easing: 'linear'
            }
        });
    }
    animateControls() {
        anime({
            targets: this.sceneControls,
            delay: 800,
            translateX: {
                value: '-7vw',
                duration: 300,
                easing: 'linear'
            }
        });
    }
    hide() {
    }
}
