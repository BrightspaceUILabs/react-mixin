import './react-counter.js'
import { LitElement, html } from "lit";

class EntryPoint extends LitElement {

    static get properties() {
        return {
            startCount: { attribute: false, }
        }
    }

    constructor() {
        super();
        this.startCount = 5;
        this.count = 5;
    }

    handleChange(e) {
        this.count = e.detail;
    }

    handleClick() {
        this.count += 1;
        this.startCount = this.count;
    }

    render() {
        return html`
            <react-counter start="${this.startCount}" @change="${this.handleChange}"></react-counter>
            <button @click="${this.handleClick}">Increment from Lit</button>
        `
    }
}
customElements.define("entry-point", EntryPoint);