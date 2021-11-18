export class SceneScaffold {
    constructor(sceneId, position, dimensions) {
        this.element = document.createElement('div');
        this.element.id = 'scaffold' + sceneId;
    }
    render(arg0) {
        throw new Error('Method not implemented.');
    }
    add(component) {
        throw new Error('Method not implemented.');
    }
}
