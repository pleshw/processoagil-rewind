import { ComponentAnimationRenderOrder } from '../types';

export class SceneScaffold {
  element: HTMLElement;

  constructor( scaffoldElement: HTMLElement ) {
    this.element = scaffoldElement;
  }

  render( arg0: ComponentAnimationRenderOrder ) {
    throw new Error( 'Method not implemented.' );
  }
}