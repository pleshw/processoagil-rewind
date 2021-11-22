export class SceneView {
  public static index: number = 0;
  public static scenes: NodeListOf<Element> = document.querySelectorAll( '.scene' );

  constructor() {
  }

  static scrollToScene( index: number ): Element {
    const scene = this.scenes[this.index = index];
    scene.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      } );

    return scene;
  }

  static prev(): Element {
    return this.scrollToScene( --this.index );
  }

  static next(): Element {
    return this.scrollToScene( ++this.index );
  }
}