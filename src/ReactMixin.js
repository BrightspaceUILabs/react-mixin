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

        get props() {
            const properties = Object.keys(this.constructor.properties);
            return properties.reduce((obj, key) => fillIn(obj, key, this[key]), {})
        }

        get events() {
            return Object.entries(this.constructor.callbacks);
        }

        connectedCallback() {
            super.connectedCallback();
            this.root = ReactDOM.createRoot(this.shadowRoot);
        }

        render() {
            const reactElm = this.constructor.react;
            const props = this.props;
            const events = this.events;
            const that = this;
            events.forEach(([key, value]) => {
                props[key] = (...detail) => {
                    that.dispatchEvent(new CustomEvent(value.name, {detail}))
                }
            });
            this.root.render(html`<${reactElm} ...${props}/> `);

        }
    }