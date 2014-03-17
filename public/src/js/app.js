require.config({
  waitSeconds: 20,
  baseUrl: '/js/libs',
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
    'utils/config': []
  }
});

define(['jquery', 'backbone', 'utils/utils', 'app/models/song-model', 'app/views/song-view', 'bootstrap'],

function($, Backbone, utils, SongModel, SongView) {

  var App = Backbone.View.extend({
    
    songs: null,
    
    initialize: function() {
      utils.setGlobalAjaxSettings();
      // this.navigate();
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
    
    navigate: function() {
      // If url is http://localhost:9292/#bala, the location.pathname will be '/'
      // So location.pathname.length > 1 means the url is http://localhost:9292/bala
      // So we need to navigate it to http://localhost:9292/#bala
      // if(location.pathname.length > 1) {
        // router.navigate('#' + location.pathname, {trigger: true, replace: true});
      // }
    }
    
  });
  
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
  var app = new App();
  
  Backbone.history.start({pushState: true});
  
  var Main = {
    app: app,
    router: router
  };
  
  return Main;

});



