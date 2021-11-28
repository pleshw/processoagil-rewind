import { Scene } from './Scene';
import { smoothScrollTo, throttle } from '../utils.js';
export class SceneView {

  public static index: number = 0;
  public static scenes: Array<Scene> = [];
  private static currScrollInterval: number = 0;

  static scrollToSceneById( id: string ): Scene {
    const sceneIndex = this.scenes.findIndex( s => s.id === id )
    return this.scrollToScene( sceneIndex );
  }

  static scrollToScene( index: number ): Scene {
    if ( index >= this.scenes.length ) return this.scrollToScene( this.scenes.length - 1 );
    if ( index < 0 ) return this.scrollToScene( 0 );

    const scene = this.scenes[this.index = index];

    throttle( () => {
      clearInterval( this.currScrollInterval );
      this.currScrollInterval = smoothScrollTo( scene.scaffold.element.offsetTop )
      this.updateControllers();
    }, 300, 'scrollToSceneThrottle' );

    return scene;
  }

  static prev(): Scene {
    if ( ( this.index - 1 ) < 0 ) return this.scrollToScene( 0 );
    return this.scrollToScene( --this.index );
  }

  static next(): Scene {
    if ( ( this.index + 1 ) > this.scenes.length ) return this.scrollToScene( this.scenes.length - 1 );
    return this.scrollToScene( ++this.index );
  }

  static first(): Scene {
    return this.scenes[0];
  }

  static last(): Scene {
    return this.scenes[this.scenes.length - 1];
  }

  static updateControllers() {
    const currSceneCounter = document.getElementById( 'currSceneCounter' );
    if ( currSceneCounter ) {
      currSceneCounter.innerHTML = ( this.index + 1 ).toString();
    }
  }

  static createControllers() {
    document.body.insertAdjacentHTML( 'afterbegin', `
    <div id="sceneControllers">
      <span id="prevScene"><i class="arrow up"></i></span>
      <div id="sceneControllersCounters">
        <span id="currSceneCounter">${ this.index + 1 }</span>
        <span id="sceneControllerHr">/</span>
        <span id="totalSceneCounter" style="font-size: 15px; align-self: flex-end;">
          ${ this.scenes.length }
        </span>
      </div>
      <span id="nextScene"><i class="arrow down"></i></span>
    </div>`)
  }
}