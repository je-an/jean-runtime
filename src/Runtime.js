define(["List", "Failure", "TypeCheck"], function (List, Failure, TypeCheck) {
    var components = new List({ idProperty: "id" });
    /**
     * Provides an runtime environment for browser based apps 
     * @alias Runtime 
     */
    return {
        /** @param {Object} component - a runtime component */
        add: function (component) {
            if (TypeCheck.isString(component.id) &&
                TypeCheck.isFunction(component.onComponentWire) &&
                TypeCheck.isFunction(component.onComponentStart) &&
                TypeCheck.isFunction(component.onRuntimeReady)) {
                components.onComponentWire();
                components.addElement(component);
            } else {
                Failure.throwTypeError("component is invalid");
            }
            return true;
        },
        /** @param {Object} options - runtime options */
        run: function (options) {
            if (!TypeCheck.isObject(options)) {
                Failure.throwTypeError("options is not an object");
            }
            components.forEachElement(function (component) {
                component.onComponentStart(options);
            });
            components.forEachElement(function (component) {
                component.onComponentsReady(options);
            });
            return true;
        }
    };
}); 