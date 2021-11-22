import { CSSEditor } from './CSSEditor.js';
export function lerp(inicio, fim, qtd) {
    return (1 - qtd) * inicio + qtd * fim;
}
export function inverseLerp(a, b, valor) {
    return (valor - a) / (b - a);
}
export function remap(entradaMin, entradaMax, saidaMin, saidaMax, valor) {
    return lerp(saidaMin, saidaMax, inverseLerp(entradaMin, entradaMax, valor));
}
export function clamp(num = 0, min = 0, max = 100) {
    return Math.max(min, Math.min(num, max));
}
let throttleController = new Map();
export function throttle(callback, time, id) {
    if (throttleController.get(id))
        return;
    throttleController.set(id, true);
    setTimeout(() => {
        callback();
        throttleController.set(id, false);
    }, time);
}
let intervalosBarraProgresso = new Map();
export function animacaoBarraProgresso(progressDivCssElement, progressDivCssAttrs, posicaoDestino, idAnimacao, fpsAnimacao = 60) {
    if (intervalosBarraProgresso.get(idAnimacao)) {
        clearInterval(intervalosBarraProgresso.get(idAnimacao));
    }
    intervalosBarraProgresso.set(idAnimacao, setInterval(() => {
        var _a;
        const posicaoAnterior = progressDivCssAttrs.progress;
        if (posicaoAnterior === undefined)
            return;
        const distancia = Math.abs(posicaoAnterior - posicaoDestino);
        if (distancia > 0.1) {
            /// Pegando a posição em que o progresso deve estar no proximo frame
            progressDivCssAttrs.progress = lerp(posicaoAnterior, posicaoDestino, 0.2);
            window.requestAnimationFrame(() => CSSEditor.from(progressDivCssElement, progressDivCssAttrs));
        }
        else {
            if (progressDivCssAttrs !== undefined) {
                clearInterval(intervalosBarraProgresso.get(idAnimacao));
                progressDivCssAttrs.progress = +(((_a = progressDivCssAttrs.progress) === null || _a === void 0 ? void 0 : _a.toPrecision(3)) || 0);
            }
            window.requestAnimationFrame(() => CSSEditor.from(progressDivCssElement, progressDivCssAttrs));
        }
    }, 1000 / fpsAnimacao));
}
