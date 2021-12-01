export class SceneView {
    static scrollToSceneById(id) {
        const sceneIndex = this.scenes.findIndex(s => s.id === id);
        return this.scrollToScene(sceneIndex);
    }
    static scrollToScene(index) {
        if (index >= this.scenes.length)
            return this.scrollToScene(this.scenes.length - 1);
        if (index < 0)
            return this.scrollToScene(0);
        /// Escondendo cena antiga
        this.scenes[this.index].hideContent();
        /// Pegando cena nova > instanciando novo index > mostrando conteúdo da nova cena
        return this.scenes[this.index = index].showContent();
    }
    static prev() {
        if ((this.index - 1) < 0)
            return this.scrollToScene(0);
        return this.scrollToScene(this.index - 1);
    }
    static next() {
        if ((this.index + 1) > this.scenes.length)
            return this.scrollToScene(this.scenes.length - 1);
        return this.scrollToScene(this.index + 1);
    }
    static get(index) {
        if (index < 0)
            return this.scenes[0];
        if (index > this.scenes.length - 1)
            return this.scenes[this.scenes.length - 1];
        return this.scenes[index];
    }
    static first() {
        return this.scenes[0];
    }
    static last() {
        return this.scenes[this.scenes.length - 1];
    }
    static updateControllers() {
        const currSceneCounter = document.getElementById('currSceneCounter');
        if (currSceneCounter) {
            currSceneCounter.innerHTML = (this.index + 1).toString();
        }
    }
    static createControllers() {
        document.body.insertAdjacentHTML('afterbegin', `
    <div id="sceneControllers">
      <span id="prevScene"><i class="arrow up"></i></span>
      <div id="sceneControllersCounters">
        <span id="currSceneCounter">${this.index + 1}</span>
        <span id="sceneControllerHr">/</span>
        <span id="totalSceneCounter" style="font-size: 15px; align-self: flex-end;">
          ${this.scenes.length}
        </span>
      </div>
      <span id="nextScene"><i class="arrow down"></i></span>
    </div>`);
    }
}
SceneView.index = 0;
SceneView.scenes = [];
SceneView.currScrollInterval = 0;
