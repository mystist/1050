define(['backbone'], function(Backbone) {

var Resource = Backbone.Model.extend({
  urlRoot: '/resources'
});

var Resources = Backbone.Collection.extend({
  model: Resource
});

var ResourceModel = {
  Resource: Resource,
  Resources: Resources
}

return ResourceModel;

});
