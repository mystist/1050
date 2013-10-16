define(['jquery', 'nprogress/nprogress'], function($, NProgress) {

var utils = {

  setGlobalAjaxOptions: function() {
  
    var tThis = this;
  
    $.ajaxSetup({
      global: true,
      context: {some:'value'},
      myObj: "sss1"
    });
    
    $(document).ajaxSend(function() {
      tThis.before();
    });
    
    $(document).ajaxComplete(function() {
      tThis.complete();
    });
    
    $(document).ajaxSuccess(function() {
      tThis.success();
    });
    
    $(document).ajaxError(function() {
      tThis.error();
    });

  },
  
  before: function() {
  
    NProgress.start();
    
    var $alert = $('.alert');
    if($alert) $alert.hide();
    
    var $btn = $('.btn');
    if($btn) $btn.attr("disabled", "disabled");
    
  },
  
  complete: function() {
  
    NProgress.done();
    
    var $btn = $('.btn');
    if($btn) $btn.removeAttr("disabled");
    
  },
  
  success: function() {
    var $alert = $('.alert-success');
    if($alert) {
      $alert.show();
      setTimeout(function() {$alert.hide();}, 3500);
    }
  },
  
  error: function() {
    var $alert = $('.alert-error');
    if($alert) {
      $alert.show();
      setTimeout(function() {$alert.hide();}, 3500);
    }
  }

}

return utils;

});
