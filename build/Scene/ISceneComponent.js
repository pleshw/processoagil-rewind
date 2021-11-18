var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class SceneComponent {
    constructor(_htmlElement, _inAnimation, _outAnimation, _idleAnimation) {
        this.htmlElement = _htmlElement;
        this.inAnimation = _inAnimation;
        this.outAnimation = _outAnimation;
        this.idleAnimation = _idleAnimation;
    }
    /// Retorna uma promise que se resolve depois que a animação de entrada for carregada e
    /// a animação padrão do componente estiver rodando
    render() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.inAnimation) === null || _a === void 0 ? void 0 : _a.animate(this));
            (_b = this.idleAnimation) === null || _b === void 0 ? void 0 : _b.animate(this).then(() => {
                var _a;
                (_a = this.outAnimation) === null || _a === void 0 ? void 0 : _a.animate(this);
            });
        });
    }
}
