import htm from 'htm';
const html = htm.bind(React.createElement)

const fillIn = (obj, key, value) => {
    obj[key] = value;
    return obj;
}
// This mixin will allow you to pass properties into a react component
// You can also pass in a callback which is reacts standard way of passing data
// We don't use update or render
export const ReactElement = (s) =>
    class ReactWrapper extends s {
        connectedCallback() {
            super.connectedCallback();
            const reactElm = this.constructor.react;
            const properties = Object.keys(this.constructor.properties);
            const propsForElm = properties.reduce((obj, key) => fillIn(obj, key, this[key]), {})
            this.root = ReactDOM.createRoot(this.shadowRoot);

            this.root.render(html`<${reactElm} ...${propsForElm}/> `);
        }

        render() {
            const reactElm = this.constructor.react;
            const properties = Object.keys(this.constructor.properties);
            const propsForElm = properties.reduce((obj, key) => fillIn(obj, key, this[key]), {})
            this.root.render(html`<${reactElm} ...${propsForElm}/> `);
        }
    }