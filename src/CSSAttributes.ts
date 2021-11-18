export class CSSAttributes {
  width?: string;
  height?: string;
  position?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  transition?: string;

  constructor( props: CSSProps = {} ) {
    this.width = props.width;
    this.height = props.height;
    this.position = props.position;
    this.margin = props.margin;
    this.padding = props.padding;
    this.backgroundColor = props.backgroundColor;
    this.left = props.left || props.x;
    this.top = props.top || props.y;
    this.backgroundImage = props.backgroundImage;
    this.transition = props.transition;


    if ( props.gradient ) {
      this.backgroundImage = `linear-gradient(${ props.gradientRotation || '180deg' }, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0))`;
    }

    if ( props.isProgressBar ) {
      const progressRotation = `${ props.progressRotation || '90deg' }`;
      const progressColor = `${ props.progressColor || 'transparent' }`;
      const progressBackground = `${ props.progressBackground || 'blue' }`;

      const tmpProgress = props.progress || 0;
      const progress = `${ ( tmpProgress ).toString() }%`;
      const remaining = `${ ( 100 - tmpProgress ).toString() }%`;

      const progressGradient = `linear-gradient(${ progressRotation }, ${ progressColor } ${ progress }, ${ progressBackground } 0%, ${ progressBackground } ${ remaining })`;

      this.backgroundImage = this.backgroundImage
        ? `${ this.backgroundImage },${ progressGradient }`
        : progressGradient;
    }
  }

  *[Symbol.iterator]() {
    for ( const prop in this ) {
      yield this[prop];
    }
  }

  [key: string]: string | undefined;
};

type CSSProps = {
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

  gradient?: boolean;
  gradientRotation?: string;

  isProgressBar?: boolean;
  progressRotation?: string;
  progressColor?: string;
  progressBackground?: string;
  progress?: number;
}