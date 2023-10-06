/**
 * A helper function to create a virtual DOM node.
 *
 * @function
 * @param {string} nodeName - The type of the DOM node.
 * @param {Object} attributes - The attributes of the DOM node.
 * @param {...*} args - The children of the DOM node, can be a string or another virtual DOM node.
 * @returns {Object} A virtual DOM node.
 */
export const h = (nodeName, attributes, ...args) => {
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
export const Fragment = (props) => props.children;

/**
 * A function to convert a virtual DOM node into a real DOM node.
 *
 * @function
 * @param {Object|string} vnode - The virtual DOM node or a string for text nodes.
 * @returns {Node} The real DOM node.
 */
export const render = (vnode) => {
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
