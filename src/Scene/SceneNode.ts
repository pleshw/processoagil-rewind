import { Scene } from './Scene';

export interface SceneNode<T extends Scene> {
  nextScene: T | null;
  prevScene: T | null;

  prev(): T;
  next(): T;
}