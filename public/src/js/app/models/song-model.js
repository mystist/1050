define(['backbone', 'backbone.localstorage'], function(Backbone) {

var Song = Backbone.Model.extend({
  urlRoot: '/songs',
  validate: function(attrs) {
    var errorObj = {};
    var publicMsg = '该项填写有误';
    var exceptions = ['resources', 'error', 'song_src', 'pic_src', 'first_sentence'];
    _.each(attrs, function(value, key) {
      if(_.indexOf(exceptions, key)==-1) {
        if(key=="index") {
          if(!value||isNaN(value)) errorObj[key] = publicMsg;
        } else {
          if(!value) errorObj[key] = publicMsg;
        }
      }
    });
    if(!_.isEmpty(errorObj)) {
      return errorObj;
    }
  }
});

var Songs = Backbone.Collection.extend({
  model: Song,
  url: '/songs',
  localStorage: new Backbone.LocalStorage('Songs'),

  deferred: null,

  frontRestful: function (url) {
    this.deferred = new $.Deferred();

    var urlFragments = url.split('/');
    var methodName = urlFragments[1];
    var param = urlFragments[2];

    this[methodName](decodeURIComponent(param), url);

    return this.deferred;
  },

  songs: function () {
    var songs = this;
    this.deferred.resolve(songs);
  },

  songs_category: function (param) {
    var models = this.where({'category_big': param});

    var songs = new SongModel.Songs(models);
    this.deferred.resolve(songs);
  },

  songs_search: function (param) {
    var models = [];

    if (isNaN(param)) {
      var models1 = this.filter(function (song) {
        return song.get('name').indexOf(param) > -1;
      });
      var models2 = this.filter(function (song) {
        return song.get('first_sentence').indexOf(param) > -1;
      });
      models = models1.concat(models2);
    } else {
      models = this.where({'index': parseInt(param, 10)});
    }

    var songs = new SongModel.Songs(models);
    this.deferred.resolve(songs);
  },

  songs_filter: function (param, url) {
    var songs = new SongModel.Songs();
    songs.url = url;
    songs.fetch({success: $.proxy(function (collection, response) {
      if(response&&!response.error) {
        this.deferred.resolve(songs);
      }
    }, this), ajaxSync: true});
  }
});

var SongModel = {
  Song: Song,
  Songs: Songs
}

return SongModel;

});
