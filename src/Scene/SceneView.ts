export class SceneView {
  public index: number = 0;
  public scenes: NodeListOf<Element> = document.querySelectorAll( '.scene' );

  constructor() {
  }

  scrollToScene( index: number ): Element {
    const scene = this.scenes[this.index = index];
    scene.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      } );

    return scene;
  }

  prev(): Element {
    return this.scrollToScene( --this.index );
  }

  next(): Element {
    return this.scrollToScene( ++this.index );
  }
}