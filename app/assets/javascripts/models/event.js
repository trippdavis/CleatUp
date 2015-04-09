CleatUp.Models.Event = Backbone.Model.extend({
  initialize: function () {
    this.organizer = null;
  },

  urlRoot: "/api/events",

  parse: function (payload) {
    if (payload.date_time) {
      var dt = payload.date_time;
      this.date = dt.split("T")[0];
      this.time = dt.split("T")[1].split(".")[0];

      delete payload.date_time;
    }

    if (payload.organizer) {
      this.organizer = payload.organizer;
      delete payload.organizer;
    }

    return payload;
  }
});
