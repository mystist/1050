define(['jquery', 'backbone', 'text!app/templates/song-template.html', 'helper', 'utils/utils', 'jquery.fileupload'], function($, Backbone, SongTemplate, helper, utils) {

var ShowSongView = Backbone.View.extend({

  template: "#ShowSongTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template(this));
    $("#IndexContainer").html(this.el);
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
    $("#IndexContainer").html(this.el);
  },
  
  events: {
    'click *[tag="submit"]': 'submit',
    'dblclick *[tag="del"]': 'del',
    'click *[tag="upload_song"]': 'uploadSong'
  },
  
  submit: function(e) {
    var obj = utils.getObjFromForm(this.$el);
    var song = this.model;
    var isValid = song.save(obj, {
      wait: true,
      $btn: $(e.currentTarget)
    });
    var $target = this.$('select, input').closest('.form-group').find('*[tag="alert"]').children();
    $target.remove();
    if(!isValid) {
      var i = 0;
      _.each(song.validationError, function(value, key) {
        var $target = this.$('*[name="'+key+'"]').closest('.form-group').find('*[tag="alert"]');
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
  },
  
  uploadSong: function(e) {
    var tThis = this;
    $(e.currentTarget).fileupload({
      isShowNProgress: false,
      dataType: 'json',
      url: 'http://up.qiniu.com/',
      add: function (e, data) {
        var template = _.template($(SongTemplate).find('#UploadTemplate').html());
        var $target = $(template({data: data}));
        tThis.$('*[tag="upload_song_container"] tbody').append($target);
        data.context = $target;
        data.formData = [{
          name: 'token', value: $('#IndexContainer').attr('token')
        }, {
          name: 'key', value: data.files[0].name
        }];
        $target.find('*[tag="upload"]').bind('click', function() {
          $(this).attr('disabled', 'disabled');
          var progress = utils.Progress();
          progress.init(data.context.find('.progress-bar'), tThis.progressing);
          progress.start();
          //Need check if exist
          //data.submit();
        });
      },
      done: function(e, data) {
        if(data.result&&data.result.hash) {
          data.context.find('*[tag="upload_result"]').html('成功');
          data.context.find('*[tag="upload"]').removeClass('btn-primary').addClass('btn-danger')
            .html('删除').attr('tag', 'upload_del').removeAttr('disabled');
        } else {
          
        }
      }
    });
  },
  
  progressing: function($target, progress) {
    $target.css('width', progress +'%').attr('aria-valuenow', progress)
      .find('span').html(progress +'%');
  }

});

var SongView = {
  ShowSongView: ShowSongView,
  SongListView: SongListView,
  EditSongView: EditSongView
};

return SongView;

});