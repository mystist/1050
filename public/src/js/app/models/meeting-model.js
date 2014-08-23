define(['backbone'], function(Backbone) {

var Meeting = Backbone.Model.extend({
  urlRoot: '/meetings'
});

var Meetings = Backbone.Collection.extend({
  model: Meeting
});

var MeetingSong = Backbone.Model.extend({
  urlRoot: '/meetingSongs'
});

var MeetingSongs = Backbone.Collection.extend({
  model: MeetingSong
});

var MeetingModel = {
  Meeting: Meeting,
  Meetings: Meetings,
  MeetingSong: MeetingSong,
  MeetingSongs: MeetingSongs
}

return MeetingModel;

});
