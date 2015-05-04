PickUp.Models.Event = Backbone.Model.extend({
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

  parseDT: function (dt) {
    var date = dt.split("T")[0].split("-");
    this.formDate = date.join("-");
    this.year = date[0];
    this.month = date[1] - 1;
    this.day = date[2];
    var time = dt.split("T")[1].split(".")[0].split(":");
    this.formTime = time.slice(0, 2).join(":");
    var hour = time[0];
    var minute = time[1];
    this.dateTime = new Date(this.year, this.month, this.day, hour, minute);
    var dateString = this.dateTime.toDateString().split(" ").slice(0,3);
    dateString[0] = dateString[0] + ",";
    this.date = dateString.join(" ");
    var splitTime = this.dateTime.toLocaleString().split(", ")[1].split(":");
    this.time = splitTime.slice(0, 2).join(":") + " " + splitTime[2].split(" ")[1];
  }
});
