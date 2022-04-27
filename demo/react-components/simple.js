import htm from 'htm';
const html = htm.bind(React.createElement)
const { useState } = React;

export default function Counter(props) {
    const [count, setCount] = useState(props.start);

    const handleClick = (e) => {
        setCount(count + 1);
        // callback for parent
        props.onChange(count + 1);
    }

    return html`
    <div>
        <h1>React State: ${count}</h1>
        <h1>Lit Shared State: ${props.start}</h1>
        <button onClick=${handleClick}>
            Increment
        </button>
    </div>
    `;
}