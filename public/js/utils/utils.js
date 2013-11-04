define(['jquery', 'nprogress/nprogress'], function($, NProgress) {

var utils = {

  setGlobalAjaxSettings: function() {
  
    var tThis = this;
  
    $.ajaxSetup({global: true, cache: false});
    
    $(document).ajaxSend(function(event, jqxhr, settings) {
      tThis.before(event, jqxhr, settings);
    });
    
    $(document).ajaxComplete(function(event, jqxhr, settings) {
      tThis.complete(event, jqxhr, settings);
    });
    
    $(document).ajaxSuccess(function(event, jqxhr, settings) {
      if(jqxhr.responseJSON&&!jqxhr.responseJSON.error) {
        tThis.success(event, jqxhr, settings);
      } else {
        tThis.error(event, jqxhr, settings);
      }
    });
    
    $(document).ajaxError(function(event, jqxhr, settings) {
      tThis.error(event, jqxhr, settings);
    });

  },
  
  before: function(event, jqxhr, settings) {
  
    NProgress.set(0.6);
    
    if(settings.$btn) {
      settings.$btn.attr("disabled", "disabled");
    }
    
  },
  
  complete: function(event, jqxhr, settings) {
  
    NProgress.done();
    
    if(settings.$btn) {
      settings.$btn.removeAttr("disabled");
    }
    
  },
  
  success: function(event, jqxhr, settings) {
    if(settings.$btn) {
      var $alert = $(this.getAlertHtml('alert-success', '操作成功'));
      var $target = settings.$btn.closest('.row').find('*[tag="alert"]');
      if($target) {
        this.renderAlert($target, $alert);
      }
    }
  },
  
  error: function(event, jqxhr, settings) {
    if(settings.$btn) {
      var $alert = $(this.getAlertHtml('alert-danger', '操作失败，请稍后重试'));
      var $target = settings.$btn.closest('.row').find('*[tag="alert"]');
      if($target) {
        this.renderAlert($target, $alert);
      }
    }
  },
  
  getObjFromForm: function($selector) {
    var obj = {};
    $selector.find('select, input').each(function() {
      obj[this.name] = this.value;
    });
    return obj;
  },
  
  getAlertHtml: function(className, msg) {
    var sb = '';
    sb += '<label class="alert '+className+'">' +
          '<strong>'+msg+'</strong>' +
          '</label>';
    return sb;
  },
  
  renderAlert: function($target, $alert, time) {
    var time = time || 2500;
    $target.html($alert);
    setTimeout(function() {
      $alert.remove();
    }, time);
  }

}

return utils;

});
