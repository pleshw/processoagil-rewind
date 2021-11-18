import { IComponentAnimation } from './IComponentAnimation';

export abstract class SceneComponent {
  htmlElement: HTMLElement;
  inAnimation?: IComponentAnimation;
  outAnimation?: IComponentAnimation;
  idleAnimation?: IComponentAnimation;

  constructor( _htmlElement: HTMLElement, _inAnimation?: IComponentAnimation, _outAnimation?: IComponentAnimation, _idleAnimation?: IComponentAnimation ) {
    this.htmlElement = _htmlElement;
    this.inAnimation = _inAnimation;
    this.outAnimation = _outAnimation;
    this.idleAnimation = _idleAnimation;
  }

  /// Retorna uma promise que se resolve quando as midias do componente forem carregadas
  public abstract load(): Promise<boolean>;

  /// Retorna uma promise que se resolve depois que a animação de entrada for carregada e
  /// a animação padrão do componente estiver rodando
  public async render(): Promise<void> {
    await this.inAnimation?.animate( this );

    this.idleAnimation?.animate( this ).then( () => {
      this.outAnimation?.animate( this );
    } );
  }
}