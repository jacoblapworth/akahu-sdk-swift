const babel = require("rollup-plugin-babel");

module.exports = {
    entry: "src/XUIIconBlob.js",
    format: 'umd',
    dest: 'build/bundle.js',
    moduleName: 'XUIIconBlob',
    plugins: [
        babel({
            exclude: "node_modules/**",
            presets: [
                ["es2015", { "modules": false }],
                "react"
                ],
            babelrc: false
        })
    ]
};
