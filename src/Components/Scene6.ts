import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
declare const loadBrasil: any;

export class Scene6 extends Scene {
  usuarioJaViu: boolean = false;
  processosPorEstado: [] = [];
  constructor( scaffold: SceneScaffold, processosPorEstado: [] ) {
    super( scaffold );
    this.processosPorEstado = processosPorEstado;
  }


  render(): void {
    if ( !this.usuarioJaViu ) {
      loadBrasil();
    }
    this.usuarioJaViu = true;
  }


  hide(): void {
  }
}