define(['jquery', 'backbone', 'text!app/templates/resource-template.html'], function($, Backbone, ResourceTemplate) {

var ResourcesView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },
  
  render: function() {
    this.$el.empty();
    _.each(this.collection.models, function(model) {
      var resourceView = new ResourceView.ResourceView({model: model, $target: this.$el});
    }, this);
  }

});

var ResourceView = Backbone.View.extend({

  tagName: 'tr',

  template: "#ResourceTemplate",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var template = _.template($(ResourceTemplate).find(this.template).html());
    this.$el.empty().html(template(this));
    this.options.$target.append(this.el);
  },
  
  events: {
    'dblclick *[tag="delete_resource"]': 'del'
  },
  
  del: function(e) {
    var tThis = this;
    this.model.destroy({
      wait: true,
      $btn: $(e.currentTarget),
      success: function() {
        tThis.remove();
      }
    });
  }

});

var ResourceView = {
  ResourcesView: ResourcesView,
  ResourceView: ResourceView
};

return ResourceView;

});