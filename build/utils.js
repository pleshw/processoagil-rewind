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
                progressDivCssAttrs.progress = +(progressDivCssAttrs.progress?.toPrecision(3) || 0);
            }
            window.requestAnimationFrame(() => CSSEditor.from(progressDivCssElement, progressDivCssAttrs));
        }
    }, 1000 / fpsAnimacao));
}
export function smoothScrollTo(pos) {
    window.scrollTo({
        top: pos,
        behavior: 'smooth',
    });
    return 0;
    const interval = setInterval(() => {
        const distance = Math.abs(window.scrollY - pos);
        if (distance > 20) {
            window.scroll(0, lerp(window.scrollY, pos, 0.08));
        }
        else if (distance > 10) {
            window.scroll(0, lerp(window.scrollY, pos, 0.1));
        }
        else if (distance > 4) {
            window.scroll(0, lerp(window.scrollY, pos, 0.2));
        }
        else {
            clearInterval(interval);
            window.scroll(0, pos);
        }
        window.addEventListener('wheel', () => clearInterval(interval));
    }, 1000 / 60);
    return interval;
}
export function capitalizeFirstLetter(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.substring(1);
}
export function zeroBefore(n) {
    return n.toString().padStart(2, '0');
}
export function minutesToMilliseconds(ms) {
    return ms * 60000;
}
export function millisecondsToMinutes(ms) {
    return ms / 60000;
}
export function millisecondsToHours(ms) {
    return ms / 3.6e+6;
}
export function millisecondsToDays(ms) {
    return ms / 8.64e+7;
}
export function drawPolygon(svgElementId, polygon) {
    const svg = document.getElementById(svgElementId);
    const drawing = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    svg.appendChild(drawing);
    for (const value of polygon) {
        var point = svg.getBoundingClientRect();
        point.x = value[0];
        point.y = value[1];
        drawing.points.appendItem(DOMPoint.fromPoint({
            x: point.x, y: point.y
        }));
    }
}
