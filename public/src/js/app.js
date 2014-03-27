﻿require.config({
  baseUrl: '/js/libs',
  paths: {
    'app': '../app',
    'utils': '../utils'
  },
  shim: {
    'helper': {
      exports: 'helper'
    },
    'utils/config': {
      exports: 'config'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: '$.fn.tooltip'
    },
    'plupload/plupload': {
      exports: 'plupload'
    },
    'plupload/zh_CN': {
      deps: ['plupload/plupload'],
      exports: 'plupload',
      init: function(plupload) {
        return plupload;
      }
    }
  },
  enforceDefine: true
});

define(['jquery', 'backbone', 'utils/utils', 'app/models/song-model', 'app/views/song-view', 'helper', 'bootstrap'],

function($, Backbone, utils, SongModel, SongView, helper) {

  var App = Backbone.View.extend({
    
    songs: null,
    
    initialize: function() {
      utils.setGlobalAjaxSettings();
      this.initHashUrl();
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
    
    initHashUrl: function() {
      $(document).on('click', '*[tag="hash_url"]', function(e) {
        e.preventDefault();
        router.navigate($(this).attr("href"), {trigger: true});
      });
    }
    
  });
  
  var Router = Backbone.Router.extend({
  
    routes: {
      '': 'showSongs',
      'category_big/:categoryName': 'showSongs',
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



