import { ComponentAnimationRenderOrder } from '../types';
import { SceneComponent } from './ISceneComponent';

export class SceneScaffold {
  element: HTMLElement;

  constructor( scaffoldElement: HTMLElement ) {
    this.element = scaffoldElement;
  }

  render( arg0: ComponentAnimationRenderOrder ) {
    throw new Error( 'Method not implemented.' );
  }
  add( component: SceneComponent ) {
    throw new Error( 'Method not implemented.' );
  }
}