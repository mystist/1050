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
      this.initSongs();
    },
    
    initSongs: function() {
      var songs = new Songs();
      songs.fetch();
    }
    
  });
  
  var app = null;
  
  var Router = Backbone.Router.extend({
  
    routes: {
      '': 'index'
    },
    
    index: function() {
      app = new App();
    }
    
  });
  
  var router = new Router();
  
  Backbone.history.start();

});



