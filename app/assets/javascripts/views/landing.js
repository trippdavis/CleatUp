CleatUp.Views.Landing = Backbone.View.extend({
  initialize: function () {
    this.interests = new CleatUp.Collections.Interests();
    this.myEvents = new CleatUp.Collections.Events();
    this.groups = new CleatUp.Collections.Groups();
  },

  template: JST["landing"],

  events: {
    "click .groups": "switchLanding",
    "click .events": "switchLanding",
    "click .dropdown-item": "showInterest"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.groupsLanding();
    this.dropdown();
    this.currentClass = "groups";
    return this;
  },

  swapClass: function () {
    this.currentClass = (this.currentClass === "groups" ? "events" : "groups");
  },

  showInterest: function (event) {
    var interest_id = $(event.target).data("interest-id");
    if (this.currentClass === "groups") {
      this.interestedGroups(interest_id);
    } else {
      this.interestedEvents(interest_id);
    }
  },

  interestedGroups: function (interest_id) {
    var view = new CleatUp.Views.GroupsIndex({
      collection: this.groups,
      type: "interest",
      interest_id: interest_id
    });
    this._swapLanding(view);
  },

  interestedEvents: function (interest_id) {
    var view = new CleatUp.Views.EventsIndex({
      collection: this.myEvents,
      type: "interest",
      interest_id: interest_id
    });
    this._swapLanding(view);
  },

  switchLanding: function (event) {
    $(event.target).prop("disabled", true);
    if ($(event.target).hasClass("events")) {
      this.eventsLanding();
      $(".groups").prop("disabled", false);
    } else {
      this.groupsLanding();
      $(".events").prop("disabled", false);
    }
    this.swapClass();
  },

  dropdown: function () {
    var view = new CleatUp.Views.Dropdown({
      collection: this.interests
    });
    this.$el.find(".dropdown-bar").html(view.render().$el);
  },

  groupsLanding: function () {
    var view = new CleatUp.Views.GroupsLanding();
    this._swapLanding(view);
  },

  eventsLanding: function () {
    var view = new CleatUp.Views.EventsLanding();
    this._swapLanding(view);
  },

  _swapLanding: function (view) {
    if (this.currentLanding) {
      this.currentLanding.remove();
    }

    this.$el.find(".indexes-area").html(view.render().$el);
    this.currentLanding = view;
  }
});
