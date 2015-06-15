
require.config({
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
    'bootstrap-waterfall': {
      deps: ['jquery'],
      exports: '$.fn.waterfall'
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

define(['jquery', 'backbone', 'utils/utils', 'app/models/song-model', 'app/views/song-view', 'app/models/meeting-model', 'app/views/meeting-view', 'helper', 'bootstrap'],

function($, Backbone, utils, SongModel, SongView, MeetingModel, MeetingView, helper) {

  var App = Backbone.View.extend({

    syncedSongs: null,
    songs: null,
    categoryName: null,

    initialize: function() {
      utils.setGlobalAjaxSettings();
      this.initHashUrl();
    },

    initSongs: function(url) {
      this.songs = this.syncedSongs.frontRestful(url);
      app.showSongs();
    },

    showSongs: function() {
      var showSongView = new SongView.ShowSongView({collection: this.songs, app: this});
      var pagerView = new SongView.PagerView({collection: this.songs});
    },

    initHashUrl: function() {
      $(document).on('click', '*[tag="hash_url"]', function(e) {
        e.preventDefault();
        router.navigate($(this).attr("href"), {trigger: true});
      });
    }

  });

  var Router = Backbone.Router.extend({

    deferred: null,
    routes: {
      '': 'showSongs',
      'category_big/:categoryName': 'showSongs',
      'modification': 'editSong',
      'modification/:id': 'editSong',
      'search/:keywords': 'search',
      'meeting': 'meeting'
    },

    initialize: function () {
      app.syncedSongs = new SongModel.Songs();
      var ajaxDeferred = app.syncedSongs.fetch({ajaxSync: true});
      var localDeferred = app.syncedSongs.fetch();
      if (app.syncedSongs.length > 0) {
        this.deferred = localDeferred;
      } else {
        this.deferred = ajaxDeferred;
      }
    },

    execute: function (callback, args, name) {
      this.deferred.done($.proxy(function () {
        this.syncSongs();
        if (callback) callback.apply(this, args);
      }, this));

      return false;
    },

    syncSongs: function () {
      app.syncedSongs.each(function (song) {
        song.save();
      });
    },

    showSongs: function(categoryName) {
      if(!categoryName) {
        app.initSongs('/songs');
      } else {
        app.categoryName = categoryName;
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
    },

    search: function(keywords) {
      if(keywords) {
        app.categoryName = '“' + keywords + '” 搜索结果';
        app.initSongs('/songs_search/'+encodeURIComponent(keywords));
      }
    },

    meeting: function() {
      meetings = new MeetingModel.Meetings();
      meetings.url = '/meetings/' + $('#IndexContainer').attr('user_id');
      meetings.fetch({success: function(collection, response) {
        if(response&&!response.error) {
          var meetingsView = new MeetingView.MeetingsView({collection: meetings});
        }
      }});
    }

  });

  var app = new App();
  var router = new Router();

  Backbone.history.start({pushState: true});

  var Main = {
    app: app,
    router: router
  };

  return Main;

});
