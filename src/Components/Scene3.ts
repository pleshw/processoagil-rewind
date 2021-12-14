import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';

declare const anime: any;

type t_theme = {
  id: string;
  name: string;
  background: string;
  phrase: string;
};

export class Scene3 extends Scene {
  usuarioJaViu: boolean = false;

  imgComoAproveitar: NodeListOf<HTMLElement> = document.querySelectorAll( '#estimativasTempo > .card' )!;

  sceneTitle: HTMLElement = document.getElementById( 'tituloAberturaTempoEconomizado' )!;
  timeContainer: HTMLElement = document.getElementById( 'tempoEconomizadoValores' )!;

  buttonTheme: HTMLElement = document.getElementById( 'mudarTemaTempo' )!;
  fraseTempoEconomizado: HTMLElement = document.getElementById( 'fraseTempoEconomizado' )!;

  anosEconomizados: HTMLElement = document.getElementById( 'anosEconomizados' )!;
  mesesEconomizados: HTMLElement = document.getElementById( 'mesesEconomizados' )!;
  diasEconomizados: HTMLElement = document.getElementById( 'diasEconomizados' )!;
  horasEconomizados: HTMLElement = document.getElementById( 'horasEconomizados' )!;
  minutosEconomizados: HTMLElement = document.getElementById( 'minutosEconomizados' )!;
  segundosEconomizados: HTMLElement = document.getElementById( 'segundosEconomizados' )!;

  comoAproveitarTempo: HTMLElement = document.getElementById( 'comoAproveitarTempo' )!;

  customerTime: { saved: number } = {
    saved: 0
  };

  timeSavedInMs: number;

  timeSaved = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  themeIndex = 0;

  themes: t_theme[] = [
    {
      id: 'tempoEconomizadoValores',
      name: 'main',
      background: 'bg-dark',
      phrase: 'quanto tempo você economizou por usar nosso sistema este ano.'
    },
    {
      id: 'tempoEconomizadoFutebol',
      name: 'futebol',
      background: 'bg-futebol',
      phrase: 'quantas partidas de futebol você conseguiria jogar nesse tempo.'
    },
    {
      id: 'tempoEconomizadoMusica',
      name: 'musicas',
      background: 'bg-musica',
      phrase: 'quantas musicas você poderia ouvir com o tempo que foi economizado.'
    },
    {
      id: 'tempoEconomizadoPudim',
      name: 'pudim',
      background: 'bg-pudim',
      phrase: 'quantos pudins você pôde cozinhar ao invés de procurar processos.'
    },
    {
      id: 'tempoEconomizadoFilme',
      name: 'filme',
      background: 'bg-filme',
      phrase: 'quantas vezes você conseguiria assistir Matrix nesse tempo.'
    },
  ];

  constructor( scaffold: SceneScaffold, timeSaved: number ) {
    super( scaffold );
    this.timeSavedInMs = timeSaved;
    this.fraseTempoEconomizado.innerHTML = this.themes[0].phrase;
    this.buttonTheme.addEventListener( 'click', () => { this.changeToNextTheme() } )
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animateIntroText();
    this.usuarioJaViu = true;
  }

  animateIntroText() {
    this.animateTime();
  }


