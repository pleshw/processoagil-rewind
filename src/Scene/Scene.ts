import { ComponentAnimationRenderOrder } from '../types';
import { SceneComponent } from './ISceneComponent';
import { SceneScaffold } from "./SceneScaffold";
import { SceneView } from './SceneView';
declare const ScrollMagic: any;
declare const scrollMagicIndicatorsController: any;

export abstract class Scene {
  id: string;
  scaffold: SceneScaffold;
  components: SceneComponent[];

  constructor( _id: string, _components: SceneComponent[], _scaffold?: SceneScaffold ) {
    this.scaffold = _scaffold || new SceneScaffold( _id, { x: 0, y: 0 }, { w: window.innerWidth, h: window.innerHeight } );
    this.components = _components;
    this.id = _id;

    new ScrollMagic.Scene( { triggerElement: this.scaffold.element, duration: this.scaffold.element.clientHeight } )
      .setTween( this.scaffold.element, 0.5, { backgroundColor: "red", width: "-=100" } )
      .addIndicators() // add indicators (requires plugin)
      .addTo( scrollMagicIndicatorsController )
      .on( 'enter', () => {
        SceneView.scrollToSceneById( this.id )
      } )
  }

  render( renderOrder?: ComponentAnimationRenderOrder ): void {
    for ( const component of this.components ) {
      this.scaffold.add( component );
    }

    this.scaffold.render( renderOrder || ComponentAnimationRenderOrder.Sync )
  }
}
