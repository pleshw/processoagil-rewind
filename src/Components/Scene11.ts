import { Scene } from '../Scene/Scene.js';
import { SceneScaffold } from '../Scene/SceneScaffold.js';
declare const Typed: any;


export class Scene11 extends Scene {
  usuarioJaViu: boolean = false;
  typed: any;

  constructor( scaffold: SceneScaffold ) {
    super( scaffold );
  }


  render(): void {
    if ( !this.usuarioJaViu )
      this.animateMessages();
    this.usuarioJaViu = true;
  }

  animateMessages() {
    this.typed = new Typed( '#mensagensFinais', {
      strings: this.messages(),
      typeSpeed: 50,
      backSpeed: 60,
      startDelay: 1500,
      backDelay: 2300,
      smartBackspace: true, // this is a default
      loop: false
    } );
  }



  hide(): void {
  }

  messages() {
    return ["Estamos chegando ao fim…",
      "Agradecemos pela parceria nestes 47 meses",
      "Esperamos crescer juntos e ainda mais em 2022",
      "E falando em 2022…..",
      "Já pensou o que te espera no próximo ano?",
      "Vou te dar um spoiler",
      "Mas não conta pra ninguém"];
  }
}