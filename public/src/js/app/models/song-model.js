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

  frontRestful: function (url) {
    var urlFragments = url.split('/');
    var methodName = urlFragments[1];
    var param = urlFragments[2];

    return this[methodName](param);
  },

  songs: function () {
    return this;
  },

  songs_category: function (param) {
    var param = decodeURIComponent(param);
    var models = this.where({'category_big': param});

    return new SongModel.Songs(models);
  },

  songs_search: function (param) {
    var param = decodeURIComponent(param);
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

    return new SongModel.Songs(models);
  }
});

var SongModel = {
  Song: Song,
  Songs: Songs
}

return SongModel;

});
