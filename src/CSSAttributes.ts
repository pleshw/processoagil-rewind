import { clamp } from './utils.js';

export class CSSAttributes {
  width?: string;
  height?: string;
  position?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  transition?: string;
  backgroundImage?: string;

  private _x?: string | undefined;
  private _y?: string | undefined;

  private _isGradient?: boolean | undefined;
  private _gradientRotation?: string | undefined;
  gradientStyleText?: string;

  private _isProgressBar?: boolean | undefined;
  progressRotation?: string;
  progressColor?: string;
  progressBackground?: string;
  progressStyleText?: string;
  private _progress?: number | undefined;

  constructor( props: CSSCustomProps = {} ) {
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

    if ( props.isGradient ) {
      this.gradientRotation = props.gradientRotation;
      this.isGradient = props.isGradient;
    }

    if ( props.isProgressBar ) {
      this.progressRotation = `${ props.progressRotation || '90deg' }`;
      this.progressColor = `${ props.progressColor || 'transparent' }`;
      this.progressBackground = `${ props.progressBackground || 'blue' }`;

      this._progress = props.progress;

      this.isProgressBar = props.isProgressBar;
    }
  }

  *[Symbol.iterator]() {
    for ( const prop in this ) {
      yield this[prop];
    }
  }

  public get x(): string | undefined {
    return this._x;
  }

  public set x( value: string | undefined ) {
    this.left = this._x = value;
  }

  public get y(): string | undefined {
    return this._y;
  }

  public set y( value: string | undefined ) {
    this.top = this._y = value;
  }

  public get isGradient(): boolean | undefined {
    return this._isGradient;
  }

  public set isGradient( value: boolean | undefined ) {
    this._isGradient = value;
    if ( this.isGradient ) {
      this.gradientStyleText = `linear-gradient(${ this.gradientRotation || '180deg' }, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0))`;
      this.updateBackgroundImage();
    }
  }

  public get gradientRotation(): string | undefined {
    return this._gradientRotation;
  }

  public set gradientRotation( value: string | undefined ) {
    this._gradientRotation = value;
    if ( this.isGradient ) {
      this.gradientStyleText = `linear-gradient(${ this.gradientRotation || '180deg' }, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0))`;
      this.updateBackgroundImage();
    }
  }

  private updateBackgroundImage(): void {
    this.backgroundImage = `${ this.isGradient ? this.gradientStyleText + ',' : '' }${ this.progressStyleText || '' }`;
  }

  public get isProgressBar(): boolean | undefined {
    return this._isProgressBar;
  }

  public set isProgressBar( value: boolean | undefined ) {
    this._isProgressBar = value;
    if ( this._isProgressBar ) {
      this._progress = clamp( this._progress );

      this.progressRotation = `${ this.progressRotation || '90deg' }`;
      this.progressColor = `${ this.progressColor || 'transparent' }`;
      this.progressBackground = `${ this.progressBackground || 'blue' }`;

      this.strProgress = `${ ( this._progress ).toString() }%`;
      this.remaining = `${ ( 100 - this._progress ).toString() }%`;

      this.progressStyleText = `linear-gradient(${ this.progressRotation }, ${ this.progressColor } ${ this.strProgress }, ${ this.progressBackground } 0%, ${ this.progressBackground } ${ this.remaining })`;
      this.updateBackgroundImage();
    }
  }

  public get progress(): number | undefined {
    return this._progress;
  }

  public set progress( value: number | undefined ) {
    if ( value ) {
      this._progress = clamp( value );

      this.progressRotation = `${ this.progressRotation || '90deg' }`;
      this.progressColor = `${ this.progressColor || 'transparent' }`;
      this.progressBackground = `${ this.progressBackground || 'blue' }`;

      this.strProgress = `${ ( this._progress ).toString() }%`;
      this.remaining = `${ ( 100 - this._progress ).toString() }%`;

      this.progressStyleText = `linear-gradient(${ this.progressRotation }, ${ this.progressColor } ${ this.strProgress }, ${ this.progressBackground } 0%, ${ this.progressBackground } ${ this.remaining })`;
      this.updateBackgroundImage();
    }
  }

  [key: string]: any;
};

type CSSCustomProps = {
  width?: string;
  height?: string;
  position?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  left?: string;
  top?: string;
  backgroundImage?: string;
  transition?: string;

  x?: string;
  y?: string;

  isGradient?: boolean;
  gradientRotation?: string;
  gradientStyleText?: string;

  isProgressBar?: boolean;
  progressRotation?: string;
  progressColor?: string;
  progressBackground?: string;
  progress?: number;
  progressStyleText?: string;
}