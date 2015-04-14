CleatUp.Models.Group = Backbone.Model.extend({
  initialize: function () {
    this.organizer = null;
  },

  urlRoot: "/api/groups",

  parse: function (payload) {
    if (payload.organizer) {
      this.organizer = payload.organizer;
      delete payload.organizer;
    }

    return payload;
  }
});
