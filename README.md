<p align="center">
  <a href="https://www.npmjs.com/package/mustargs" target="_blank" rel="noopener noreferrer">
    <img width="180" src="mustargs.png" alt="mustargs logo" />
  </a>
</p>
<br/>
<p align="center">
  <a href="https://www.npmjs.com/package/@toolx/core"><img src="https://img.shields.io/npm/v/mustargs" alt="npm package"></a>
  <img alt="NPM" src="https://img.shields.io/npm/l/mustargs">
  <a href="https://github.com/toolx-dev/mustargs/actions/workflows/node.js.yml">
      <img src="https://github.com/toolx-dev/mustargs/actions/workflows/node.js.yml/badge.svg" alt="Workflow status badge" loading="lazy">
  </a>
</p>
<br/>

# mustargs

## Introduction
`mustargs` is a minimalistic library designed for parsing command-line arguments in Node.js applications. It serves as a lightweight alternative to more extensive libraries like `yargs`, focusing on simplicity and ease of use. With `mustargs`, you can effortlessly convert CLI commands into a structured JavaScript object, making command-line data handling more intuitive and straightforward.

## Features
- **ESModule Support**: `mustargs` is implemented as an ESModule, ensuring compatibility with modern JavaScript projects.
- **Nested Object Parsing**: Easily parse command-line arguments into nested objects using dot notation.
- **Array Parsing**: Arguments separated by commas or spaces are parsed into arrays.
- **Type Parsing**: Automatically converts numeric values to numbers.

## Installation

`mustargs` is available as an independent package on npm and can be installed in your Node.js project. Since it is exclusively an ESModule, ensure your environment supports ESModule syntax. To install `mustargs`, run the following command in your project directory:

```bash
npm install mustargs
```

## Usage
To use `mustargs`, import it into your Node.js project using ESModule syntax:

```javascript
import mustargs from 'mustargs';

const args = mustargs(process.argv.slice(2));
```

## Simulation
This script simulates command-line input and uses mustargs to parse the arguments into a JavaScript object.

```javascript
const simulatedInput = [
    'node', 'example.js', '-i', 'images', '--api', 'resize.width=512', 'resize.height=256', 'sizes=256,512', '--format', 'jpeg', 'png'
];

const parsedArgs = mustargs(simulatedInput.slice(2));

/** output
{
  i: "images",
  api: {
    resize: {
        width: 512,
        height: 256,
    },
    sizes: [256, 512]
  },
  format: ["jpeg", "png"]
}
*/
```

## Important: Setting `type` to `module` in `package.json`

When using `mustargs` in your project, it's crucial to ensure that your Node.js environment recognizes ESModule syntax. For this, you need to add the following line to your project's `package.json`:

```json
{
    "type": "module",
}
```

## Contributing
Contributions to `mustargs` are welcome. This library is part of the [toolx](https://github.com/williammanco/toolx) library.

## License
`mustargs` is licensed under the MIT License.

