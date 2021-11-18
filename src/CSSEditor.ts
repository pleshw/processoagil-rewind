import { CSSAttributes } from './CSSAttributes';

export class CSSEditor {
  public static from( element: HTMLElement, cssAttrs: CSSAttributes ) {
    for ( const attr in cssAttrs ) {
      /// Obtendo valor das propriedades
      const _tmpAttr = cssAttrs[attr as keyof CSSAttributes] as string | undefined;

      /// atribui o valor da propriedade atual ao css do elemento
      if ( _tmpAttr != undefined ) {
        ( <any>element.style )[attr] = _tmpAttr;
      }
    }
  }
} 