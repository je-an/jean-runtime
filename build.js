({
    baseUrl: '.',
    out: 'dist/jean-runtime.js',
    optimize: 'none',
    name: 'node_modules/jean-amd/dist/jean-amd',
    include: ["src/Runtime"],
    wrap: {
        start: 
        "(function (root, factory) { \n" +
        " \t if (typeof define === 'function' && define.amd) { \n" +
        "\t \t define([], factory); \n" +
        "\t} else { \n" +
        "\t \troot.Runtime = root.Runtime || {}; \n" +
        "\t \troot.Runtime = factory();\n" +
        "\t}\n" +
        "}(this, function() {",
        end:
        "\n \t return require('src/Runtime'); \n" +
        "}));"
    },
     paths:{
        TypeCheck: "node_modules/jean-type-check/src/TypeCheck",
        Failure: "node_modules/jean-failure/src/Failure",
        List: "node_modules/jean-list/src/List"
    }
})