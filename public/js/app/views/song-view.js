define(['jquery', 'backbone', 'text!app/templates/song-template.html', 'helper', 'utils/utils', 'plupload/zh_CN', 'app/models/resource-model', 'app/views/resource-view'], function($, Backbone, SongTemplate, helper, utils, plupload, ResourceModel, ResourceView) {

var ShowSongView = Backbone.View.extend({

  template: "#ShowSongTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template(this));
    $("#IndexContainer").empty().html(this.el);
  }

});

var SongsView = Backbone.View.extend({

  template: "#SongsTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template(this));
    $("#SongsContainer").empty().html(this.el);
  }

});

var EditSongView = Backbone.View.extend({

  options: {
    resources: []
  },

  template: "#EditSongTemplate",
  
  initialize: function() {
    this.render();
    this.$el.tooltip({
      selector: '*[data-toggle="tooltip"]',
      placement: 'right'
    });
    if(this.model.id) {
      this.initResources();
    }
    this.initUploader('song');
    this.initUploader('pic');
  },
  
  render: function() {
    var template = _.template($(SongTemplate).find(this.template).html());
    this.$el.html(template(_.extend({}, {model: this.model}, {helper: helper})));
    $("#IndexContainer").empty().html(this.el);
  },
  
  events: {
    'click *[tag="submit"]': 'submit',
    'dblclick *[tag="del"]': 'del'
  },
  
  submit: function(e) {
    var obj = utils.getObjFromForm(this.$el);
    obj.resources = this.options.resources;
    var song = this.model;
    var isValid = song.save(obj, {
      wait: true,
      $btn: $(e.currentTarget),
      success: function(model, response) {
        if(response&&!response.error) {
          require(['app'], function(Main) {
            Main.router.navigate('#modification/'+song.id);
          });
          var editSongView = new SongView.EditSongView({model: song});
        }
      }
    });
    var $target = this.$('select, input').closest('.form-group').find('*[tag="alert"]').children();
    $target.remove();
    if(!isValid) {
      var i = 0;
      _.each(song.validationError, function(value, key) {
        var $target = this.$('*[name="'+key+'"]').closest('.form-group').find('*[tag="alert"]').first();
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
    this.model.destroy({
      wait: true,
      $btn: $(e.currentTarget),
      success: function(model, response) {
        if(response&&!response.error) {
          require(['app'], function(Main) {
            Main.router.navigate('', {trigger: true, replace: true});
          });
        }
      }
    });
  },
  
  initUploader: function(type) {
  
    var tThis = this;
    var $container = '', $btnTarget = '', $startTarget = '';
    var filters = {};
    if(type=='song') {
      $container = tThis.$('*[tag="song"]');
      filters = {
        max_file_size : '10mb',
        mime_types: [
          {title : "Audio files", extensions : "mp3,mid,wma,wav,ogg"}
        ]
      };
    }
    if(type=="pic") {
      $container = tThis.$('*[tag="pic"]');
      filters = {
        max_file_size : '10mb',
        mime_types: [
          {title : "Image files", extensions : "gif,jpg,jpeg,png"}
        ]
      };
    }
    if($container) {
      $btnTarget = $container.find('*[tag="upload"]');
      $startTarget = $container.find('*[tag="start_upload"]');
    } else {
      return ;
    }
  
    var uploader = new plupload.Uploader({
      flash_swf_url : 'js/libs/plupload/Moxie.swf',
      runtimes : 'flash',
      container: $container[0],
      browse_button: $btnTarget[0],
      url: 'http://up.qiniu.com:80/',
      filters : filters,
      multipart_params: {
        'token': $("#IndexContainer").attr('token')
      },
      init: {
        PostInit: function() {
          $startTarget.bind('click', function() {
            $(this).attr('disabled', 'disabled');
            uploader.start();
            return false;
          });
        },
        FilesAdded: function(up, files) {
          plupload.each(files, function(file) {
            var template = _.template($(SongTemplate).find('#UploadTemplate').html());
            var $target = $(template({file: file}));
            $container.find('*[tag="upload_container"] tbody').append($target);
            $target.find('*[tag="cancel_upload"]').bind('click', function() {
              uploader.removeFile(file);
              $target.remove();
            });
            file.$target = $target;
          });
          $startTarget.show();
        },
        UploadProgress: function(up, file) {
          var $target = file.$target.find('.progress-bar');
          var progress = file.percent;
          $target.css('width', progress +'%').attr('aria-valuenow', progress).find('span').html(progress +'%');
          file.$target.find('*[tag="cancel_upload"]').attr('disabled', 'disabled');
        },
        Error: function(up, err) {
          var $alert = $(utils.getAlertHtml('alert-danger', err.message));
          var $target = $btnTarget.closest('.row').find('*[tag="alert"]').first();
          utils.renderAlert($target, $alert, 6500);
          if(err.file) {
            var errObj = {
              '614': '文件名已存在'
            };
            var errStr = errObj[err.status]?'（'+errObj[err.status]+'）':'（错误代码'+err.status+'）';
            err.file.$target.find('.progress-bar').find('span').html('上传失败'+errStr);
            err.file.$target.addClass('danger');
            err.file.$target.find('*[tag="cancel_upload"]').removeAttr('disabled');
          }
        },
        BeforeUpload: function(up, file) {
          up.settings.multipart_params['key'] = file.name;
        },
        FileUploaded: function(up, file) {
          file.$target.find('.progress-bar').find('span').html('上传成功');
          file.$target.addClass('success');
          file.$target.find('*[tag="cancel_upload"]').remove();
          var obj = {
            file_name: file.name,
            file_size: file.size,
            uploaded_time: helper.formatDateTime(new Date(), 'second'),
            file_type: type
          };
          if(_.indexOf(_.pluck(tThis.options.resources, 'file_name'), obj.file_name)==-1) {
            tThis.options.resources.push(obj);
          }
        },
        UploadComplete: function(up, files) {
          $startTarget.removeAttr('disabled');
        }
      }
    });
    
    uploader.init();
    
  },
  
  initResources: function() {

    var songList = _.filter(this.model.get('resources'), function(obj) {
      return obj.file_type == 'song';
    });
    var songs = new ResourceModel.Resources(songList);
    if(songs.length>0) {
      var songResourcesView = new ResourceView.ResourcesView({collection: songs, el: this.$('#SongResourcesContainer')});
    }
    
    var picList = _.filter(this.model.get('resources'), function(obj) {
      return obj.file_type == 'pic';
    });
    var pics = new ResourceModel.Resources(picList);
    if(pics.length>0) {
      var picResourcesView = new ResourceView.ResourcesView({collection: pics, el: this.$('#PicResourcesContainer')});
    }
    
  }

});

var SongView = {
  ShowSongView: ShowSongView,
  SongsView: SongsView,
  EditSongView: EditSongView
};

return SongView;

});