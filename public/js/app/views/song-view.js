define(['jquery', 'backbone', 'text!app/templates/song-template.html', 'helper', 'utils/utils'], function($, Backbone, SongTemplate, helper, utils) {

var ShowSongView = Backbone.View.extend({

  template: "#ShowSongTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template(this));
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
    'click *[tag="submit"]': 'submit',
    'dblclick *[tag="del"]': 'del'
  },
  
  submit: function(e) {
    var obj = utils.getObjFromForm(this.$el);
    var song = this.model;
    var isValid = song.save(obj, {
      wait: true,
      $btn: $(e.currentTarget)
    });
    var $target = this.$('select, input').closest('.row').find('*[tag="alert"]').children();
    $target.remove();
    if(!isValid) {
      var i = 0;
      _.each(song.validationError, function(value, key) {
        var $target = this.$('*[name="'+key+'"]').closest('.row').find('*[tag="alert"]');
        var $alert = $(utils.getAlertHtml('alert-danger', value));
        utils.renderAlert($target, $alert, 1000*60);
        if(i==0) {
         this.$('*[name="'+key+'"]').focus();
        }
        i++;
      }, this);
    }
  },
  
  del: function(e) {
    var song = this.model;
    song.destroy({
      wait: true,
      $btn: $(e.currentTarget)
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