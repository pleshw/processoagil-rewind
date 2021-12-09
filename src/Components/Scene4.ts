import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
declare const fitText: any;

export class Scene4 extends Scene {
  usuarioJaViu: boolean = false;
  numMovimentados: number;
  constructor( scaffold: SceneScaffold, numMovimentados: number ) {
    super( scaffold );
    this.numMovimentados = numMovimentados;
  }


  render(): void {
    if ( !this.usuarioJaViu ) {
      document.getElementById( 'numProcessosMovimentados' )!.innerHTML = this.numMovimentados.toString();

      setTimeout( () => {
        document.getElementById( 'numProcessosMovimentados' )!.classList.add( 'spotlight2' );
        document.getElementById( 'numProcessosMovimentados' )!.setAttribute( 'data-text', this.numMovimentados.toString() );
        document.getElementById( 'numProcessosMovimentados' )!.style.left = '0';
        document.getElementById( 'numProcessosMovimentados' )!.style.opacity = '1';
        fitText( document.getElementById( 'numProcessosMovimentados' )!, 0.3 );
      }, 2300 );
    }
    this.usuarioJaViu = true;

  }


  hide(): void {
  }
}