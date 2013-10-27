define(['backbone'], function(Backbone) {

var Song = Backbone.Model.extend({
  urlRoot: '/songs',
  validate: function(attrs) {
    var errorObj = {};
    var publicMsg = '该项填写有误';
    var mustNot = ['uploaded_song', 'uploaded_pic'];
    _.each(attrs, function(value, key) {
      if(_.indexOf(mustNot, key)==-1) {
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
  model: Song
});

var SongModel = {
  Song: Song,
  Songs: Songs
}

return SongModel;

});
