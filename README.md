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

## Events

The typical react pattern for passing data from a child to a parent is to use a callback. The parent passes the child a callback and the child uses that callback to pass data to the parent.

In Lit you would instead have a function of the child dispatch an event that the parent can listen to to capture data from the child. 

This mixin allows you to convert between these patterns by filling out the `callbacks` static getter.

Example

```javascript
class ReactElement extends ReactMixin(LitElement) {
    static get callbacks {
        return {
            onChange: { name: 'change' }
        }
    }
}
customElements.define('react-elm', ReactElement);


class MyElement extends LitElement {

    handleChange({detail}) {
        // detail contains the data passed in by the react function
        // e.g detail[0] is th first argument of the callback.
    }

    render() { 
        return html`<react-elm @change=${this.handleChange}></react-em>`
    }
}
```

## Notes

We get to leverage lit elements attribute type casting which is great :)
We get to use common lit patterns like event data bindings.