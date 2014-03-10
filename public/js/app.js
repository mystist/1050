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
    'backbone.localstorage': ['backbone'],
    'bootstrap': ['jquery'],
    'audiojs/audio': []
  }
});

define(['jquery', 'backbone', 'utils/utils', 'app/models/song-model', 'app/views/song-view', 'audiojs/audio', 'bootstrap'],

function($, Backbone, utils, SongModel, SongView) {

  var App = Backbone.View.extend({
    
    songs: null,
    
    initialize: function() {
      utils.setGlobalAjaxSettings();
      this.initPlayer();
    },
    
    initSongs: function(url) {
      this.songs = new SongModel.Songs();
      this.songs.url = url;
      this.songs.fetch({success: function(collection, response) {
        if(response&&!response.error) {
          app.showSongs();
        }
      }});
    },
    
    showSongs: function() {
      var showSongView = new SongView.ShowSongView({collection: this.songs});
      var songsView = new SongView.SongsView({collection: this.songs});
    },
    
    initPlayer: function() {
      var audioDom = $('audio:eq(0)')[0];
      audiojs.create(audioDom, {
        autoplay: true,
        css: false,
        createPlayer: {
          markup: false,
          playPauseClass: 'play-pause',
          scrubberClass: 'scrubber',
          progressClass: 'progress',
          loaderClass: 'loaded',
          timeClass: 'time',
          durationClass: 'duration',
          playedClass: 'played',
          errorMessageClass: 'error-message',
          playingClass: 'playing',
          loadingClass: 'loading',
          errorClass: 'error'
        }
      });
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
      if(id) {
        var song = new SongModel.Song({id: id});
        song.fetch({success: function(model, response) {
          if(response&&!response.error) {
            var editSongView = new SongView.EditSongView({model: song});
          } else {
            var editSongView = new SongView.EditSongView({model: new SongModel.Song()});
          }
        }});
      } else {
        var editSongView = new SongView.EditSongView({model: new SongModel.Song()});
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



