(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.Runtime = root.Runtime || {}; 
	 	root.Runtime = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            var mod = factory.apply(factory, resolvedModules);
            modules.resolved[id] = mod ? mod : {};
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('TypeCheck',[], function () {
    return {
        /**
         * Checks if provided element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if provided element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            return !this.isArray(o) && o !== null && typeof o === 'object';
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = false;
            if (this.isObject(o) && Object.keys(o).length === 0) {
                isEmpty = true;
            }
            return isEmpty;
        },
        /**
        * Checks if provided element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if provided element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if provided element is an array
         * @public 
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - true if o is an array, false otherwise
         */
        isArray: function (o) {
            return Array.isArray(o);
        },
        /**
         * Check id provided element is an empty array
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - True if o is an empty array, false otherwise
         */
        isEmptyArray: function (o) {
            return this.isArray(o) && (o.length === 0);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        },
        /**
          * Checks if all objects within array have the same instance
          * @public
          * @memberof TypeCheck
          * @throws {TypeError} - If array is not an array
          * @throws {TypeError} - If constructor is not a function
          * @param {Object[]} array - The array which objects shall be checked
          * @param {Function} fn - the constructor function
          * @returns {Boolean} - True if all elements have the same instance, false otherwise
          */
        areObjectsInstanceOf: function (array, fn) {
            if (!this.isArray(array)) {
                throw new TypeError("array is not an array");
            }
            if (!this.isFunction(fn)) {
                throw new TypeError("fn is not a function");
            }
            var i, o, length = array.length, result = true;
            for (i = 0; i < length; i++) {
                o = array[i];
                if (!this.isObject(o) || !this.isInstanceOf(o, fn)) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if the objects have are instances of the provided constructors
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If array is not an array
         * @throws {TypeError} - If constructors is not an array
         * @param {Object[]} objects - The array which objects shall be checked
         * @param {Function[]} constructors - An array of constructor functions
         * @returns {Boolean} - True if all elements have the same instance, false otherwise
         */
        areObjectsInstancesOf: function (objects, constructors) {
            var i, j, o, length = objects.length, constructorLength = constructors.length, result = true, noConstructorMatched;
            if (!this.isArray(objects)) {
                throw new TypeError("objects is not an array");
            }
            if (!this.isArray(constructors)) {
                throw new TypeError("constructors is not an array");
            }
            if (!this.isArrayTypeOf(constructors, "function")) {
                throw new TypeError("constructors is not an array of constructor functions");
            }
            for (i = 0; i < length; i++) {
                o = objects[i];
                noConstructorMatched = true;
                for (j = 0; j < constructorLength; j++) {
                    if (!this.isObject(o)) {
                        break;
                    }
                    if (this.isInstanceOf(o, constructors[j])) {
                        noConstructorMatched = false;
                        break;
                    }
                }
                if (noConstructorMatched === true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if child is an instance of parent
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If child is not an object
         * @throws {TypeError} - If parent is not a function
         * @param {Object} child - The object which shall be checked
         * @param {Function} parent - The function which shall be the constructor
         * @returns {Boolean} - True if child is an instance of parent, false otherwise
         */
        isInstanceOf: function (child, parent) {
            if (!this.isObject(child)) {
                throw new TypeError("child is not an object");
            }
            if (!this.isFunction(parent)) {
                throw new TypeError("parent is not a function");
            }
            return child instanceof parent;
        },
        /**
         * Checks if the provided value is a value of the provided object which is used as an enum
         * @throws {TypeError} - If value is not a string or a number
         * @throws {TypeError} - If o is not an object
         * @param {String|Number} value - the value
         * @param {Object} o - the object which shall be checked
         * @returns {Boolean} - True if value is part of o, false otherwise
         */
        isEnumValue: function (value, o) {
            if (!this.isDefined(value)) {
                return false;
            }
            if (!this.isString(value) && !this.isNumber(value)) {
                throw new TypeError("value must be a String or a Number");
            }
            if (!this.isObject(o)) {
                throw new TypeError("o is not an object");
            }
            var keys = Object.keys(o), length = keys.length, i, isValue = false;
            for (i = 0; i < length; i++) {
                if (o[keys[i]] === value) {
                    isValue = true;
                    break;
                }
            }
            return isValue;
        }
    };
});
define('List',["TypeCheck"], function (TypeCheck) {
    /**
     * Provides a basic list implementation
     * @alias List
     * @constructor
     * @throws {TypeError} - if passed idProperty is not from type string
     * @param {Object} options - Configuration object
     * @param {String} options.idProperty - Name of the property, which will act as identifier
     * @param {Boolean} [options.checkDuplicates=false] - If true, there will be a check processed, if 
     *                                                    added elements is already in the list. Beware, that
     *                                                    this options could drop the performance.
     * @param {Object[]} [options.list=[]] - Array, which shall be maintained 
     */
    var List = function (options) {
        if (TypeCheck.isString(options.idProperty)) {
            this._idProperty = options.idProperty;
        } else {
            throw new TypeError("options.idProperty is not from type 'string'");
        }
        if (options.list) {
            if (Array.isArray(options.list) && TypeCheck.isArrayTypeOf(options.list, "object")) {
                this._list = options.list;
            } else {
                throw new TypeError("options.list is not and array or there are something else than objects within.");
            }
        } else {
            this._list = [];
        }
        this._checkDuplicates = options.checkDuplicates ? options.checkDuplicates : false;
        Object.defineProperty(this, 'length', {
            get: function () { // jscs:ignore
                return this._list.length;
            },
            configurable: true,
            enumerable: true
        });
    };
    /**   
     * Add an element to the list
     * @public
     * @memberof List
     * @throws {TypeError} - if element is not an object
     * @param {Object} element - element, which shall be added to the list
     * @returns {Boolean} - True, if the element could be added
     */
    List.prototype.addElement = function (element) {
        if (!TypeCheck.isObject(element)) {
            throw new TypeError("element is not a object");
        }
        var isAdded = false, isDuplicate = false, idProperty = this._idProperty;
        if (element.hasOwnProperty(this._idProperty)) {
            if (this._checkDuplicates) {
                this.forEachElement(function (o, i) {
                    if (element[idProperty] === o[idProperty]) {
                        isDuplicate = true;
                        isAdded = false;
                        return false;
                    }
                });
            }
            if (!isDuplicate) {
                this._list.push(element);
                isAdded = true;
            }
        }
        return isAdded;
    };
    /**
     * Provides an element from the list based on its id
     * @public
     * @memberof List
     * @throws {TypeError} - If id is not from type string
     * @param {String} id - Id of the element
     * @returns {Object|null} - The element or null if it is not in
     */
    List.prototype.getElement = function (id) {
        if (!TypeCheck.isString(id)) {
            throw new TypeError("id ist not from type string");
        }
        var list = this._list, length = list.length, idProperty = this._idProperty;
        for (var i = 0; i < length; i++) {
            var element = list[i];
            if (element[idProperty] === id) {
                return element;
            }
        }
        return null;
    };
    /**
     * Updates the element in the collection with the passed one
     * @public
     * @memberof List
     * @throws {TypeError} - If passes element is not an Object
     * @param {Object} newElement - Updated element
     * @returns {Boolean} - True if element is updated, false otherwise
     */
    List.prototype.updateElement = function (newElement) {
        if (!TypeCheck.isObject(newElement)) {
            throw new TypeError("Passed element is not an object");
        }
        if (newElement.hasOwnProperty(this._idProperty)) {
            var list = this._list, length = list.length, idProperty = this._idProperty;
            for (var i = 0; i < length; i++) {
                var element = list[i];
                if (element[idProperty] === newElement[idProperty]) {
                    list[i] = newElement;
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Deletes an element from the list based on its id
     * @public
     * @memberof List
     * @throws {TypeError} - If id is not from type string
     * @param {String} id - Id of the element
     * @returns {Boolean} - True if the element is deleted, false otherwise
     */
    List.prototype.deleteElement = function (id) {
        if (!TypeCheck.isString(id)) {
            throw new TypeError("id ist not a string");
        }
        var list = this._list, length = list.length, idProperty = this._idProperty;
        for (var i = 0; i < length; i++) {
            var element = list[i];
            if (element[idProperty] === id) {
                list[i] = {};
                list.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /**
     * Checks, if an element is part of the list
     * @public
     * @memberof List
     * @throws {TypeError} - If id is not a string
     * @param {String} id - Id of the element which shall be checked
     * @returns {Boolean} - True if the element is part of the collection, false otherwise
     */
    List.prototype.containsElement = function (id) {
        if (!TypeCheck.isString(id)) {
            throw new TypeError("id ist not a string");
        }
        return TypeCheck.isDefined(this.getElement(id)) ? true : false;
    };
    /**
     * Removes all elements from the list
     * @public
     * @memberof List
     * @returns {Boolean} - True if list is emptied, false otherwise
     */
    List.prototype.deleteAll = function () {
        var list = this._list;
        if (list.length !== 0) {
            this._list = [];
            return true;
        } else {
            return false;
        }
    };
    /** 
     * Passes every element in the list to the provided callback function
     * Beware, that this functionality is performance intensive
     * @public
     * @memberof List
     * @throws {TypeError} - If callback is not a function
     * @param {Function} callback - Get element an his index within the list as arguments
     * @example
     * var list = new List({
     *   idProperty: "id"
     * });
     * list.addElement({ id: "1" });
     * list.forEachElement(function(element,index){
     *      // Work with element and index
     * });
     */
    List.prototype.forEachElement = function (callback) {
        if (!TypeCheck.isFunction(callback)) {
            throw new TypeError("callback is not a function");
        }
        var list = this._list, length = list.length;
        for (var i = 0; i < length; i++) {
            callback(list[i], i);
        }
    };
    /**
     * Provides an array with the values from the list
     * @returns {Object[]} - list values
     */
    List.prototype.toArray = function () {
        return this._list;
    };
    /**
     * Provides the index of the element, if it is part of the list
     * @throws {TypeError} - If o is not an object
     * @param {Object} o - Object for which the index shall be retrieved
     * @returns {Number} - index of the element within the list or -1 if the element is not
     *                     part of the list.  
     */
    List.prototype.indexOf = function (o) {
        if (!TypeCheck.isObject(o)) {
            throw new TypeError("o is not an object");
        }
        return this._list.indexOf(o);
    };
    /**
     * Moves the element of currentIndex to the position of newIndex.
     * @throws {TypeError} - If currentIndex or newIndex are not numbers
     * @throws {Error} - If currentIndex or newIndex are not positive
     * @throws {Error} - If currentIndex or newIndex is bigger then list length
     * @param {Number} currentIndex - Index of object, which shall be moved
     * @param {Number} newIndex - Moves the object behind currentIndex to newIndex
     */
    List.prototype.moveIndex = function (currentIndex, newIndex) {
        if (!TypeCheck.isNumber(currentIndex) || !TypeCheck.isNumber(newIndex)) {
            throw new TypeError("currentIndex or newIndex are not numbers");
        }
        if (currentIndex < 0 || newIndex < 0) {
            throw new Error("currentIndex/newIndex are must be positive");
        }
        if (currentIndex > (this.length - 1) || newIndex > (this.length - 1)) {
            throw new Error("currentIndex or newIndex is bigger then list length");
        }
        if (newIndex >= this.length) {
            var k = newIndex - this.length;
            while ((k--) + 1) {
                this._list.push(undefined);
            }
        }
        this._list.splice(newIndex, 0, this._list.splice(currentIndex, 1)[0]);
    };
    return List;
});
define('Failure',[], function () {
    /**
     * Provides error throwing functionality 
     * @alias Failure 
     */
    return {
        /**
         * Throws an Error with the provided errorMessage
         * @throws {Error}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this Error
         */
        throwError: function (errorMessage) {
            throw new Error(errorMessage);
        },
        /**
         * Throws an TypeError with the provided errorMessage
         * @throws {TypeError}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this TypeError
         */
        throwTypeError: function (errorMessage) {
            throw new TypeError(errorMessage);
        }
    };
});
define('src/Runtime',["List", "Failure", "TypeCheck"], function (List, Failure, TypeCheck) {
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

 	 return require('src/Runtime'); 
}));
