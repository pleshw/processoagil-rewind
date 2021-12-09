import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';

declare const anime: any;

export class Scene2 extends Scene {
  usuarioJaViu: boolean = false;

  divQtdPublicacoes: HTMLElement = document.getElementById( 'qtdPublicacoes' )!;
  divQtdAndamentos: HTMLElement = document.getElementById( 'qtdAndamentos' )!;
  divQtdExpedientes: HTMLElement = document.getElementById( 'qtdExpedientes' )!;


  constructor( scaffold: SceneScaffold ) {
    super( scaffold );
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animatePubAndExp();
    this.usuarioJaViu = true;
  }


  animatePubAndExp(): void {
    anime.suspendWhenDocumentHidden = false;
    let timeline = anime.timeline( {
      easing: 'easeOutExpo',
    } );

    this.divQtdPublicacoes.style.display = 'flex';
    this.divQtdAndamentos.style.display = 'flex';
    this.divQtdExpedientes.style.display = 'flex';

    timeline
      .add( {
        targets: this.divQtdPublicacoes,
        translateX: [
          { value: 800, duration: 1000, delay: 500 },
          { value: 0, duration: 1000, delay: 500 }
        ],
        ...this.windowDimensions(),
        borderRadius: [
          { value: '50%', duration: 2000, delay: 500 },
          { value: '9px', duration: 500, delay: 0 },
        ],
        translateY: [
          { value: 900, duration: 500 },
          { value: 0, duration: 500, delay: 1000 }
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 }
        ],
        scaleY: [
          { value: [1.75, 1], duration: 500 },
          { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
        ],
        opacity: [{ value: 1, duration: 300, easing: 'linear' }],
        easing: 'easeOutElastic(1, .8)',
        complete: () => {
          this.divQtdPublicacoes.style.color = 'white';
        }
      } )
      .add( {
        targets: this.divQtdAndamentos,
        translateX: [
          { value: -800, duration: 1000, delay: 500 },
          { value: 0, duration: 1000, delay: 500 }
        ],
        ...this.windowDimensions(),
        borderRadius: [
          { value: '50%', duration: 2000, delay: 500 },
          { value: '9px', duration: 500, delay: 0 },
        ],
        translateY: [
          { value: 900, duration: 500 },
          { value: 40, duration: 500, delay: 1000 },
          { value: 0, duration: 500, delay: 1000 }
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 }
        ],
        scaleY: [
          { value: [1, 1], duration: 500 },
          { value: 1, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
        ],
        opacity: [{ value: 1, duration: 300, easing: 'linear' }],
        easing: 'easeOutElastic(1, .8)',
        complete: () => {
          this.divQtdAndamentos.style.color = 'white';
        }
      } )
      .add( {
        targets: this.divQtdExpedientes,
        translateX: [
          { value: 800, duration: 1000, delay: 500 },
          { value: 0, duration: 1000, delay: 500 }
        ],
        ...this.windowDimensions(),
        borderRadius: [
          { value: '50%', duration: 2000, delay: 500 },
          { value: '9px', duration: 500, delay: 0 },
        ],
        translateY: [
          { value: 900, duration: 500 },
          { value: 40, duration: 500, delay: 1000 },
          { value: 0, duration: 500, delay: 1000 }
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 }
        ],
        scaleY: [
          { value: [1, 1], duration: 500 },
          { value: 1, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
        ],
        opacity: [{ value: 1, duration: 300, easing: 'linear' }],
        easing: 'easeOutElastic(1, .8)',
        complete: () => {
          this.divQtdExpedientes.style.color = 'white';
        }
      } )

    anime.suspendWhenDocumentHidden = true;
  }

  windowDimensions() {
    return {
      width: [
        { value: 48, duration: 3000, delay: 500 },
        { value: '15vw', duration: 500, delay: 0 }
      ],
      height: [
        { value: 48, duration: 3000, delay: 500 },
        { value: '25%', duration: 500, delay: 0 }
      ]
    }
  }

  hide(): void {

  }

}