PickUp.Views.Landing = Backbone.View.extend({
  initialize: function (options) {
    this.interests = options.interests;
    this.myEvents = options.myEvents;
    this.groups = options.groups;
    this.interest_id = 0;
  },

  template: JST["landing"],

  events: {
    "click .groups": "switchLanding",
    "click .events": "switchLanding",
    "click .interest-dropdown-item": "showInterest"
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
    var $interestEl = $(event.target);
    $(".selected-dropdown").toggleClass("selected-dropdown");
    $interestEl.toggleClass("selected-dropdown");
    $(".landing-dropdown").html($interestEl.text() + " " + "<span class='caret'>");
    var interest_id = $(event.target).data("interest-id");

    this.interest_id = interest_id;
    this.currentLanding.switchIndex(interest_id);
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
    var view = new PickUp.Views.Dropdown({
      collection: this.interests
    });
    this.$el.find(".interest-dropdown").html(view.render().$el);
  },

  groupsLanding: function () {
    var view = new PickUp.Views.GroupsLanding({
      interest_id: this.interest_id,
      collection: this.groups
    });
    this._swapLanding(view);
  },

  eventsLanding: function () {
    var view = new PickUp.Views.EventsLanding({
      interest_id: this.interest_id,
      type: "reserved",
      collection: this.myEvents
    });
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
