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

  x?: string;
  y?: string;

  isGradient?: boolean;
  gradientRotation?: string;
  gradientStyleText?: string;

  isProgressBar?: boolean;
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
    this.left = this.x = props.left || props.x;
    this.top = this.y = props.top || props.y;
    this.backgroundImage = props.backgroundImage;
    this.transition = props.transition;

    this.isGradient = props.isGradient;
    if ( this.isGradient ) {
      this.gradientRotation = props.gradientRotation;
      this.gradientStyleText = `linear-gradient(${ this.gradientRotation || '180deg' }, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0))`;
    }

    this.isProgressBar = props.isProgressBar;
    if ( this.isProgressBar ) {
      this.progressRotation = `${ props.progressRotation || '90deg' }`;
      this.progressColor = `${ props.progressColor || 'transparent' }`;
      this.progressBackground = `${ props.progressBackground || 'blue' }`;

      this._progress = props.progress || 0;
      this.strProgress = `${ ( this._progress ).toString() }%`;
      this.remaining = `${ ( 100 - this._progress ).toString() }%`;

      this.progressStyleText = `linear-gradient(${ this.progressRotation }, ${ this.progressColor } ${ this.strProgress }, ${ this.progressBackground } 0%, ${ this.progressBackground } ${ this.remaining })`;
    }

    this.backgroundImage = `${ this.isGradient ? this.gradientStyleText + ',' : '' }${ this.progressStyleText || '' }`;
  }

  *[Symbol.iterator]() {
    for ( const prop in this ) {
      yield this[prop];
    }
  }

  public get progress(): number | undefined {
    return this._progress;
  }
  
  public set progress( value: number | undefined ) {
    this._progress = clamp( value );

    this.strProgress = `${ ( this._progress ).toString() }%`;
    this.remaining = `${ ( 100 - this._progress ).toString() }%`;

    this.progressStyleText = `linear-gradient(${ this.progressRotation }, ${ this.progressColor } ${ this.strProgress }, ${ this.progressBackground } 0%, ${ this.progressBackground } ${ this.remaining })`;
    this.backgroundImage = `${ this.isGradient ? this.gradientStyleText + ',' : '' }${ this.progressStyleText || '' }`;
  }

  [key: string]: string | number | boolean | undefined;
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