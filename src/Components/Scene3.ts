import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';

declare const anime: any;

export class Scene3 extends Scene {
  usuarioJaViu: boolean = false;

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

  timeSaved: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

  constructor( scaffold: SceneScaffold, timeSaved: number ) {
    super( scaffold );
    this.timeSavedInMs = timeSaved;
    this.timeSaved = {
      days: millisecondsToDays( timeSaved ),
      hours: millisecondsToHours( timeSaved ),
      minutes: millisecondsToMinutes( timeSaved ),
      seconds: timeSaved / 1000
    };
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
      duration: 10000,
      easing: 'easeInOutExpo',
      begin: () => {
        document.getElementById( 'tempoEconomizado' )!.style.width = '35em';
        document.getElementById( 'introTextContainerScene3' )!.style.left = '0';

        document.getElementById( 'tempoParaDiasTrabalho' )!.innerHTML = Math.round( this.timeSaved.hours / 500 ).toString();
        document.getElementById( 'tempoParaFilme' )!.innerHTML = Math.round( this.timeSaved.hours / 2 ).toString();
        document.getElementById( 'tempoParaMusica' )!.innerHTML = Math.round( this.timeSaved.minutes / 3 ).toString();
        document.getElementById( 'tempoParaFutebol' )!.innerHTML = Math.round( this.timeSaved.minutes / 90 ).toString();
      },
      update: () => {
        const strDateSplitted = new Date( this.customerTime.saved )
          .toISOString()
          .substr( 0, 19 )
          .replaceAll( 'T', ':' )
          .replaceAll( '-', ':' )
          .split( ':' );

        const anos = +strDateSplitted[0] - 1970;
        const meses = +strDateSplitted[1] - 1;
        const dias = +strDateSplitted[2] - 1;
        const horas = +strDateSplitted[3];
        const minutos = +strDateSplitted[4];
        const segundos = +strDateSplitted[5];

        const textoAnos = meses > 0 ? `Anos: ${ zeroBefore( anos ) }` : '';
        const textoMeses = textoAnos || meses > 0 ? `Meses: ${ zeroBefore( meses ) }` : '';
        const textoDias = textoMeses || dias > 0 ? `Dias: ${ zeroBefore( dias ) }` : '';
        const textoHoras = textoDias || horas > 0 ? `Horas: ${ zeroBefore( horas ) }` : '';
        const textoMinutos = textoHoras || minutos > 0 ? `Minutos: ${ zeroBefore( minutos ) }` : '';
        const textoSegundos = textoMinutos || segundos > 0 ? `Segundos: ${ zeroBefore( segundos ) }` : '';


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



  hide(): void {

  }

}