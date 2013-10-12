var Song = Backbone.Model.extend({
  url: '/songs'
});

var Songs = Backbone.Collection.extend({
  model: Song
});