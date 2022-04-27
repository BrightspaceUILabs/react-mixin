# React Mixin

A mixin that allows you to use react functional components with lit element.

## Example

``` javascript
import Counter from '../react-components/counter';

class ReactCounter extends ReactElement(LitElement) {
    // properties will be sent to the react element as props
    static get properties() {
        return {
            // example of an attribute
            start: {type: Number, attribute: true},
            // example of a callback (React's standard way of passing data to a parent)
            onChange: { attribute: false }
        }
    }
    static get react() {
        // the react component in question
        return Counter
    }
}
customElements.define('react-counter', ReactCounter);
```

The above will let us call our counter like so:

```javascript
return html`
    <react-counter start="${this.start}" .onChange="${this.handleChange}"></react-counter>
`
```

## Notes

We get to leverage lit elements attribute type casting which is great :)

It would be nice to extend this so that you can define events that map to a callback given to the react element.