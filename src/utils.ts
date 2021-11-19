export function lerp( inicio: number, fim: number, qtd: number ): number {
  return ( 1 - qtd ) * inicio + qtd * fim;
}

export function inverseLerp( a: number, b: number, valor: number ): number {
  return ( valor - a ) / ( b - a );
}

export function remap( entradaMin: number, entradaMax: number, saidaMin: number, saidaMax: number, valor: number ): number {
  return lerp( saidaMin, saidaMax, inverseLerp( entradaMin, entradaMax, valor ) );
}

export function clamp( num: number = 0, min: number = 0, max: number = 100 ): number {
  return Math.max( min, Math.min( num, max ) );
}