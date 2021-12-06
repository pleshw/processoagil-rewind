import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';

declare const anime: any;

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
    anime( {
      targets: '.cliente-vip',
      translateX: 240,
      opacity: {
        value: 1,
        duration: 300,
        easing: 'linear'
      },
      easing: 'easeOutExpo',
      delay: anime.stagger( 300, { start: 500, from: 'last' } ) // increase delay by 100ms for each elements.
    } );
  }



  hide(): void {

  }

}