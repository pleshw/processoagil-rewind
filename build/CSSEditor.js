export class CSSEditor {
    static from(element, cssAttrs) {
        for (const attr in cssAttrs) {
            /// Obtendo valor das propriedades
            const _tmpAttr = cssAttrs[attr];
            /// atribui o valor da propriedade atual ao css do elemento
            if (_tmpAttr != undefined) {
                element.style[attr] = _tmpAttr;
            }
        }
    }
}
