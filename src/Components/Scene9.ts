import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
import { zeroBefore, millisecondsToMinutes, millisecondsToHours, millisecondsToDays } from '../utils.js';

declare const anime: any;

declare const animateVortext: any;

export class Scene9 extends Scene {
  usuarioJaViu: boolean = false;

  clientesVip: NodeListOf<Element> = document.querySelectorAll( '.cliente-vip' )!;

  constructor( scaffold: SceneScaffold, nomeClientes: any[] ) {
    super( scaffold );
    document.getElementById( 'verRanking' )!.addEventListener( 'click', () => {
      this.verRanking();
    } )

    nomeClientes.slice( 0, 5 ).forEach( ( customerName, i ) => {
      document.querySelectorAll( '.el-ranking' )[i]!.innerHTML = `<h1 class="text-light text-truncate"><i>
      ${ i + 1 }º -  ${ customerName.nome }</i></h1><h2> ${ customerName.total } processos
      </h2>`
    } );
  }

  render(): void {
    if ( !this.usuarioJaViu )
      this.animateRank();
    this.usuarioJaViu = true;
  }

  animateRank() {
    animateVortext();
    setTimeout( () => {
      setInterval( () => {
        animateVortext();
      }, 9500 );
    }, 9500 );
  }


  verRanking() {

    document.getElementById( 'verRanking' )!.style.display = 'none';
    anime( {
      targets: document.getElementById( 'pen' ),
      translateY: '-20vw',
      opacity: {
        value: 0,
        duration: 300
      },
      duration: 1000,
      easing: 'easeOutExpo',
    } )

    anime( {
      targets: '.el-ranking',
      translateX: '35%',
      opacity: {
        value: 1,
        duration: 100
      },
      easing: 'easeOutExpo',
      delay: anime.stagger( 200 ), // increase delay by 100ms for each elements.
      complete: () => {
        anime( {
          targets: '.el-ranking h2',
          translateX: '5%',
          opacity: {
            value: 1,
            duration: 100
          },
          easing: 'easeOutExpo',
          delay: anime.stagger( 200 )
        } );
      }
    } );
  }



  hide(): void {

  }

}