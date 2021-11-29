import { ComponentAnimationRenderOrder } from '../types.js';
import { capitalizeFirstLetter } from '../utils.js';
import { SceneScaffold } from "./SceneScaffold.js";

export abstract class Scene {
  static idCount: number = 0;
  id: string;
  scaffold: SceneScaffold;
  components: HTMLElement[] = [];
  scrollMagicScene: any;
  animationCallback: Function | null = null;

  constructor( _scaffold: SceneScaffold ) {
    this.scaffold = _scaffold;
    this.id = `scene${ Scene.idCount++ }`;
    this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter( this.id );
  }

  render(): void {
    if ( !this.animationCallback ) return;
    this.animationCallback();
  }
}
