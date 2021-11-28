import { ComponentAnimationRenderOrder } from '../types.js';
import { capitalizeFirstLetter } from '../utils.js';
import { SceneComponent } from './ISceneComponent.js';
import { SceneScaffold } from "./SceneScaffold.js";

export abstract class Scene {
  static idCount: number = 0;
  id: string;
  scaffold: SceneScaffold;
  components: SceneComponent[];
  scrollMagicScene: any;

  constructor( _scaffold: SceneScaffold, _components?: SceneComponent[] ) {
    this.scaffold = _scaffold;
    this.id = `scene${ Scene.idCount++ }`;
    this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter( this.id );
    this.components = _components || [];
  }

  render( renderOrder?: ComponentAnimationRenderOrder ): void {
    for ( const component of this.components ) {
      this.scaffold.add( component );
    }

    this.scaffold.render( renderOrder || ComponentAnimationRenderOrder.Sync )
  }
}
