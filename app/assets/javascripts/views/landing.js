PickUp.Views.Landing = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.interests = options.interests;
    this.myEvents = options.myEvents;
    this.groups = options.groups;
    this.router = options.router;
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
    if (this.router.currentLanding === "groups") {
      this.groupsLanding();
      this.$el.find("button.groups").prop("disabled", true);
    } else {
      this.eventsLanding();
      this.$el.find("button.events").prop("disabled", true);
    }
    this.dropdown();
    return this;
  },

  showInterest: function (event) {
    $(".has-game").each( function (idx, game) {
      $(game).removeClass("has-game");
    });

    var $interestEl = $(event.target);
    $(".selected-dropdown").toggleClass("selected-dropdown");
    $interestEl.toggleClass("selected-dropdown");
    $(".landing-dropdown").html($interestEl.text() + " " + "<span class='caret'>");
    var interest_id = $(event.target).data("interest-id");


    this.interest_id = interest_id;
    this.currentLanding.interest_id = interest_id;
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
    this.router.switchLanding();
  },

  dropdown: function () {
    var view = new PickUp.Views.Dropdown({
      collection: this.interests
    });

    this.addSubview(".interest-dropdown", view);
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
      this.removeSubview(".indexes-area", this.currentLanding);
    }

    this.addSubview(".indexes-area", view);
    this.currentLanding = view;
  }
});
