import { SceneComponent } from './ISceneComponent';
export interface IComponentAnimation {
  animate( target: SceneComponent ): Promise<void>;
}