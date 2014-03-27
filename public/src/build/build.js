({
  appDir: "../",
  baseUrl: "js/libs",
  paths: {
    "app": "../app",
    "utils": "../utils"
  },
  mainConfigFile: "../js/app.js",
  wrapShim: true,
  dir: "../../dist",
  name: "app",
  optimizeCss: "standard",
  optimize: "uglify2"
})