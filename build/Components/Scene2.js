import { Scene } from '../Scene/Scene.js';
export class Scene2 extends Scene {
    constructor(scaffold, numPublicacoes, numAndamentos, numExpedientes) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.predioPublicacoes = document.getElementById('predioPublicacoes');
        this.predioAndamentos = document.getElementById('predioAndamentos');
        this.predioExpedientes = document.getElementById('predioExpedientes');
        this.fotoFuncionario1 = document.getElementById('fotoFuncionario1');
        this.fotoFuncionario2 = document.getElementById('fotoFuncionario2');
        this.fotoFuncionario3 = document.getElementById('fotoFuncionario3');
        this.numPublicacoes = document.getElementById('numPublicacoes');
        this.numAndamentos = document.getElementById('numAndamentos');
        this.numExpedientes = document.getElementById('numExpedientes');
        this.divPredioPublicacoes = document.getElementById('divPredioPublicacoes');
        this.divPredioAndamentos = document.getElementById('divPredioAndamentos');
        this.divPredioExpedientes = document.getElementById('divPredioExpedientes');
        this.currentPubAndExp = {
            publicacoes: 0,
            andamentos: 0,
            expedientes: 0,
        };
        this.totalPubAndExp = {
            publicacoes: 0,
            andamentos: 0,
            expedientes: 0,
        };
        this.currentPubAndExp.publicacoes = numPublicacoes;
        this.currentPubAndExp.andamentos = numAndamentos;
        this.currentPubAndExp.expedientes = numExpedientes;
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
            targets: this.divPredioPublicacoes,
            delay: 4000,
            easing: 'easeInOutSine',
            duration: 3000,
            translateX: this.shakeAnimation(),
        })
            .add({
            targets: this.divPredioPublicacoes,
            height: {
                value: '19%',
                duration: 1900,
            }
        })
            .add({
            targets: this.fotoFuncionario3,
            opacity: {
                value: 1,
                duration: 100,
                easing: 'linear'
            },
            translateY: {
                value: 50,
                duration: 200,
                easing: 'linear'
            },
            begin: () => {
                anime({
                    targets: '.texto-funcionario3',
                    opacity: {
                        value: 1,
                        duration: 200,
                        easing: 'linear'
                    },
                    translateY: {
                        value: -50,
                        duration: 200,
                        easing: 'linear'
                    }
                });
            }
        })
            .add({
            targets: this.divPredioExpedientes,
            easing: 'easeInOutSine',
            duration: 3000,
            translateX: this.shakeAnimation(),
        })
            .add({
            targets: this.divPredioExpedientes,
            height: {
                value: '27%',
                duration: 2200,
            }
        }, "+=500")
            .add({
            targets: this.fotoFuncionario2,
            opacity: {
                value: 1,
                duration: 100,
                easing: 'linear'
            },
            translateY: {
                value: 50,
                duration: 400,
                easing: 'linear'
            },
            begin: () => {
                anime({
                    targets: '.texto-funcionario2',
                    opacity: {
                        value: 1,
                        duration: 200,
                        easing: 'linear'
                    },
                    translateY: {
                        value: -50,
                        duration: 200,
                        easing: 'linear'
                    }
                });
            }
        })
            .add({
            targets: this.divPredioAndamentos,
            easing: 'easeInOutSine',
            duration: 3000,
            translateX: this.shakeAnimation(),
        })
            .add({
            targets: this.divPredioAndamentos,
            delay: 500,
            height: {
                value: '34%',
                duration: 2200,
            }
        }, "+=900")
            .add({
            targets: this.fotoFuncionario1,
            opacity: {
                value: 1,
                duration: 300,
                easing: 'linear'
            },
            translateY: {
                value: 50,
                duration: 100,
                easing: 'linear'
            },
            begin: () => {
                anime({
                    targets: '.texto-funcionario1',
                    opacity: {
                        value: 1,
                        duration: 200,
                        easing: 'linear'
                    },
                    translateY: {
                        value: -50,
                        duration: 200,
                        easing: 'linear'
                    }
                });
            }
        });
    }
    hide() {
    }
    shakeAnimation() {
        const vMax = 5;
        return [
            { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 },
            {
                value: 0
            }
        ];
    }
}
