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
