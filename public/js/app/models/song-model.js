define(['backbone'], function(Backbone) {

var Song = Backbone.Model.extend({
  urlRoot: '/songs'
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
