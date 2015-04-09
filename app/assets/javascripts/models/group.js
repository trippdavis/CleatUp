CleatUp.Models.Group = Backbone.Model.extend({
  initialize: function () {
    this.organizer = null;
  },

  urlRoot: "/api/groups",

  parse: function (payload) {
    if (payload.events) {
      this.events().set(payload.events, { parse: true });
      delete payload.events;
    }

    if (payload.organizer) {
      this.organizer = payload.organizer;
      delete payload.organizer;
    }

    return payload;
  },

  events: function () {
    this._groupEvents = this._groupEevents ||
      new CleatUp.Collections.Events([], { group: this });
    return this._groupEvents;
  }
});
