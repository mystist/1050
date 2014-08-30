define(['jquery', 'backbone', 'text!app/templates/meeting-template.html', 'app/models/meeting-model', 'app/models/song-model', 'app/views/song-view', 'helper', 'utils/utils', 'bootstrap'],

function($, Backbone, Template, MeetingModel, SongModel, SongView, helper, utils) {

var MeetingsView = Backbone.View.extend({

  template: '#MeetingsTemplate',

  initialize: function() {
    this.render();
    this.renderMeetings();
    this.$el.tooltip({
      selector: '*[data-toggle="tooltip"]'
    });
  },
  
  render: function() {
    var template = _.template($(Template).find(this.template).html());
    this.$el.html(template());
    $("#IndexContainer").empty().html(this.el);
  },
  
  renderMeetings: function() {
    _.each(this.collection.models, function(model) {
      var $target = this.renderContainer(model);
      var meetingView = new MeetingView.MeetingView({model: model, $target: $target});
    }, this);
  },
  
  renderContainer: function(model) {
    var $element = $('<div />').addClass('song-list-container row');
    var $target = $('<div />').addClass('col-md-12');
    $element.append($target);
    this.$el.find('.panel-group').append($element);
    return $target;
  }

});

var MeetingView = Backbone.View.extend({
  
  options: null,
  
  className: 'panel panel-default song-list-panel',
  
  template: '#MeetingTemplate',
  
  initialize: function(options) {
    this.options = options || {};
    this.render();
    this.renderAlert();
    this.renderMeetingSongs();
  },
  
  render: function() {
    
    this.$el.attr('status', this.model.get('status'));
    
    var template = _.template($(Template).find(this.template).html());
    this.$el.html(template(_.extend({}, this, {helper: helper})));
    this.options.$target.empty().html(this.el);  
  },
  
  renderMeetingSongs: function() {
    var meetingSongs = new MeetingModel.MeetingSongs(this.model.get('meeting_songs'));
    var $container = this.$el.find('*[meeting_id="'+this.model.id+'"]');
    var meetingSongsView = new MeetingView.MeetingSongsView({collection: meetingSongs, el: $container});
  },
  
  renderAlert: function() {
    var $alert = $('<span />').addClass('pull-right song-list-alert').attr('tag', 'alert');
    this.options.$target.prepend($alert);
  },
  
  events: {
    'click *[tag="save"]': 'save',
    'click *[tag="edit"]': 'edit',
    'dblclick *[tag="del"]': 'del'
  },
  
  save: function(e) {
    var tThis = this;
    var obj = utils.getObjFromForm(this.$el.find('form'));
    obj['status'] = 'confirmed';
    this.model.save(obj, {
      wait: true,
      $btn: $(e.currentTarget),
      success: function(model, response) {
        if(response&&!response.error) {
          tThis.options.$target.closest('.panel-group').find('*[tag="alert"]').empty();
          var meetingView = new MeetingView.MeetingView({model: model, $target: tThis.options.$target});
          tThis.remove();
        }
      }
    });
  },
  
  edit: function(e) {
    var $target = this.$el.closest('.panel-group').find('*[status="current"]');
    if($target.length > 1) {
      var $alert = $(utils.getAlertHtml('alert-danger', '请先保存“未保存的歌单”'));
      var $target = this.options.$target.find('*[tag="alert"]').first();
      utils.renderAlert($target, $alert);
    } else {
      var tThis = this;
      this.model.save({'status': 'current'}, {
        wait: true,
        $btn: $(e.currentTarget),
        success: function(model, response) {
          if(response&&!response.error) {
            var meetingView = new MeetingView.MeetingView({model: model, $target: tThis.options.$target});
            tThis.remove();
          }
        }
      });
    }
  },
  
  del: function(e) {
    var tThis = this;
    this.model.destroy({
      wait: true,
      $btn: $(e.currentTarget),
      success: function(model, response) {
        if(response&&!response.error) {
          tThis.remove();
        }
      }
    });
  }
  
});

var MeetingSongsView = Backbone.View.extend({
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var $target = this.$el.find('tbody');
    $target.empty();
    
    this.$el.hide();
    _.each(this.collection.models, function(meetingSong) {
      var song = new SongModel.Song(meetingSong.get('song'));
      var songView = new SongView.SongView({model: song, $target: $target});
      
      if($target.attr('status') == 'current') {
        var meetingSongView = new MeetingView.MeetingSongView({model: meetingSong, el: songView.$el});
      }
    }, this);
    this.$el.show();
  }
  
});

var MeetingSongView = Backbone.View.extend({
  
  template: "#MeetingSongTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(Template).find(this.template).html());
    this.$el.find('td').last().append(template());
  },
  
  events: {
    'click *[tag="del"]': 'del'
  },
  
  del: function(e) {
    var tThis = this;
    this.model.destroy({
      wait: true,
      $btn: $(e.currentTarget),
      success: function(model, response) {
        if(response&&!response.error) {
          tThis.remove();
        }
      }
    });
  }
  
});

var MeetingView = {
  MeetingView: MeetingView,
  MeetingsView: MeetingsView,
  MeetingSongView: MeetingSongView,
  MeetingSongsView: MeetingSongsView
}

return MeetingView;

});