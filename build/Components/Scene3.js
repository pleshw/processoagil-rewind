import { Scene } from '../Scene/Scene.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';
export class Scene3 extends Scene {
    constructor(scaffold, timeSaved) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.mesesEconomizados = document.getElementById('mesesEconomizados');
        this.diasEconomizados = document.getElementById('diasEconomizados');
        this.horasEconomizados = document.getElementById('horasEconomizados');
        this.minutosEconomizados = document.getElementById('minutosEconomizados');
        this.segundosEconomizados = document.getElementById('segundosEconomizados');
        this.comoAproveitarTempo = document.getElementById('comoAproveitarTempo');
        this.customerTime = {
            saved: 0
        };
        this.timeSavedInMs = timeSaved;
        this.timeSaved = {
            days: millisecondsToDays(timeSaved),
            hours: millisecondsToHours(timeSaved),
            minutes: millisecondsToMinutes(timeSaved),
            seconds: timeSaved / 1000
        };
    }
    render() {
        if (!this.usuarioJaViu)
            this.animateIntroText();
        this.usuarioJaViu = true;
    }
    animateIntroText() {
        this.animateTime();
    }
    animateTime() {
        anime({
            targets: this.customerTime,
            saved: this.timeSavedInMs,
            round: 1,
            delay: 1000,
            duration: 2000,
            easing: 'easeInOutExpo',
            complete: () => {
                document.getElementById('tempoEconomizado').style.width = '35em';
                document.getElementById('introTextContainerScene3').style.left = '0';
                document.getElementById('tempoParaDiasTrabalho').innerHTML = Math.round(this.timeSaved.hours / 8).toString();
                document.getElementById('tempoParaFilme').innerHTML = Math.round(this.timeSaved.hours / 2).toString();
                document.getElementById('tempoParaMusica').innerHTML = Math.round(this.timeSaved.minutes / 3).toString();
                document.getElementById('tempoParaFutebol').innerHTML = Math.round(this.timeSaved.minutes / 90).toString();
            },
            update: () => {
                const strDateSplitted = new Date(this.customerTime.saved)
                    .toISOString()
                    .substr(5, 14)
                    .replace('T', ':')
                    .replace('-', ':')
                    .split(':');
                const meses = +strDateSplitted[0] - 1;
                const dias = +strDateSplitted[1] - 1;
                const horas = +strDateSplitted[2];
                const minutos = +strDateSplitted[3];
                const segundos = +strDateSplitted[4];
                const textoMeses = meses > 0 ? `${zeroBefore(meses)} mes` : '';
                const textoDias = textoMeses || dias > 0 ? `${zeroBefore(dias)} dia` : '';
                const textoHoras = textoDias || horas > 0 ? `${zeroBefore(horas)} hora` : '';
                const textoMinutos = textoHoras || minutos > 0 ? `${zeroBefore(minutos)} minuto` : '';
                const textoSegundos = textoMinutos || segundos > 0 ? `${zeroBefore(segundos)} segundo` : '';
                if (textoMeses) {
                    this.mesesEconomizados.style.display = 'flex';
                    this.mesesEconomizados.innerHTML = `${textoMeses}`;
                }
                if (textoDias) {
                    this.diasEconomizados.style.display = 'flex';
                    this.diasEconomizados.innerHTML = `${textoDias}`;
                }
                if (textoHoras) {
                    this.horasEconomizados.style.display = 'flex';
                    this.horasEconomizados.innerHTML = `${textoHoras}`;
                }
                if (textoMinutos) {
                    this.minutosEconomizados.style.display = 'flex';
                    this.minutosEconomizados.innerHTML = `${textoMinutos}`;
                }
                if (textoSegundos) {
                    this.segundosEconomizados.style.display = 'flex';
                    this.segundosEconomizados.innerHTML = `${textoSegundos}`;
                }
            }
        });
    }
    animateJanelaEstimativas() {
        anime({
            targets: this.comoAproveitarTempo,
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
    hide() {
    }
}
