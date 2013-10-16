define(['jquery', 'nprogress/nprogress'], function($, NProgress) {

var utils = {

  timeout: null,

  setGlobalAjaxOptions: function() {
  
    var tThis = this;
  
    $.ajaxSetup({global: true});
    
    $(document).ajaxSend(function(event, jqxhr, settings) {
      tThis.before(event, jqxhr, settings);
    });
    
    $(document).ajaxComplete(function(event, jqxhr, settings) {
      tThis.complete(event, jqxhr, settings);
    });
    
    $(document).ajaxSuccess(function(event, jqxhr, settings) {
      tThis.success(event, jqxhr, settings);
    });
    
    $(document).ajaxError(function(event, jqxhr, settings) {
      tThis.error(event, jqxhr, settings);
    });

  },
  
  before: function(event, jqxhr, settings) {
  
    NProgress.set(0.6);
    
    if(settings.isSubmit) {    
      var $alert = $('.alert');
      if($alert) $alert.hide();
      
      var $btn = $('.btn');
      if($btn) $btn.attr("disabled", "disabled");
    }
    
  },
  
  complete: function(event, jqxhr, settings) {
  
    NProgress.done();
    
    if(settings.isSubmit) {
      var $btn = $('.btn');
      if($btn) $btn.removeAttr("disabled");
    }
    
  },
  
  success: function(event, jqxhr, settings) {  
    if(settings.isSubmit) {  
      var $alert = $('.alert-success');
      if($alert) {
        $alert.show();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function() {$alert.hide();}, 3500);
      }
    }
  },
  
  error: function(event, jqxhr, settings) {
    if(settings.isSubmit) {
      var $alert = $('.alert-danger');
      if($alert) {
        $alert.show();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function() {$alert.hide();}, 3500);
      }
    }
  },
  
  getObjByForm: function($selector) {
    var obj = {};
    $selector.$(':input').each(function() {
      obj[this.name] = this.value;
    });
    return obj;
  }

}

return utils;

});
