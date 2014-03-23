({
  baseUrl: "../js/libs",
  paths: {
    "app": "../app",
    "utils": "../utils"
  },
  mainConfigFile: "../js/app.js",
  name: "almond",
  include: "../app",
  out: "../js/built.js",
  insertRequire: ["../app"],
  wrap: true,
  optimizeCss: "standard",
  optimize: "uglify2"
})