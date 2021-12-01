import { capitalizeFirstLetter, smoothScrollTo, throttle } from '../utils.js';
import { SceneAnimations } from './SceneAnimations.js';
import { SceneScaffold } from "./SceneScaffold.js";
import { SceneView } from './SceneView.js';
import { DefaultSceneAnimation } from './SceneAnimationKit.js';

export abstract class Scene {
  static idCount: number = 0;
  private static currScrollInterval: number = 0;

  id: string;
  scaffold: SceneScaffold;
  components: HTMLElement[] = [];
  scrollMagicScene: any;

  intro: HTMLElement | null = null;
  content: HTMLElement | null = null;

  sceneAnimations: SceneAnimations;

  constructor( _scaffold: SceneScaffold ) {
    this.scaffold = _scaffold;
    this.id = `scene${ Scene.idCount++ }`;
    this.scaffold.element.id = 'scaffold' + capitalizeFirstLetter( this.id );
    this.intro = this.scaffold.element.querySelector( '.intro' );
    this.content = this.scaffold.element.querySelector( '.content' );
    this.sceneAnimations = new DefaultSceneAnimation( this );
  }

  showIntro(): Scene {
    this.sceneAnimations.scrollIn().then( () => {
      this.sceneAnimations.intro().then( this.hideIntro )
    } );
    return this;
  }

  hideIntro(): Scene {
    if ( this.intro ) {
      this.intro.classList.remove( 'show' );
    }
    return this;
  }

  showContent(): Scene {
    throttle( () => {
      clearInterval( Scene.currScrollInterval );
      if ( this.content ) {
        this.content.classList.add( 'show' );
      }
      Scene.currScrollInterval = smoothScrollTo( this.scaffold.element.offsetTop );
      SceneView.updateControllers();
    }, 1000, 'scrollToSceneThrottle' );

    return this;
  }

  hideContent(): Scene {
    if ( this.content ) {
      this.content.classList.remove( 'show' );
    }
    return this;
  }
}
