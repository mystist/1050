define(['jquery', 'backbone', 'text!app/templates/song-template.html', 'helper', 'nprogress/nprogress'], function($, Backbone, SongTemplate, helper, NProgress) {

var ShowSongView = Backbone.View.extend({

  template: "#ShowSongTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template);
    $("#indexContainer").html(this.el);
  }

});

var SongListView = Backbone.View.extend({

  template: "#SongListTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template(this));
    $("#SongListContainer").html(this.el);
  }

});

var EditSongView = Backbone.View.extend({

  template: "#EditSongTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template({model: this.model}));
    $("#indexContainer").html(this.el);
  },
  
  events: {
    'submit form': 'submit'
  },
  
  submit: function(e) {
    var obj = helper.serializeObject($(e.currentTarget).serializeArray());
    var song = this.model;
    var tThis = this;
    NProgress.start();
    song.save(obj, {success: function() {
      tThis.$(".alert-success").show();
      NProgress.done();
      return false;
    }, error: function() {
      tThis.$(".alert-danger").show();
      NProgress.done();
      return false;
    }});
    return false;
  }

});

var SongView = {
  ShowSongView: ShowSongView,
  SongListView: SongListView,
  EditSongView: EditSongView
}

return SongView;

});