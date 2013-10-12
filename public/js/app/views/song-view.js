define(['jquery', 'backbone', 'text!app/templates/song-template.html'], function($, Backbone, SongTemplate) {

var SongListView = Backbone.View.extend({

  template: "#SongListTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find("#SongListTemplate").html());
    this.$el.html(template(this));
    $("#SongListContainer").html(this.el);
  }

});

var SongView = {
  SongListView: SongListView
}

return SongView;

});