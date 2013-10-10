require.config({
  baseUrl: 'js/libs',
  paths: {
    'app': '../app',
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'bootstrap': ['jquery']
  }
});

define(['jquery', 'bootstrap', 'backbone'], function($, Backbone) {

  var App = Backbone.View.extend({
    
    initialize: function() {
      console.log("ss");
    }
    
  });

});