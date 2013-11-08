define(['jquery', 'backbone', 'text!app/templates/song-template.html', 'helper', 'utils/utils', 'plupload/zh_CN', 'jquery.fileupload', 'jquery.uploadify'], function($, Backbone, SongTemplate, helper, utils, plupload) {

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
    'dblclick *[tag="del"]': 'del',
    'click *[tag="upload_song1"]': 'uploadSong1'
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
    var url = 'http://c.pcs.baidu.com:80/rest/2.0/pcs/file';
    url += '?method=upload&path=/apps/1050/test3.png&access_token=3.f562ec8dee4b5e0071c1d0e5cec72543.2592000.1386400060.2282023345-1673314';
    
    this.$('#upload_song').uploadify({
      'swf'      : 'http://demoapi.duapp.com/wiki/js/uploadify/uploadify.swf',
      'uploader' : url
    });
    
  },
  
  initUploader1: function() {
  
    var tThis = this;
    var $btnTarget = tThis.$('*[tag="upload_song"]');
    var url = 'http://c.pcs.baidu.com:80/rest/2.0/pcs/file';
    // url += '?method=upload&path=/apps/1050/test3.png&access_token=3.f562ec8dee4b5e0071c1d0e5cec72543.2592000.1386400060.2282023345-1673314';
  
    var uploader = new plupload.Uploader({
      flash_swf_url : 'http://pan.baidu.com/res/static/images/swfupload.swf',
      runtimes : 'flash',
      filters : {
        max_file_size : '10mb',
        mime_types: [
          {title : "Audio files", extensions : "mp3,mid,wma,wav,ogg"}
        ]
      },
      container: tThis.el,
      browse_button: $btnTarget[0],
      url: url,
      urlstream_upload: true
      // url: url
    });
    
    uploader.init();
    
    uploader.bind('FilesAdded', function(up, files) {
      plupload.each(files, function(file) {
        var template = _.template($(SongTemplate).find('#UploadTemplate').html());
        var $target = $(template({file: file}));
        tThis.$('*[tag="upload_song_container"] tbody').append($target);
        file.$target = $target;
        $target.find('*[tag="upload"]').bind('click', function() {
          // $(this).attr('disabled', 'disabled');
          uploader.start();
        });
      });
    });
    
    uploader.bind('Error', function(up, err) {
      var $alert = $(utils.getAlertHtml('alert-danger', err.message));
      var $target = $btnTarget.closest('.row').find('*[tag="alert"]');
      if($target) {
        utils.renderAlert($target, $alert);
      }
    });
    
    uploader.bind('UploadProgress', function(up, file) {
      tThis.progressing(file.$target, file.percent);
    });
  
  },
  
  uploadSong1: function(e) {
    var tThis = this;
    var url = 'https://c.pcs.baidu.com/rest/2.0/pcs/file' + '?method=upload&path=/apps/1050/test1.png&access_token=3.f562ec8dee4b5e0071c1d0e5cec72543.2592000.1386400060.2282023345-1673314';
    $(e.currentTarget).fileupload({
      isShowNProgress: false,
      url: url,
      add: function (e, data) {
        var template = _.template($(SongTemplate).find('#UploadTemplate').html());
        var $target = $(template({data: data}));
        tThis.$('*[tag="upload_song_container"] tbody').append($target);
        data.context = $target;
        data.formData = [];
        $target.find('*[tag="upload"]').bind('click', function() {
          $(this).attr('disabled', 'disabled');
          var progress = utils.Progress();
          data.progress = progress;
          progress.init(data.context.find('.progress-bar'), tThis.progressing);
          progress.start();
          // Need check if exist
          data.submit();
        });
      },
      done: function(e, data) {
        if(data.result&&data.result.hash) {
          tThis.success(data);
        } else {
          tThis.error(data);
        }
      },
      fail: function(e, data) {
        tThis.error(data);
      }
    });
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