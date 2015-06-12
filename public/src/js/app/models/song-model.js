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
  localStorage: new Backbone.LocalStorage('Songs')
});

var SongModel = {
  Song: Song,
  Songs: Songs
}

return SongModel;

});
