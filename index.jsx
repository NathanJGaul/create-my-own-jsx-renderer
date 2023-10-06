import { h, Fragment, render } from "./simpleJSX";

// Getting the 'app' element from the DOM to append the content to
const app = document.getElementById("app");

// Creating a string of words to be split and rendered as a list
const words = "Testing one two three";

// Splitting the string into an array of words and mapping each word to an <li> element
const word_list = words.split(" ").map((w) => <li>{w}</li>);

// Creating a virtual DOM structure using the Fragment to group the elements
const vdom = (
  <>
    <div id="foo">Hello!</div>
    <ul>{word_list}</ul>
  </>
);

// Rendering the virtual DOM structure to a real DOM node
const dom = render(vdom);

// Appending the real DOM node to the 'app' element in the DOM
app.appendChild(dom);

// Converting the virtual DOM structure to a JSON string with indentation
let json = JSON.stringify(vdom, null, "  ");

// Rendering and appending the JSON string to the 'app' element as a <pre> element
app.append(render(<pre id="vdom">{json}</pre>));
