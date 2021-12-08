import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
import { clamp } from '../utils.js';

declare const $: any;
declare const fitText: any;
declare const anime: any;

export class Scene1 extends Scene {
  usuarioJaViu: boolean = false;

  logo: HTMLElement = document.getElementById( 'logoScene1' )!;
  introTextContainer: HTMLElement = document.getElementById( 'introTextContainer' )!;
  introText1: HTMLElement = document.getElementById( 'introText1' )!;
  introText2: HTMLElement = document.getElementById( 'introText2' )!;
  introText: HTMLElement = document.getElementById( 'introText' )!;
  verMaisButton: HTMLElement = document.getElementById( 'verMaisButton' )!;
  movCounterContainer: HTMLElement = document.getElementById( 'numMovContainer' )!;
  movCounterText: HTMLElement = document.getElementById( 'numMovimentacoesScene1Text' )!;
  movCounter: HTMLElement = document.getElementById( 'numMovimentacoesScene1' )!;
  sceneControls: HTMLElement = document.getElementById( 'sceneControllers' )!;

  numOcorrencias: { ocorrencias: number } = {
    ocorrencias: 0
  };

  totalOcorrencias: number;

  constructor( scaffold: SceneScaffold, numOcorrencias: number ) {
    super( scaffold );
    this.totalOcorrencias = numOcorrencias;
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animateIntroText();
    this.usuarioJaViu = true;
  }

  animateIntroText() {

    let timeline = anime.timeline( {
      easing: 'easeOutExpo',
    } );

    timeline
      .add( {
        targets: this.introText1,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        },
        begin: () => {
          this.introText1.style.display = 'flex';
        }
      } ).add( {
        targets: this.introText1,
        opacity: {
          value: 0,
          duration: 300,
          easing: 'linear'
        },
      }, "+=2000" )
      .add( {
        targets: this.introText2,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        },
        begin: () => {
          this.introText2.style.display = 'flex';
        }
      }, "+=2000" )
      .add( {
        targets: this.introText2,
        opacity: {
          value: 0,
          duration: 300,
          easing: 'linear'
        },
      }, "+=2500" )
      .add( {
        targets: this.introText,
        opacity: {
          value: 1,
          duration: 100,
          easing: 'linear'
        },
        begin: () => {
          this.introText.style.display = 'flex';
        },
        complete: () => {
          this.animateControls();
          this.animateLogo();

          this.animateVerMais();
          setTimeout( () => {
            $( this.introTextContainer ).fadeOut( () => {
              this.animateOcorrencias();
            } );
          }, 2100 );
        }
      }, "+=2000" );
  }


  animateOcorrencias(): void {
    let timeline = anime.timeline( {
      easing: 'easeOutExpo',
    } );

    anime( {
      targets: this.movCounterText,
      delay: 500,
      opacity: {
        value: 1,
        duration: 300,
        easing: 'linear'
      },
    } )

    timeline
      .add( {
        targets: this.movCounterContainer,
        delay: 1000,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        }
      } )
      .add( {
        targets: this.numOcorrencias,
        ocorrencias: () => this.totalOcorrencias,
        round: 1,
        duration: 8000,
        easing: 'linear',
        update: () => {
          this.movCounterContainer.innerHTML = this.numOcorrencias.ocorrencias.toString();
          const scaleFactor = this.numOcorrencias.ocorrencias / this.totalOcorrencias;

          this.movCounterContainer.style.transform = `scale(${ clamp( scaleFactor, 0.1, 1 ) })`;
          fitText( this.movCounterContainer, clamp( 1 - scaleFactor, 0.4, 1 ) );
        }
      } );

  }

  animateVerMais() {
    anime( {
      targets: this.verMaisButton,
      delay: 2500,
      translateY: {
        value: -250,
        duration: 300,
        easing: 'linear'
      },
      opacity: {
        value: 1,
        duration: 500,
        easing: 'linear'
      }
    } );
  }

  animateLogo() {
    anime( {
      targets: this.logo,
      delay: 1500,
      translateY: {
        value: -50,
        duration: 300,
        easing: 'linear'
      },
      opacity: {
        value: 1,
        duration: 500,
        easing: 'linear'
      }
    } );
  }

  animateControls() {
    anime( {
      targets: this.sceneControls,
      delay: 0,
      translateX: {
        value: '-7vw',
        duration: 300,
        easing: 'linear'
      }
    } );
  }


  hide(): void {

  }

}