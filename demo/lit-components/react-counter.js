import Counter from '../react-components/simple';

import { LitElement } from "lit";
import { ReactElement } from '../../src/ReactMixin';

class ReactCounter extends ReactElement(LitElement) {
    static get properties() {
        return {
            start: {type: Number, attribute: true},
        }
    }
    static get react() {
        return Counter
    }
    static get callbacks() {
        return {
            onChange: { name: 'change' }
        }
    }
}
customElements.define('react-counter', ReactCounter);