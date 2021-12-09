import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';

declare const anime: any;
declare const fitText: any;

export class Scene3 extends Scene {
  usuarioJaViu: boolean = false;

  imgComoAproveitar: NodeListOf<HTMLElement> = document.querySelectorAll( '#estimativasTempo > .card' )!;

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

  constructor( scaffold: SceneScaffold, timeSaved: number ) {
    super( scaffold );
    this.timeSavedInMs = timeSaved;

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
      targets: this.customerTime,
      saved: this.timeSavedInMs,
      round: 1,
      delay: 1500,
      duration: 20000,
      easing: 'easeInOutExpo',
      begin: () => {

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

        document.getElementById( 'tempoParaDiasTrabalho' )!.innerHTML = Math.round( this.timeSaved.hours / 500 ).toString();
        document.getElementById( 'tempoParaFilme' )!.innerHTML = Math.round( this.timeSaved.hours / 2 ).toString();
        document.getElementById( 'tempoParaMusica' )!.innerHTML = Math.round( this.timeSaved.minutes / 3 ).toString();
        document.getElementById( 'tempoParaFutebol' )!.innerHTML = Math.round( this.timeSaved.minutes / 90 ).toString();

        const anos = +strDateSplitted[0] - 1970;
        const meses = +strDateSplitted[1] - 1;
        const dias = +strDateSplitted[2] - 1;
        const horas = +strDateSplitted[3];
        const minutos = +strDateSplitted[4];
        const segundos = +strDateSplitted[5];

        const textoAnos = anos > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( anos ) }</span> <span class="medida-tempo">Anos</span></div>` : '';
        const textoMeses = textoAnos || meses > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( meses ) }</span> <span class="medida-tempo">Meses</span></div>` : '';
        const textoDias = textoMeses || dias > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( dias ) }</span> <span class="medida-tempo">Dias</span></div>` : '';
        const textoHoras = textoDias || horas > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( horas ) }</span> <span class="medida-tempo">Horas</span></div>` : '';
        const textoMinutos = textoHoras || minutos > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( minutos ) }</span> <span class="medida-tempo">Minutos</span></div>` : '';
        const textoSegundos = textoMinutos || segundos > 0 ? `<div class='campo-relogio'><span>${ zeroBefore( segundos ) }</span> <span class="medida-tempo">Segundos</span></div>` : '';
        fitText( document.getElementById( 'tempoEconomizadoValores' )!, 1 );

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


  animateJanelaEstimativas() {
    anime( {
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
    } );
  }

  dropImage() {
    anime( {
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
    } );
  }


  hide(): void {

  }

}