CleatUp.Views.Landing = Backbone.View.extend({
  initialize: function (options) {
    this.interests = options.interests;
    this.myEvents = options.myEvents;
    this.groups = options.groups;
  },

  template: JST["landing"],

  events: {
    "click .groups": "switchLanding",
    "click .events": "switchLanding",
    "click .dropdown-item": "showInterest",
    "click .all-interests": "allLanding"
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
    this.$el.find(".interest-dropdown").html(view.render().$el);
  },

  groupsLanding: function () {
    var view = new CleatUp.Views.GroupsLanding({
      collection: this.groups
    });
    this._swapLanding(view);
  },

  eventsLanding: function () {
    var view = new CleatUp.Views.EventsLanding({
      collection: this.myEvents
    });
    this._swapLanding(view);
  },

  allLanding: function () {
    if ($(".groups").is(":disabled")) {
      this.groupsLanding();
    } else {
      this.eventsLanding();
    }
  },

  _swapLanding: function (view) {
    if (this.currentLanding) {
      this.currentLanding.remove();
    }

    this.$el.find(".indexes-area").html(view.render().$el);
    this.currentLanding = view;
  }
});
