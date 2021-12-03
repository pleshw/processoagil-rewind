import { Scene } from './Scene';
declare const ScrollMagic: any;


export class SceneView {

  public static index: number = 0;
  public static scenes: Array<Scene> = [];

  static scrollToSceneById( id: string ): void {
    const sceneIndex = this.scenes.findIndex( s => s.id === id )
    this.scrollToScene( sceneIndex );
  }

  static scrollToScene( index: number ): void {
    if ( index >= this.scenes.length ) return this.scrollToScene( this.scenes.length - 1 );
    if ( index < 0 ) return this.scrollToScene( 0 );

    /// Escondendo cena antiga
    this.scenes[this.index].hide();

    /// Pegando cena nova > instanciando novo index > mostrando conteúdo da nova cena
    const currentScene = this.scenes[this.index = index];
    currentScene.scroll();
    currentScene.render();
  }

  static prev(): void {
    if ( ( this.index - 1 ) < 0 ) return this.scrollToScene( 0 );
    this.scrollToScene( this.index - 1 );
  }

  static next(): void {
    if ( ( this.index + 1 ) > this.scenes.length ) return this.scrollToScene( this.scenes.length - 1 );
    this.scrollToScene( this.index + 1 );
  }

  static get( index: number ): Scene {
    if ( index < 0 ) return this.scenes[0];
    if ( index > this.scenes.length - 1 ) return this.scenes[this.scenes.length - 1];
    return this.scenes[index];
  }

  static first(): Scene {
    return this.scenes[0];
  }

  static last(): Scene {
    return this.scenes[this.scenes.length - 1];
  }

  static updateControllers() {
    const currSceneCounter = document.getElementById( 'currSceneCounter' );
    const totalSceneCounter = document.getElementById( 'totalSceneCounter' );
    if ( currSceneCounter ) {
      currSceneCounter.innerHTML = ( this.index + 1 ).toString();
    }
    if ( totalSceneCounter ) {
      totalSceneCounter.innerHTML = this.scenes.length.toString();
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


  static addScene( scene: Scene, scrollMagicController: any ) {
    this.scenes.push( scene );

    const currScene = SceneView.last();
    const scrollMagicSceneInConfig = {
      triggerElement: currScene.scaffold.element,
      duration: currScene.scaffold.element.clientHeight,
      triggerHook: 1
    }

    this.last().scrollMagicScene = new ScrollMagic.Scene( scrollMagicSceneInConfig )
      .addTo( scrollMagicController )
      .on( 'enter', () => {
        console.log( 'Você entrou na cena ' + this.last().id )
      } );


    const scrollMagicSceneOutConfig = {
      triggerElement: currScene.scaffold.element,
      duration: currScene.scaffold.element.clientHeight,
      triggerHook: 0
    }

    currScene.scrollMagicScene = new ScrollMagic.Scene( scrollMagicSceneOutConfig )
      .addTo( scrollMagicController )
      .on( 'enter', () => {
        console.log( 'Você saiu da cena ' + currScene.id )
      } );
  }
}