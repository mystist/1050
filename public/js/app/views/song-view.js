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
    var obj = helper.serializeObject(this.$("form").serializeArray());
    // var obj = {};
    var song = this.model;
    var tThis = this;
    tThis.$("#test2").hide();
    // NProgress.start();
    song.save(obj, {error: function() {
      // NProgress.done();
      tThis.$("#test2").hide();
      // setTimeout(function() {
        // tThis.$(".alert-danger").hide();
      // }, 3500);
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