CleatUp.Models.Event = Backbone.Model.extend({
  initialize: function () {
    this.organizer = null;
  },

  urlRoot: "/api/events",

  parse: function (payload) {
    if (payload.date_time) {
      var dt = payload.date_time;
      date = dt.split("T")[0].split("-");
      year = date[0];
      month = date[1] - 1;
      day = date[2];
      time = dt.split("T")[1].split(".")[0].split(":");
      hour = time[0];
      minute = time[1];
      this.dateTime = new Date(year, month, day, hour, minute);

      delete payload.date_time;
    }

    if (payload.owned) {
      this.owned = payload.owned;
      delete payload.owned;
    }

    if (payload.organizer) {
      this.organizer = payload.organizer;
      delete payload.organizer;
    }

    return payload;
  }
});
