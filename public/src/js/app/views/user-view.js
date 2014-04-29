define(['jquery', 'backbone', 'text!app/templates/user-template.html'],

function($, Backbone, Template) {

var LoginView = Backbone.View.extend({

  template: '#LoginTemplate',

  initialize: function() {
    this.render();
    this.initLogin();
  },
  
  render: function() {
    var template = _.template($(Template).find(this.template).html());
    this.$el.html(template(this));
    $("#IndexContainer").empty().html(this.el);
  },
  
  initLogin: function() {
    var tThis = this;
    QC.Login({
      btnId:"qqLoginBtn",
      size: "A_M"
    }, tThis.afterLogin, tThis.afterLogout);
  },
  
  afterLogin: function(oInfo, oOpts) {
    alert(oInfo.nickname);
    alert(oOpts.btnId);
  },
  
  afterLogout: function() {
    alert('loged out...');
  }

});

var UserView = {
  LoginView: LoginView
}

return UserView;

});