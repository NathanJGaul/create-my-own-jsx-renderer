/**
 * A helper function to create a virtual DOM node.
 *
 * @function
 * @param {string} nodeName - The type of the DOM node.
 * @param {Object} attributes - The attributes of the DOM node.
 * @param {...*} args - The children of the DOM node, can be a string or another virtual DOM node.
 * @returns {Object} A virtual DOM node.
 */
const h = (nodeName, attributes, ...args) => {
  // Combining all children into an array, or setting to null if there are no children
  const children = args.length ? [].concat(...args) : null;

  // Returning a virtual DOM node object with the nodeName, attributes, and children
  return { nodeName, attributes, children };
};

/**
 * A Fragment component that returns its children.
 * Useful for grouping multiple elements without adding an extra node to the DOM.
 *
 * @function
 * @param {Object} props - The properties of the Fragment, including children.
 * @returns {*[]} The children of the Fragment.
 */
const Fragment = (props) => props.children;

/**
 * A function to convert a virtual DOM node into a real DOM node.
 *
 * @function
 * @param {Object|string} vnode - The virtual DOM node or a string for text nodes.
 * @returns {Node} The real DOM node.
 */
const render = (vnode) => {
  // Creating a text node if vnode is a string
  if (typeof vnode === "string") return document.createTextNode(vnode);

  // Creating a document fragment if vnode is a Fragment, and appending its children to it
  if (vnode.nodeName === Fragment) {
    const fragment = document.createDocumentFragment();
    (vnode.children || []).forEach((c) => fragment.appendChild(render(c)));
    return fragment;
  }

  // Creating a DOM element with the specified nodeName
  const n = document.createElement(vnode.nodeName);

  // Setting the attributes of the DOM element
  const a = vnode.attributes || {};
  Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));

  // Rendering and appending child elements to the DOM element
  (vnode.children || []).forEach((c) => n.appendChild(render(c)));

  // Returning the fully constructed DOM element
  return n;
};

// Getting the 'app' element from the DOM to append the content to
const app = document.getElementById("app");

// Creating a string of words to be split and rendered as a list
const words = "Testing one two three";

// Splitting the string into an array of words and mapping each word to an <li> element
word_list = words.split(" ").map((w) => <li>{w}</li>);

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
