import { SceneComponent } from './ISceneComponent';

export class SceneScaffold {
  element: HTMLElement;

  constructor( sceneId: string, position: { x: number, y: number }, dimensions: { w: number, h: number } ) {
    this.element = document.createElement( 'div' );
    this.element.id = 'scaffold' + sceneId;
  }

  render( arg0: ComponentAnimationRenderOrder ) {
    throw new Error( 'Method not implemented.' );
  }
  add( component: SceneComponent ) {
    throw new Error( 'Method not implemented.' );
  }
}