  animateTime(): void {


    anime( {
      targets: this.sceneTitle,
      translateX: '20vw',
      opacity: {
        value: 1,
        duration: 5000
      },
      duration: 2000,
      easing: 'easeOutExpo',
    } )


    anime( {
      targets: this.customerTime,
      saved: this.timeSavedInMs,
      round: 1,
      delay: 500,
      duration: 10000,
      easing: 'easeInOutExpo',
      complete: () => {

      },
      update: () => {
        const strDateSplitted = new Date( this.customerTime.saved )
          .toISOString()
          .substr( 0, 19 )
          .replaceAll( 'T', ':' )
          .replaceAll( '-', ':' )
          .split( ':' );

        this.timeSaved = {
          days: millisecondsToDays( this.customerTime.saved ),
          hours: millisecondsToHours( this.customerTime.saved ),
          minutes: millisecondsToMinutes( this.customerTime.saved ),
          seconds: this.customerTime.saved / 1000
        };

        document.getElementById( 'tempoEconomizado' )!.style.width = '35em';
        document.getElementById( 'introTextContainerScene3' )!.style.left = '0';

        document.getElementById( 'tempoParaFilme' )!.innerHTML = Math.round( this.timeSaved.minutes / 150 ).toString();
        document.getElementById( 'tempoParaMusica' )!.innerHTML = Math.round( this.timeSaved.minutes / 3 ).toString();
        document.getElementById( 'tempoParaFutebol' )!.innerHTML = Math.round( this.timeSaved.minutes / 90 ).toString();
        document.getElementById( 'tempoParaPudim' )!.innerHTML = Math.round( this.timeSaved.minutes / 30 ).toString();

        const anos = +strDateSplitted[0] - 1970;
        const meses = +strDateSplitted[1] - 1;
        const dias = +strDateSplitted[2] - 1;
        const horas = +strDateSplitted[3];
        const minutos = +strDateSplitted[4];
        const segundos = +strDateSplitted[5];

        const textoAnos = anos > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( anos ) } Ano${ ( anos > 1 ) ? 's' : '' }</span></div>` : '';
        const textoMeses = textoAnos || meses > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( meses ) } Mes${ ( meses > 1 ) ? 'es' : '' }</span></div>` : '';
        const textoDias = textoMeses || dias > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( dias ) } Dia${ ( dias > 1 ) ? 's' : '' }</span></div>` : '';
        const textoHoras = textoDias || horas > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( horas ) }h</span></div>` : '';
        const textoMinutos = textoHoras || minutos > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( minutos ) }m</span></div>` : '';
        const textoSegundos = textoMinutos || segundos > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( segundos ) }s</span></div>` : '';

        if ( textoAnos ) {
          this.anosEconomizados.style.display = 'flex';
          this.anosEconomizados.innerHTML = `${ textoAnos }`;
        }

        if ( textoMeses ) {
          this.mesesEconomizados.style.display = 'flex';
          this.mesesEconomizados.innerHTML = `${ textoMeses }`;
        }

        if ( textoDias ) {
          this.diasEconomizados.style.display = 'flex';
          this.diasEconomizados.innerHTML = `${ textoDias }`;
        }

        if ( textoHoras ) {
          this.horasEconomizados.style.display = 'flex';
          this.horasEconomizados.innerHTML = `${ textoHoras }`;
        }

        if ( textoMinutos ) {
          this.minutosEconomizados.style.display = 'flex';
          this.minutosEconomizados.innerHTML = `${ textoMinutos }`;
        }

        if ( textoSegundos ) {
          this.segundosEconomizados.style.display = 'flex';
          this.segundosEconomizados.innerHTML = `${ textoSegundos }`;
        }
      }
    } );
  }

  hideEstimativas() {
    ['tempoEconomizadoValores', 'tempoEconomizadoFutebol', 'tempoEconomizadoMusica', 'tempoEconomizadoFilme', 'tempoEconomizadoPudim']
      .forEach( i => {
        const el = document.getElementById( i )!;
        el.style.opacity = '0';
        el.querySelector( 'h1' )!.style.display = 'none';
      } )
  }


  changeToTheme( index: number ): void {
    if ( index > this.themes.length - 1 ) return this.changeToTheme( 0 );
    if ( index < 0 ) return this.changeToTheme( 0 );
    this.hideEstimativas();

    this.themeIndex = index;
    this.fraseTempoEconomizado.innerHTML = this.themes[this.themeIndex].phrase;

    const elTexto = document.getElementById( this.themes[this.themeIndex].id )!;
    elTexto.style.opacity = '1';
    elTexto.querySelector( 'h1' )!.style.display = 'flex';
  }

  changeToNextTheme() {
    this.changeToTheme( ++this.themeIndex )
  }


  hide(): void {

  }

}