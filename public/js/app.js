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

define(['jquery', 'backbone', 'bootstrap'], function($, Backbone) {

  var App = Backbone.View.extend({
    
    initialize: function() {
      console.log("ss");
    }
    
  });
  
  var Router = Backbone.Router.extend({
  
    routes: {
      '': 'index',
      'help': 'help'
    },
    
    index: function() {
      console.log("index...");
    },
    
    help: function() {
      console.log("help...");
    }
    
  });
  
  var router = new Router();
  
  Backbone.history.start();

});



