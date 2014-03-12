define(['backbone', 'backbone.localstorage'], function(Backbone) {

var Resource = Backbone.Model.extend({
  urlRoot: '/resources'
});

var Resources = Backbone.Collection.extend({
  model: Resource
});

var ResourceStar = Backbone.Model.extend({
  defaults: {
    'resource_id': '',
    'current': 0
  }
});

var ResourceStarCollection = Backbone.Collection.extend({
  model: ResourceStar,
  localStorage: new Backbone.LocalStorage('ResourceStarCollection')
});

var ResourceModel = {
  Resource: Resource,
  Resources: Resources,
  ResourceStar: ResourceStar,
  ResourceStarCollection: ResourceStarCollection
}

return ResourceModel;

});
