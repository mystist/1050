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
  
    if(settings.isShowNProgress!=false) {
      NProgress.set(0.6);
      NProgress.start();
    }
    
    if(settings.$btn) {
      settings.$btn.attr("disabled", "disabled");
    }
    
  },
  
  complete: function(event, jqxhr, settings) {
  
    if(settings.isShowNProgress!=false) {
      NProgress.done();
    }
    
    if(settings.$btn) {
      settings.$btn.removeAttr("disabled");
    }
    
  },
  
  success: function(event, jqxhr, settings) {
    if(settings.$btn) {
      var $alert = $(this.getAlertHtml('alert-success', '操作成功'));
      var $target = settings.$btn.closest('.row').find('*[tag="alert"]');
      this.renderAlert($target, $alert);
    }
  },
  
  error: function(event, jqxhr, settings) {
    if(settings.$btn) {
      var $alert = $(this.getAlertHtml('alert-danger', '操作失败，请稍后重试'));
      var $target = settings.$btn.closest('.row').find('*[tag="alert"]');
      this.renderAlert($target, $alert);
    }
  },
  
  getObjFromForm: function($selector) {
    var obj = {};
    $selector.find('select, input').each(function() {
      obj[this.name] = this.value;
    });
    return obj;
  },
  
  getAlertHtml: function(cssName, msg) {
    var sb = '';
    sb += '<label class="alert '+cssName+'">' +
          '<strong>'+msg+'</strong>' +
          '</label>';
    return sb;
  },
  
  renderAlert: function($target, $alert, time) {
    var time = time || 4500;
    if($target) {
      $target.html($alert);
      setTimeout(function() {
        $alert.remove();
      }, time);
    }
  },
  
  // Copyright NProgress. For custom use. Simulate uploading progress cause IE 8 has no `loaded` object.
  Progress: function() {
  
    var Progress = function() {
      this.settings = {
        minimum: 0.08,
        trickleRate: 0.02,
        trickleSpeed: 800,
        trickle: true,
        $target: null,
        render: null
      }
    };
    
    Progress.prototype = {
    
      constructor: Progress,
      
      init: function($target, render) {
        this.settings.$target = $target;
        this.settings.render = render;
      },
    
      status: null,
      
      set: function(n) {
        n = this.clamp(n, this.settings.minimum, 1);
        this.status = (n === 1 ? null : n);
        this.settings.render(this.settings.$target, parseFloat((n * 100).toFixed(2), 10));
      },
      
      start: function() {
        var tThis = this;
        if (!this.status) this.set(0);
        var work = function() {
          setTimeout(function() {
            if (!tThis.status) return;
            tThis.trickle();
            work();
          }, tThis.settings.trickleSpeed);
        };
        if (this.settings.trickle) work();
      },
      
      inc: function(amount) {
        var n = this.status;
        if (!n) {
          this.start(amount);
        } else {
          if (typeof amount !== 'number') {
            amount = (1 - n) * this.clamp(Math.random() * n, 0.1, 0.95);
          }
          n = this.clamp(n + amount, 0, 0.994);
          this.set(n);
        }
      },
      
      trickle: function() {
        this.inc(Math.random() * this.settings.trickleRate);
      },
      
      done: function() {
        this.inc(0.3 + 0.5 * Math.random());
        this.set(1);
      },
      
      clamp: function(n, min, max) {
        if (n < min) return min;
        if (n > max) return max;
        return n;
      }
    
    }
    
    return new Progress();
  
  }

}

return utils;

});
