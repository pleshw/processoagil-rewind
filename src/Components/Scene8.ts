import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';

declare const anime: any;

export class Scene8 extends Scene {
  usuarioJaViu: boolean = false;



  constructor( scaffold: SceneScaffold ) {
    super( scaffold );
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animateSpotlight();
    this.usuarioJaViu = true;
  }


  animateSpotlight(): void {
    setTimeout( () => {
      ( <HTMLElement>document.querySelector( '.spotlight' )! ).style.display = 'flex';
    }, 1000 );
  }

  hide(): void {

  }

}