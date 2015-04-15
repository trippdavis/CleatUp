CleatUp.Models.Group = Backbone.Model.extend({
  initialize: function () {
    this.organizer = null;
    this.interests = [];
  },

  urlRoot: "/api/groups",

  parse: function (payload) {
    if (payload.organizer) {
      this.organizer = payload.organizer;
      delete payload.organizer;
    }

    if (payload.interests) {
      this.interests = [];
      payload.interests.forEach(function (interest) {
        this.interests.push(interest.topic);
      }.bind(this));

      delete payload.interests;
    }

    return payload;
  }
});
