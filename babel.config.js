module.exports = {
  "env": {
    "test": {
      "presets": [
        ["@babel/env", {"modules": false}],
      ],
      "plugins": [
        "@babel/plugin-transform-modules-commonjs",
        "syntax-dynamic-import",
        "@babel/plugin-transform-runtime"
      ]
    }
  }
}