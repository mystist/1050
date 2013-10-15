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
    'helper': {
      exports: 'helper'
    },
    'bootstrap': ['jquery']
  }
});

define(['jquery', 'backbone', 'app/models/song-model', 'app/views/song-view', 'nprogress/nprogress', 'bootstrap'], function($, Backbone, SongModel, SongView, NProgress) {

  var App = Backbone.View.extend({
    
    songs: null,
    
    initSongs: function(url) {
      this.songs = new SongModel.Songs();
      this.songs.url = url;
      NProgress.start();
      this.songs.fetch({success: function() {
        NProgress.done();
        app.showSongs();
      }});
    },
    
    showSongs: function() {
      var showSongView = new SongView.ShowSongView();
      var songListView = new SongView.SongListView({model: this.songs});
      NProgress.done();
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
        song.on('change', showSong);
        if(app.songs) {
          song.set(app.songs.get(id).toJSON());
        } else {
          NProgress.start();
          song.fetch({
            success: function() {
              NProgress.done();
            }
          });
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



