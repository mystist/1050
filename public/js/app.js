require.config({
  baseUrl: 'js/libs',
  paths: {
    'app': '../app',
    'utils': '../utils'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'helper': {
      exports: 'helper'
    },
    'bootstrap': ['jquery']
  }
});

define(['jquery', 'backbone', 'utils/utils', 'app/models/song-model', 'app/views/song-view', 'bootstrap'], function($, Backbone, utils, SongModel, SongView) {

  var App = Backbone.View.extend({
    
    songs: null,
    
    initialize: function() {
      utils.setGlobalAjaxSettings();
    },
    
    initSongs: function(url) {
      this.songs = new SongModel.Songs();
      this.songs.url = url;
      this.songs.fetch({success: function() {
        app.showSongs();
      }});
    },
    
    showSongs: function() {
      var showSongView = new SongView.ShowSongView({model: this.songs});
      var songListView = new SongView.SongListView({model: this.songs});
    }
    
  });
  
  var app = new App();
  
  var Router = Backbone.Router.extend({
  
    routes: {
      '': 'showSongs',
      'songs/:categoryName': 'showSongs',
      'modification': 'editSong',
      'modification/:id': 'editSong'
    },
    
    showSongs: function(categoryName) {
      if(!categoryName) {
        app.initSongs('/songs');
      } else {
        app.initSongs('/songs_category/'+encodeURIComponent(categoryName));
      }
    },
    
    editSong: function(id) {
      var song = new SongModel.Song();
      var showSong = function() {
        var editSongView = new SongView.EditSongView({model: song});
      };
      if(id) {
        song = new SongModel.Song({id: id});
        if(app.songs) {
          song.set(app.songs.get(id).toJSON());
          showSong();
        } else {
          song.fetch({success: function() {
            showSong();
          }});
        }
      } else {
        showSong();
      }
    }
    
  });
  
  var router = new Router();
  
  Backbone.history.start();
  
  return app;

});



