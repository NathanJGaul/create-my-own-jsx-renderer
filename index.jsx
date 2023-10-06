/*
 * Vite (using esbuild) transpiles JSX to 'h' function calls
 * e.g. <div id="foo">Hello!</div> --> h("div", {id:"foo"}, "Hello!")
 * see 'vite.config.js' for configuration
 */
const h = (nodeName, attributes, ...args) => {
  const children = args.length ? [].concat(...args) : null;
  return { nodeName, attributes, children };
};

const Fragment = (props) => props.children;

const render = (vnode) => {
  // If vnode is a string, create a new text node
  if (typeof vnode === "string") return document.createTextNode(vnode);

  // Check if vnode is a Fragment
  if (vnode.nodeName === Fragment) {
    const fragment = document.createDocumentFragment();
    (vnode.children || []).forEach((c) => fragment.appendChild(render(c)));
    return fragment;
  }

  // Create the DOM element
  const n = document.createElement(vnode.nodeName);

  // Set all attributes on the DOM element
  const a = vnode.attributes || {};
  Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));

  // Render all children
  (vnode.children || []).forEach((c) => n.appendChild(render(c)));

  return n;
};

const app = document.getElementById("app");

const words = "Testing one two three";
word_list = words.split(" ").map((w) => <li>{w}</li>);

const vdom = (
  <>
    <div id="foo">Hello!</div>
    <ul>{word_list}</ul>
  </>
);

const dom = render(vdom);

app.appendChild(dom);

let json = JSON.stringify(vdom, null, "  ");

app.append(render(<pre id="vdom">{json}</pre>));
