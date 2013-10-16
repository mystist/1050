define(['jquery', 'backbone', 'text!app/templates/song-template.html', 'helper'], function($, Backbone, SongTemplate, helper) {

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
    'click button[tag="submit"]': 'submit'
  },
  
  submit: function(e) {
    var obj = helper.serializeObject(this.$('form').serializeArray());
    var song = this.model;
    song.save(obj, {
      silent: true,
            myObj: "sss",
      success: function() {
        console.log("ss");
      },
      error: function() {
        console.log("ss");
      },
      complete: function() {
      
      }
    });
  }

});

var SongView = {
  ShowSongView: ShowSongView,
  SongListView: SongListView,
  EditSongView: EditSongView
};

return SongView;

});