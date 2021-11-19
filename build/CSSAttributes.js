import { clamp } from './utils.js';
export class CSSAttributes {
    constructor(props = {}) {
        this.width = props.width;
        this.height = props.height;
        this.position = props.position;
        this.margin = props.margin;
        this.padding = props.padding;
        this.backgroundColor = props.backgroundColor;
        this.x = props.left || props.x;
        this.y = props.top || props.y;
        this.backgroundImage = props.backgroundImage;
        this.transition = props.transition;
        if (props.isGradient) {
            this.gradientRotation = props.gradientRotation;
            this.isGradient = props.isGradient;
        }
        if (props.isProgressBar) {
            this.progressRotation = `${props.progressRotation || '90deg'}`;
            this.progressColor = `${props.progressColor || 'transparent'}`;
            this.progressBackground = `${props.progressBackground || 'blue'}`;
            this._progress = props.progress;
            this.isProgressBar = props.isProgressBar;
        }
    }
    *[Symbol.iterator]() {
        for (const prop in this) {
            yield this[prop];
        }
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this.left = this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this.top = this._y = value;
    }
    get isGradient() {
        return this._isGradient;
    }
    set isGradient(value) {
        this._isGradient = value;
        if (this.isGradient) {
            this.gradientStyleText = `linear-gradient(${this.gradientRotation || '180deg'}, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0))`;
            this.updateBackgroundImage();
        }
    }
    get gradientRotation() {
        return this._gradientRotation;
    }
    set gradientRotation(value) {
        this._gradientRotation = value;
        if (this.isGradient) {
            this.gradientStyleText = `linear-gradient(${this.gradientRotation || '180deg'}, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0))`;
            this.updateBackgroundImage();
        }
    }
    updateBackgroundImage() {
        this.backgroundImage = `${this.isGradient ? this.gradientStyleText + ',' : ''}${this.progressStyleText || ''}`;
    }
    get isProgressBar() {
        return this._isProgressBar;
    }
    set isProgressBar(value) {
        this._isProgressBar = value;
        if (this._isProgressBar) {
            this._progress = clamp(this._progress);
            this.progressRotation = `${this.progressRotation || '90deg'}`;
            this.progressColor = `${this.progressColor || 'transparent'}`;
            this.progressBackground = `${this.progressBackground || 'blue'}`;
            this.strProgress = `${(this._progress).toString()}%`;
            this.remaining = `${(100 - this._progress).toString()}%`;
            this.progressStyleText = `linear-gradient(${this.progressRotation}, ${this.progressColor} ${this.strProgress}, ${this.progressBackground} 0%, ${this.progressBackground} ${this.remaining})`;
            this.updateBackgroundImage();
        }
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
        if (typeof (value) === 'number') {
            this._progress = clamp(value);
            this.progressRotation = `${this.progressRotation || '90deg'}`;
            this.progressColor = `${this.progressColor || 'transparent'}`;
            this.progressBackground = `${this.progressBackground || 'blue'}`;
            this.strProgress = `${(this._progress).toString()}%`;
            this.remaining = `${(100 - this._progress).toString()}%`;
            this.progressStyleText = `linear-gradient(${this.progressRotation}, ${this.progressColor} ${this.strProgress}, ${this.progressBackground} 0%, ${this.progressBackground} ${this.remaining})`;
            this.updateBackgroundImage();
        }
    }
}
;
