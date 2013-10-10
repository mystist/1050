require.config({
  shim: {
    'libs/backbone': {
      deps: ['libs/jquery', 'libs/underscore']
    },
    'libs/bootstrap': {
      deps: ['libs/jquery']
    }
  }
});


define(['libs/jquery', 'libs/backbone'], function() {

  var App = Backbone.View.extend({
    
    initialize: function() {
    }
    
  });
  
  var Router = Backbone.Router.extend({
    routers: {
      '': 'home'
    },
    initialize: function() {
      console.log("yes");
    },
    home: function() {
      console.log("sss");
    }
  });
  
      var router = new Router();
  
  //var app = new App();
  
  Backbone.history.start();

});