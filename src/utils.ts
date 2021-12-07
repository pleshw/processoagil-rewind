import { CSSAttributes } from './CSSAttributes.js';
import { CSSEditor } from './CSSEditor.js';

export function lerp( inicio: number, fim: number, qtd: number ): number {
  return ( 1 - qtd ) * inicio + qtd * fim;
}

export function inverseLerp( a: number, b: number, valor: number ): number {
  return ( valor - a ) / ( b - a );
}

export function remap( entradaMin: number, entradaMax: number, saidaMin: number, saidaMax: number, valor: number ): number {
  return lerp( saidaMin, saidaMax, inverseLerp( entradaMin, entradaMax, valor ) );
}

export function clamp( num: number = 0, min: number = 0, max: number = 100 ): number {
  return Math.max( min, Math.min( num, max ) );
}

let throttleController: Map<string, boolean> = new Map();
export function throttle( callback: Function, time: number, id: string ) {
  if ( throttleController.get( id ) ) return;

  throttleController.set( id, true );

  setTimeout( () => {
    callback();
    throttleController.set( id, false );
  }, time );
}

let intervalosBarraProgresso: Map<string, number> = new Map();
export function animacaoBarraProgresso( progressDivCssElement: HTMLElement, progressDivCssAttrs: CSSAttributes, posicaoDestino: number, idAnimacao: string, fpsAnimacao = 60 ) {
  if ( intervalosBarraProgresso.get( idAnimacao ) ) {
    clearInterval( intervalosBarraProgresso.get( idAnimacao ) );
  }

  intervalosBarraProgresso.set( idAnimacao, setInterval( () => {
    const posicaoAnterior = progressDivCssAttrs.progress;
    if ( posicaoAnterior === undefined ) return;

    const distancia = Math.abs( posicaoAnterior - posicaoDestino );
    if ( distancia > 0.1 ) {
      /// Pegando a posição em que o progresso deve estar no proximo frame
      progressDivCssAttrs.progress = lerp( posicaoAnterior, posicaoDestino, 0.2 );
      window.requestAnimationFrame( () => CSSEditor.from( progressDivCssElement, progressDivCssAttrs ) )
    } else {
      if ( progressDivCssAttrs !== undefined ) {
        clearInterval( intervalosBarraProgresso.get( idAnimacao ) );
        progressDivCssAttrs.progress = +( progressDivCssAttrs.progress?.toPrecision( 3 ) || 0 );
      }

      window.requestAnimationFrame( () => CSSEditor.from( progressDivCssElement, progressDivCssAttrs ) )
    }
  }, 1000 / fpsAnimacao ) )
}


export function smoothScrollTo( pos: number ): number {
  window.scrollTo( {
    top: pos,
    behavior: 'smooth',
  } )
  return 0;
  const interval = setInterval( () => {
    const distance = Math.abs( window.scrollY - pos );
    if ( distance > 20 ) {
      window.scroll( 0, lerp( window.scrollY, pos, 0.08 ) );
    } else if ( distance > 10 ) {
      window.scroll( 0, lerp( window.scrollY, pos, 0.1 ) );
    } else if ( distance > 4 ) {
      window.scroll( 0, lerp( window.scrollY, pos, 0.2 ) );
    } else {
      clearInterval( interval );
      window.scroll( 0, pos );
    }

    window.addEventListener( 'wheel', () => clearInterval( interval ) );
  }, 1000 / 60 )
  return interval;
}

export function capitalizeFirstLetter( str: string ): string {
  if ( typeof str !== 'string' ) {
    return '';
  }
  return str.charAt( 0 ).toUpperCase() + str.substring( 1 );
}

export function zeroBefore( n: number ) {
  return n.toString().padStart( 2, '0' );
}

export function millisecondsToMinutes( ms: number ) {
  return ms / 60000;
}

export function millisecondsToHours( ms: number ) {
  return ms / 3.6e+6;
}

export function millisecondsToDays( ms: number ) {
  return ms / 8.64e+7;
}
