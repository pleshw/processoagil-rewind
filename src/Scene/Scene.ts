import { ComponentAnimationRenderOrder } from '../types';
import { SceneComponent } from './ISceneComponent';
import { SceneScaffold } from "./SceneScaffold";

export abstract class Scene {
  id: string;
  scaffold: SceneScaffold;
  components: SceneComponent[];

  constructor( _id: string, _components: SceneComponent[], _scaffold?: SceneScaffold ) {
    this.scaffold = _scaffold || new SceneScaffold( _id, { x: 0, y: 0 }, { w: window.innerWidth, h: window.innerHeight } );
    this.components = _components;
    this.id = _id;
  }

  render( renderOrder?: ComponentAnimationRenderOrder ): void {
    for ( const component of this.components ) {
      this.scaffold.add( component );
    }

    this.scaffold.render( renderOrder || ComponentAnimationRenderOrder.Sync )
  }
}
