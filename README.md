# Basic JSX Implementation 🚀

Created following [Jason Miller's](https://github.com/developit) tutorial [WTF is JSX](https://jasonformat.com/wtf-is-jsx/).

A minimal implementation of JSX in pure JavaScript.

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

## Features ✨

- **Lightweight:** No dependencies, no build step, no heavy runtime.
- **Intuitive:** Use JSX syntax directly in your JS/HTML files.
- **Flexible:** Includes a Fragment component for returning multiple elements.

## Usage Example 🛠️

You can use the above implementation directly. Here's an example of how to create and render JSX elements into the DOM.

```js
const app = document.getElementById("app");
const words = "Testing one two three";
const wordList = words.split(" ").map((w) => h("li", null, w));

const vdom = (
  <>
    <div id="foo">Hello!</div>
    <ul>{wordList}</ul>
  </>
);

app.appendChild(render(vdom));
```

This will render a div with "Hello!" and an unordered list of the words into the DOM element with the id app.
