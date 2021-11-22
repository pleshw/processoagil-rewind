export enum ComponentAnimationRenderOrder {
  Random,
  Ordered,
  Sync
}

export interface ICommand {
  execute(): void;
}