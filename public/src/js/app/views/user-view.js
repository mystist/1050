define(['jquery', 'backbone', 'text!app/templates/user-template.html'],

function($, Backbone, Template) {

var LoginView = Backbone.View.extend({

  template: '#LoginTemplate',

  initialize: function() {
    this.render();
    this.initOpenLogin();
  },
  
  render: function() {
    var template = _.template($(Template).find(this.template).html());
    this.$el.html(template(this));
    $("#IndexContainer").empty().html(this.el);
  },
  
  initOpenLogin: function() {
    var tThis = this;
    QC.Login({
      btnId:"qqLoginBtn",
      size: "A_M"
    }, tThis.afterLogin);
  },
  
  afterLogin: function(oInfo, oOpts) {
    alert(oInfo.nickname);
    alert(oOpts.btnId);
  }

});

var UserView = {
  LoginView: LoginView
}

return UserView;

});