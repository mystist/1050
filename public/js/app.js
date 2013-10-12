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

define(['jquery', 'backbone', 'app/models/song-model', 'bootstrap'], function($, Backbone, SongModel) {

  var App = Backbone.View.extend({
    
    songs: null,
    
    initialize: function() {
      this.initSongs();
    },
    
    initSongs: function() {
      this.songs = new SongModel.Songs();
      this.songs.on('reset', this.showSongs, this);
      this.songs.fetch({reset: true});
    },
    
    showSongs: function() {
      console.log(this.songs.toJSON());
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



