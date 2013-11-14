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
    'plupload/zh_CN': {
      deps: ['plupload/plupload'],
      exports: 'plupload'
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
      var showSongView = new SongView.ShowSongView({collection: this.songs});
      var songsView = new SongView.SongsView({collection: this.songs});
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
        song.fetch({success: function() {
          showSong();
        }});
        // if(app.songs&&app.songs.get(id)) {
          // song.set(app.songs.get(id).toJSON());
          // showSong();
        // } else {
          // song.fetch({success: function() {
            // showSong();
          // }});
        // }
      } else {
        showSong();
      }
    }
    
  });
  
  var router = new Router();
  
  Backbone.history.start();
  
  var Main = {
    app: app,
    router: router
  };
  
  return Main;

});



