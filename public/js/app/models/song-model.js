define(['backbone'], function(Backbone) {

var Song = Backbone.Model.extend({
});

var Songs = Backbone.Collection.extend({
  url: '/songs',
  model: Song
});

var SongModel = {
  Song: Song,
  Songs: Songs
}

return SongModel;

});
