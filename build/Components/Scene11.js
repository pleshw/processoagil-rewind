import { Scene } from '../Scene/Scene.js';
export class Scene11 extends Scene {
    constructor(scaffold, meses) {
        super(scaffold);
        this.usuarioJaViu = false;
        this.meses = meses;
    }
    render() {
        if (!this.usuarioJaViu)
            this.animateMessages();
        this.usuarioJaViu = true;
    }
    animateMessages() {
        this.typed = new Typed('#mensagensFinais', {
            strings: this.messages().slice(0, 5),
            typeSpeed: 30,
            backSpeed: 45,
            startDelay: 2200,
            backDelay: 2300,
            smartBackspace: true,
            loop: false,
            onComplete: () => {
                setTimeout(() => {
                    this.typed.destroy();
                    this.typed = new Typed('#mensagensFinais', {
                        strings: this.messages().slice(5, 9),
                        typeSpeed: 30,
                        backSpeed: 20,
                        startDelay: 2200,
                        backDelay: 2300,
                        smartBackspace: true,
                        loop: false
                    });
                }, 2300);
            }
        });
    }
    hide() {
    }
    messages() {
        return ["Estamos chegando ao fim…",
            "Agradecemos pela parceria nestes $ meses".replace('$', this.meses.toString()),
            "2021 foi uma ano e tanto",
            "Esperamos crescer juntos ainda mais em 2022!",
            "",
            "E falando em 2022...",
            "Já pensou o que te espera no próximo ano?",
            "Vou te dar um spoiler",
            "Mas não conta pra ninguém..."];
    }
}
