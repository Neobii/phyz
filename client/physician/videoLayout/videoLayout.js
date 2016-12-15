Session.set('activeVideo', null);

var myVideos = new Vimeo([
  "97129318",
  "97174655",
  "25561062"
]);

Template.videoList.helpers({
  videos: function () {
    return myVideos.getVideos();
  },
  activeVideo: function () {
    return Session.get('activeVideo');
  }
});

Template.videoList.events({
  'click .video': function () {
    Session.set('activeVideo', this);
  }
});