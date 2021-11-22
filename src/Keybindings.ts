import { ICommand } from './types';

class KeyCommand {
  readonly key: string;
  private _command: ICommand;

  constructor( keyName: string, command: ICommand ) {
    this.key = keyName;
    this._command = command;
    window.addEventListener( 'keydown', this.keypressCallback, false );
  }

  keypressCallback( evt: KeyboardEvent ) {
    return ( evt.key === this.key ) ? this._command.execute() : {};
  }

  set command( cmd: ICommand ) {
    this._command = cmd;
  }
}

export class Keybindings {
  /// < key, command >
  static keymap: Map<string, KeyCommand>;

  static setKeymap( newMap: Map<string, KeyCommand> ) {
    Keybindings.keymap = newMap;
  }


  static setKey( key: string, command: KeyCommand ) {
    Keybindings.keymap.set( key, command );
  }
}