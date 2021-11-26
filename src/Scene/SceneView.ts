import { Scene } from './Scene';
export class SceneView {

  public static index: number = 0;
  public static scenes: Array<Scene>;

  constructor() {

  }

  static scrollToSceneById( id: string ): Scene {
    const sceneIndex = this.scenes.findIndex( s => s.id === id )
    return this.scrollToScene( sceneIndex );
  }

  static scrollToScene( index: number ): Scene {
    const scene = this.scenes[this.index = index];
    scene.scaffold.element.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      } );

    return scene;
  }

  static prev(): Scene {
    return this.scrollToScene( --this.index );
  }

  static next(): Scene {
    return this.scrollToScene( ++this.index );
  }
}