## Description

Provides an runtime environment for browser based apps

## Support
Supports AMD eco system. If there is no loader, Runtime is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
// Add a component to the runtime
Runtime.add({
    id: "Component",
    // Gets called, for connection the component with other modules
    onComponentWire: function () { // jscs:ignore

    },
    // Gets called, for initialisation of components functionality
    onComponentStart: function () { // jscs:ignore

    },
    // Gets called after all components are started
    onComponentsReady: function () { // jscs:ignore

    }
});
// Starts the runtime / web app
Runtime.run({ options: "test" });
```
- Use it with require.js
```js
require(["path/to/Runtime"], function(Runtime){
    // Work with Runtime
});
```
## Installation

`npm install jean-runtime --save --legacy-bundling`

## API Reference

### Runtime.add(component) 

Adds an component to the runtime

**Parameters**
- **component**: `Object` - a component

**Returns**
- `Boolean` - True, if the component ist added to runtime, exception otherwise

### Runtime.run(options) 

starts the runtime

**Parameters**
- **options**: `Object` - runtime options

**Returns**
- `Boolean` - True, if the runtime is started, false otherwise

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT