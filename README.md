## Description

Provides an runtime environment for browser based apps

## Support
Supports both CommonJS and AMD eco system. If there is no loader, Runtime is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var obj = new Runtime();
```
- Use it with require.js
```js
require(["path/to/Runtime"], function(Runtime){
    // Work with Runtime
});
```
- Use it with node.js
```js
var Runtime = require("jean-runtime");
```
## Installation

`npm install jean-runtime --save --legacy-bundling`

## API Reference

TBD

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT