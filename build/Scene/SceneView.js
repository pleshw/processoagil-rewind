export class SceneView {
    constructor() {
        this.index = 0;
        this.scenes = document.querySelectorAll('.scene');
    }
    scrollToScene(index) {
        const scene = this.scenes[this.index = index];
        scene.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        return scene;
    }
    prev() {
        return this.scrollToScene(--this.index);
    }
    next() {
        return this.scrollToScene(++this.index);
    }
}
