module.exports = {
  "presets": [
    ["@babel/env", {"modules": false}],
  ],
  "env": {
    "test": {
      "plugins": [
        "@babel/plugin-transform-modules-commonjs",
        "syntax-dynamic-import",
        "@babel/plugin-transform-runtime"
      ]
    }
  }
}