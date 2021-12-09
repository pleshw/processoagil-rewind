import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';

declare const animateVortext: any;

export class Scene9 extends Scene {
  usuarioJaViu: boolean = false;

  clientesVip: NodeListOf<Element> = document.querySelectorAll( '.cliente-vip' )!;

  constructor( scaffold: SceneScaffold ) {
    super( scaffold );
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animateRank();
    this.usuarioJaViu = true;
  }

  animateRank() {
    animateVortext();
    setTimeout( () => {
      setInterval( () => {
        animateVortext();
      }, 9500 );
    }, 9500 );
  }



  hide(): void {

  }

}