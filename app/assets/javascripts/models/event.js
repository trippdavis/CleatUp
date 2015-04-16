CleatUp.Models.Event = Backbone.Model.extend({
  initialize: function () {
    this.organizer = null;
  },

  urlRoot: "/api/events",

  parse: function (payload) {
    if (payload.date_time) {
      this.parseDT(payload.date_time);
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
  },

  parseDT: function (dateTime) {
    var dt = dateTime;
    date = dt.split("T")[0].split("-");
    year = date[0];
    month = date[1] - 1;
    day = date[2];
    time = dt.split("T")[1].split(".")[0].split(":");
    hour = time[0];
    minute = time[1];
    this.dateTime = new Date(year, month, day, hour, minute);
    this.date = this.dateTime.toUTCString().split(" ").slice(0, 3).join(" ");
    var splitTime = this.dateTime.toLocaleString().split(", ")[1].split(":");
    this.time = splitTime.slice(0, 2).join(":") + " " + splitTime[2].split(" ")[1];
  }
});
