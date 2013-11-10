define(['jquery', 'backbone', 'text!app/templates/song-template.html', 'helper', 'utils/utils', 'plupload/zh_CN'], function($, Backbone, SongTemplate, helper, utils, plupload) {

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
    this.initUploader();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template({model: this.model}));
    $("#IndexContainer").html(this.el);
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
  
  initUploader: function() {
  
    var tThis = this;
  
    var uploader = new plupload.Uploader({
      flash_swf_url : 'js/libs/plupload/Moxie.swf',
      runtimes : 'flash',
      container: tThis.el,
      browse_button: tThis.$('*[tag="upload_song"]')[0],
      url: 'http://up.qiniu.com:80/',
      filters : {
        max_file_size : '10mb',
        mime_types: [
          {title : "Audio files", extensions : "mp3, mid, wma, wav, ogg"}
        ]
      },
      init: {
        FilesAdded: function(up, files) {
          plupload.each(files, function(file) {
            var template = _.template($(SongTemplate).find('#UploadTemplate').html());
            var $target = $(template({file: file}));
            tThis.$('*[tag="upload_song_container"] tbody').append($target);
            file.$target = $target;
            $target.find('*[tag="upload"]').bind('click', function() {
              $(this).attr('disabled', 'disabled');
              uploader.start();
            });
          });
        },
        UploadProgress: function(up, file) {
          tThis.progressing(file.$target.find('.progress-bar'), file.percent);
        },
        Error: function(up, err) {
          var $alert = $(utils.getAlertHtml('alert-danger', err.message));
          var $target = $btnTarget.closest('.row').find('*[tag="alert"]');
          if($target) {
            utils.renderAlert($target, $alert);
          }
        }
      }
    });
    
    uploader.init();
    
  },
  
  progressing: function($target, progress) {
    $target.css('width', progress +'%').attr('aria-valuenow', progress)
      .find('span').html(progress +'%');
  },
  
  success: function(data) {
    data.progress.done();
    var $target = data.progress.settings.$target.find('span');
    $target.html($target.html()+' 上传成功');
    data.context.find('*[tag="upload"]').removeClass('btn-primary').addClass('btn-danger')
      .html('删除').attr('tag', 'upload_del').removeAttr('disabled');
  },
  
  error: function(data) {
    data.progress.done();
    var $target = data.progress.settings.$target.find('span');
    $target.html($target.html()+' 上传失败');
    data.context.find('*[tag="upload"]').removeClass('btn-primary').addClass('btn-default')
      .html('取消').attr('tag', 'upload_cancel').removeAttr('disabled');
  }

});

var SongView = {
  ShowSongView: ShowSongView,
  SongListView: SongListView,
  EditSongView: EditSongView
};

return SongView;

});