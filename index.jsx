/**
 * Creates a virtual DOM node.
 *
 * @param {string} nodeName - The name of the DOM node.
 * @param {Object} attributes - The attributes of the DOM node.
 * @param {...*} children - The children of the DOM node.
 * @returns {Object} A virtual DOM node.
 */
const h = (nodeName, attributes, ...children) => ({
  nodeName,
  attributes,
  children: children.length ? children : null,
});

/**
 * Fragment component for grouping children nodes without adding extra nodes to the DOM.
 *
 * @param {Object} props - The properties of the Fragment, including children.
 * @returns {*[]} The children of the Fragment.
 */
const Fragment = (props) => props.children;

/**
 * Converts a virtual DOM node into a real DOM node.
 *
 * @param {Object|string} vnode - The virtual DOM node or a string for text nodes.
 * @returns {Node} A real DOM node.
 */
const render = (vnode) => {
  if (typeof vnode === "string") return document.createTextNode(vnode);

  if (vnode.nodeName === Fragment) {
    // Creating a DocumentFragment to hold children of the Fragment
    const fragment = document.createDocumentFragment();
    vnode.children.forEach((child) => fragment.appendChild(render(child)));
    return fragment;
  }

  const n = document.createElement(vnode.nodeName);

  const a = vnode.attributes || {};
  Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));

  const c = vnode.children || [];
  c.forEach((child) => n.appendChild(render(child)));

  return n;
};

const app = document.getElementById("app");
const words = "Testing one two three";
const wordList = words.split(" ").map((w) => <li>{w}</li>);
const vdom = (
  <>
    <div id="foo">Hello!</div>
    <ul>{wordList}</ul>
  </>
);

// Append the rendered virtual DOM structure into the actual DOM
app.appendChild(render(vdom));

// Convert the virtual DOM structure into JSON and append it into the actual DOM inside a <pre> tag
app.appendChild(
  render(<pre id="vdom">{JSON.stringify(vdom, null, "  ")}</pre>)
);
