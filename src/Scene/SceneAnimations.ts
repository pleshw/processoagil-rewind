import { Scene } from './Scene';

export abstract class SceneAnimations {
  scene: Scene;

  introAnimation: Function | null = null;
  endingAnimation: Function | null = null;
  scrollInAnimation: Function | null = null;
  scrollOutAnimation: Function | null = null;

  constructor( scene: Scene ) {
    this.scene = scene;
  }

  abstract scrollIn(): Promise<void>;
  abstract scrollOut(): Promise<void>;

  abstract intro(): Promise<void>;
  abstract ending(): Promise<void>;
}