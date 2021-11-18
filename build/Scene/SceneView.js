import { CSSAttributes } from '../CSSAttributes';
import { CSSEditor } from '../CSSEditor';
class SceneView {
    constructor() {
        CSSEditor.from(document.body, new CSSAttributes({
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
            position: 'relative',
            margin: '0',
            padding: '0'
        }));
    }
}
