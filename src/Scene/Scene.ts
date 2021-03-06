import { capitalizeFirstLetter, smoothScrollTo, throttle } from '../utils.js';
import { SceneScaffold } from "./SceneScaffold.js";
import { SceneView } from './SceneView.js';

export abstract class Scene {
  static idCount: number = 0;
  private static currScrollInterval: number = 0;

  id: string;
  scaffold: SceneScaffold;
  components: HTMLElement[] = [];
  scrollMagicScene: any;

  intro: HTMLElement;
  content: HTMLElement;

  constructor( _scaffold: SceneScaffold ) {
    this.scaffold = _scaffold;
    this.id = `scene${ Scene.idCount++ }`;
    this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter( this.id );
    this.intro = this.scaffold.element.querySelector( '.intro' )!;
    this.content = this.scaffold.element.querySelector( '.content' )!;
  }

  scroll(): Scene {
    throttle( () => {
      clearInterval( Scene.currScrollInterval );
      this.content.classList.add( 'show' );

      Scene.currScrollInterval = smoothScrollTo( this.scaffold.element.offsetTop );
      SceneView.updateControllers();
    }, 100, 'scrollToSceneThrottle' );

    return this;
  }

  abstract render(): void;
  abstract hide(): void;
}
