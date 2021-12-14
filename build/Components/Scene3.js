import { Scene } from '../Scene/Scene.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';
export class Scene3 extends Scene {
    constructor(scaffold, timeSaved) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.imgComoAproveitar = document.querySelectorAll('#estimativasTempo > .card');
        this.sceneTitle = document.getElementById('tituloAberturaTempoEconomizado');
        this.timeContainer = document.getElementById('tempoEconomizadoValores');
        this.titleContainer = document.getElementById('containerAberturaTempoEconomizado');
        this.buttonTheme = document.getElementById('mudarTemaTempo');
        this.fraseTempoEconomizado = document.getElementById('fraseTempoEconomizado');
        this.backgroundScene = document.getElementById('bgScene3');
        this.anosEconomizados = document.getElementById('anosEconomizados');
        this.mesesEconomizados = document.getElementById('mesesEconomizados');
        this.diasEconomizados = document.getElementById('diasEconomizados');
        this.horasEconomizados = document.getElementById('horasEconomizados');
        this.minutosEconomizados = document.getElementById('minutosEconomizados');
        this.segundosEconomizados = document.getElementById('segundosEconomizados');
        this.comoAproveitarTempo = document.getElementById('comoAproveitarTempo');
        this.customerTime = {
            saved: 0
        };
        this.timeSaved = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        this.themeIndex = 0;
        this.themes = [
            {
                id: 'tempoEconomizadoValores',
                name: 'main',
                background: 'bg-dark',
                phrase: 'quanto tempo você economizou por usar nosso sistema este ano.',
                button: 'btn-outline-light',
                textColor: 'text-light'
            },
            {
                id: 'tempoEconomizadoFutebol',
                name: 'futebol',
                background: 'bg-futebol',
                phrase: 'quantas partidas de futebol você conseguiria jogar no tempo que economizou com a Processo Ágil.',
                button: 'btn-outline-light',
                textColor: 'text-light'
            },
            {
                id: 'tempoEconomizadoMusica',
                name: 'musicas',
                background: 'bg-musica',
                phrase: 'quantas musicas você poderia ouvir com o tempo que foi economizado na nossa plataforma.',
                button: 'btn-outline-dark',
                textColor: 'text-dark'
            },
            {
                id: 'tempoEconomizadoFilme',
                name: 'filme',
                background: 'bg-filme',
                phrase: 'quantas vezes você conseguiria assistir Matrix no tempo que economizou com a gente.',
                button: 'btn-outline-success',
                textColor: 'text-success'
            },
        ];
        this.timeSavedInMs = timeSaved;
        this.fraseTempoEconomizado.innerHTML = this.themes[0].phrase;
        this.buttonTheme.addEventListener('click', () => { this.changeToNextTheme(); });
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
            targets: this.sceneTitle,
            translateX: '20vw',
            opacity: {
                value: 1,
                duration: 5000
            },
            duration: 2000,
            easing: 'easeOutExpo',
        });
        anime({
            targets: this.customerTime,
            saved: this.timeSavedInMs,
            round: 1,
            delay: 500,
            duration: 10000,
            easing: 'easeInOutExpo',
            complete: () => {
            },
            update: () => {
                const strDateSplitted = new Date(this.customerTime.saved)
                    .toISOString()
                    .substr(0, 19)
                    .replaceAll('T', ':')
                    .replaceAll('-', ':')
                    .split(':');
                this.timeSaved = {
                    days: millisecondsToDays(this.customerTime.saved),
                    hours: millisecondsToHours(this.customerTime.saved),
                    minutes: millisecondsToMinutes(this.customerTime.saved),
                    seconds: this.customerTime.saved / 1000
                };
                document.getElementById('tempoEconomizado').style.width = '35em';
                document.getElementById('tempoParaFilme').innerHTML = Math.round(this.timeSaved.minutes / 150).toString();
                document.getElementById('tempoParaMusica').innerHTML = Math.round(this.timeSaved.minutes / 3).toString();
                document.getElementById('tempoParaFutebol').innerHTML = Math.round(this.timeSaved.minutes / 90).toString();
                const anos = +strDateSplitted[0] - 1970;
                const meses = +strDateSplitted[1] - 1;
                const dias = +strDateSplitted[2] - 1;
                const horas = +strDateSplitted[3];
                const minutos = +strDateSplitted[4];
                const segundos = +strDateSplitted[5];
                const textoAnos = anos > 0 ? `<div class='campo-relogio'><span>${zeroBefore(anos)} Ano${(anos > 1) ? 's' : ''}</span></div>` : '';
                const textoMeses = textoAnos || meses > 0 ? `<div class='campo-relogio'><span>${zeroBefore(meses)} Mes${(meses > 1) ? 'es' : ''}</span></div>` : '';
                const textoDias = textoMeses || dias > 0 ? `<div class='campo-relogio'><span>${zeroBefore(dias)} Dia${(dias > 1) ? 's' : ''}</span></div>` : '';
                const textoHoras = textoDias || horas > 0 ? `<div class='campo-relogio'><span>${zeroBefore(horas)}h</span></div>` : '';
                const textoMinutos = textoHoras || minutos > 0 ? `<div class='campo-relogio'><span>${zeroBefore(minutos)}m</span></div>` : '';
                const textoSegundos = textoMinutos || segundos > 0 ? `<div class='campo-relogio'><span>${zeroBefore(segundos)}s</span></div>` : '';
                if (textoAnos) {
                    this.anosEconomizados.style.display = 'flex';
                    this.anosEconomizados.innerHTML = `${textoAnos}`;
                }
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
    removeBackgrounds() {
        this.buttonTheme.classList.remove(...['btn-outline-dark', 'btn-outline-light', 'btn-outline-success']);
        this.backgroundScene.classList.remove(...['bg-dark', 'bg-futebol', 'bg-musica', 'bg-filme']);
        this.titleContainer.classList.remove(...['text-light', 'text-dark', 'text-light', 'text-success']);
    }
    hideEstimativas() {
        ['tempoEconomizadoValores', 'tempoEconomizadoFutebol', 'tempoEconomizadoMusica', 'tempoEconomizadoFilme']
            .forEach(i => {
            const el = document.getElementById(i);
            el.style.opacity = '0';
            el.querySelector('h1').style.display = 'none';
        });
    }
    mudarEstilos() {
        ['tempoEconomizadoValores', 'tempoEconomizadoFutebol', 'tempoEconomizadoMusica', 'tempoEconomizadoFilme', 'tempoEconomizadoPudim']
            .forEach(i => {
            const el = document.getElementById(i);
            el.style.opacity = '0';
            el.querySelector('h1').style.display = 'none';
        });
    }
    changeToTheme(index) {
        if (index > this.themes.length - 1)
            return this.changeToTheme(0);
        if (index < 0)
            return this.changeToTheme(0);
        this.hideEstimativas();
        this.themeIndex = index;
        this.fraseTempoEconomizado.innerHTML = this.themes[this.themeIndex].phrase;
        const elTexto = document.getElementById(this.themes[this.themeIndex].id);
        elTexto.style.opacity = '1';
        elTexto.querySelector('h1').style.display = 'flex';
        this.backgroundScene.classList.add(this.themes[this.themeIndex].background);
        this.titleContainer.classList.add(this.themes[this.themeIndex].textColor);
        this.buttonTheme.classList.add(this.themes[this.themeIndex].button);
    }
    changeToNextTheme() {
        this.removeBackgrounds();
        this.changeToTheme(++this.themeIndex);
    }
    hide() {
    }
}
