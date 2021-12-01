import { SceneAnimations } from './SceneAnimations';
import { Scene } from './Scene';


export class DefaultSceneAnimation extends SceneAnimations {
  constructor( scene: Scene ) {
    super( scene )
  }

  async scrollIn(): Promise<void> {
    return;
  }
  async scrollOut(): Promise<void> {
    return;
  }
  async intro(): Promise<void> {
    return;
  }
  async ending(): Promise<void> {
    return;
  }
}