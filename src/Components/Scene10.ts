import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';

declare const anime: any;

export class Scene10 extends Scene {
  usuarioJaViu: boolean = false;
  predioPublicacoes: HTMLElement = document.getElementById( 'predioPublicacoes' )!;
  predioAndamentos: HTMLElement = document.getElementById( 'predioAndamentos' )!;
  predioExpedientes: HTMLElement = document.getElementById( 'predioExpedientes' )!;

  fotoFuncionario1: HTMLElement = document.getElementById( 'fotoFuncionario1' )!;
  fotoFuncionario2: HTMLElement = document.getElementById( 'fotoFuncionario2' )!;
  fotoFuncionario3: HTMLElement = document.getElementById( 'fotoFuncionario3' )!;

  numPublicacoes: HTMLElement = document.getElementById( 'numPublicacoes' )!;
  numAndamentos: HTMLElement = document.getElementById( 'numAndamentos' )!;
  numExpedientes: HTMLElement = document.getElementById( 'numExpedientes' )!;

  divPredioPublicacoes: HTMLElement = document.getElementById( 'divPredioPublicacoes' )!;
  divPredioAndamentos: HTMLElement = document.getElementById( 'divPredioAndamentos' )!;
  divPredioExpedientes: HTMLElement = document.getElementById( 'divPredioExpedientes' )!;

  currentPubAndExp: { publicacoes: number, andamentos: number, expedientes: number } = {
    publicacoes: 0,
    andamentos: 0,
    expedientes: 0,
  };

  totalPubAndExp: { publicacoes: number, andamentos: number, expedientes: number } = {
    publicacoes: 0,
    andamentos: 0,
    expedientes: 0,
  };
  constructor( scaffold: SceneScaffold, numPublicacoes: number, numAndamentos: number, numExpedientes: number ) {
    super( scaffold );
    this.currentPubAndExp.publicacoes = numPublicacoes;
    this.currentPubAndExp.andamentos = numAndamentos;
    this.currentPubAndExp.expedientes = numExpedientes;
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animatePodio();
    this.usuarioJaViu = true;
  }


  animatePodio(): void {
    let timeline = anime.timeline( {
      easing: 'easeOutExpo',
    } );


    timeline
      .add( {
        targets: this.divPredioPublicacoes,
        delay: 1400,
        easing: 'easeInOutSine',
        duration: 3000,
        translateX: this.shakeAnimation(),
      } )
      .add( {
        targets: this.divPredioPublicacoes,
        height: {
          value: '19%',
          duration: 1900,
        }
      } )
      .add( {
        targets: this.fotoFuncionario3,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        },
        translateY: {
          value: 50,
          duration: 50,
          easing: 'linear'
        },
        begin: () => {
          anime( {
            targets: '.texto-funcionario3',
            opacity: {
              value: 1,
              duration: 300,
              easing: 'linear'
            },
            translateY: {
              value: -50,
              duration: 50,
              easing: 'linear'
            }
          } )
        }
      } )
      .add( {
        targets: this.divPredioExpedientes,
        easing: 'easeInOutSine',
        duration: 3000,
        translateX: this.shakeAnimation(),
      } )
      .add( {
        targets: this.divPredioExpedientes,
        height: {
          value: '27%',
          duration: 2200,
        }
      }, "+=500" )
      .add( {
        targets: this.fotoFuncionario2,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        },
        translateY: {
          value: 50,
          duration: 50,
          easing: 'linear'
        },
        begin: () => {
          anime( {
            targets: '.texto-funcionario2',
            opacity: {
              value: 1,
              duration: 300,
              easing: 'linear'
            },
            translateY: {
              value: -50,
              duration: 50,
              easing: 'linear'
            }
          } )
        }
      } )
      .add( {
        targets: this.divPredioAndamentos,
        easing: 'easeInOutSine',
        duration: 4000,
        translateX: this.shakeAnimation(),
      } )
      .add( {
        targets: this.divPredioAndamentos,
        delay: 500,
        height: {
          value: '34%',
          duration: 2200,
        }
      }, "+=900" )
      .add( {
        targets: this.fotoFuncionario1,
        opacity: {
          value: 1,
          duration: 300,
          easing: 'linear'
        },
        translateY: {
          value: 50,
          duration: 50,
          easing: 'linear'
        },
        begin: () => {
          anime( {
            targets: '.texto-funcionario1',
            opacity: {
              value: 1,
              duration: 300,
              easing: 'linear'
            },
            translateY: {
              value: -50,
              duration: 50,
              easing: 'linear'
            }
          } )
        }
      } )
  }

  hide(): void {

  }


  shakeAnimation(): any[] {
    const vMax = 2;
    return [
      { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 }, { value: vMax * -1, }, { value: vMax, }, { value: vMax / -2, }, { value: vMax / 2 },
      {
        value: 0
      }
    ]
  }
}