({
  baseUrl: "../js/libs",
  paths: {
    "app": "../app",
    "utils": "../utils"
  },
  mainConfigFile: "../js/app.js",
  name: "almond",
  out: "../js/built.js",
  include: "app",
  insertRequire: ["app"],
  wrap: true,
  optimizeCss: "standard",
  optimize: "uglify2"
})