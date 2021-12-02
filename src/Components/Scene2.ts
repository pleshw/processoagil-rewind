import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';

declare const anime: any;

export class Scene2 extends Scene {
  usuarioJaViu: boolean = false;

  logo: HTMLElement = document.getElementById( 'logoScene1' )!;
  predioPublicacoes: HTMLElement = document.getElementById( 'predioPublicacoes' )!;
  predioAndamentos: HTMLElement = document.getElementById( 'predioAndamentos' )!;
  predioExpedientes: HTMLElement = document.getElementById( 'predioExpedientes' )!;

  numPublicacoes: HTMLElement = document.getElementById( 'numPublicacoes' )!;
  numAndamentos: HTMLElement = document.getElementById( 'numAndamentos' )!;
  numExpedientes: HTMLElement = document.getElementById( 'numExpedientes' )!;

  objPubAndExp: { publicacoes: number, andamentos: number, expedientes: number } = {
    publicacoes: 0,
    andamentos: 0,
    expedientes: 0,
  };
  constructor( scaffold: SceneScaffold, numPublicacoes: number, numAndamentos: number, numExpedientes: number ) {
    super( scaffold );
    this.objPubAndExp.publicacoes = numPublicacoes;
    this.objPubAndExp.andamentos = numAndamentos;
    this.objPubAndExp.expedientes = numExpedientes;
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animateIntroText();
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
      } ).add( {
        targets: this.introText1,
        opacity: {
          value: 0,
          duration: 300,
          easing: 'linear'
        },
      }, "+=3500" )
      .add( {
        targets: this.introText2,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        },
      }, "+=1000" )
      .add( {
        targets: this.introText2,
        opacity: {
          value: 0,
          duration: 300,
          easing: 'linear'
        },
      }, "+=3500" )
      .add( {
        targets: this.introText,
        opacity: {
          value: 1,
          duration: 100,
          easing: 'linear'
        },
        complete: () => {
          this.animateLogo();
          this.animateOcorrencias();
          this.animateVerMais();
        }
      }, "+=1000" );
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
      translateY: {
        value: -103,
        duration: 400,
        easing: 'linear'
      }
    } )

    timeline
      .add( {
        targets: this.movCounterContainer,
        delay: 1000,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        },
        translateY: {
          value: -150,
          duration: 400,
          easing: 'linear'
        }
      } )
      .add( {
        targets: this.numOcorrencias,
        ocorrencias: 100000,
        round: 1,
        duration: 7000,
        update: () => {
          this.movCounter.innerHTML = this.numOcorrencias.ocorrencias.toString();
          this.movCounter.style.scale = `${ this.numOcorrencias.ocorrencias / 1000 }px`;
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


  hide(): void {

  }

}