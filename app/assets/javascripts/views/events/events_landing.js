PickUp.Views.EventsLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.interest_id = options.interest_id;
    this.type = options.type;
  },

  template: JST['events/landing'],

  events: {
    "click button": "switchingIndex",
    "click .date-square": "clickDate"
  },

  clickDate: function (event) {
    debugger
    // var day = $(event.target).
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".reserved-events");
    this.switchIndex();
    this.$el.find("#calendar").calendar();
    return this;
  },

  switchingIndex: function (event) {
    var $button = $(event.target);
    $button.prop("disabled", true);
    if ($button.hasClass("created-events")) {
      this.type = "created";
    } else if ($button.hasClass("reserved-events")) {
      this.type = "reserved";
    } else if ($button.hasClass("group-events")) {
      this.type = "joined-group";
    } else {
      this.type = "other";
    }
    this.$currentButton.prop("disabled", false);
    this.$currentButton = $button;
    this.switchIndex();
  },

  switchIndex: function () {
    var view = new PickUp.Views.EventsIndex({
      collection: this.collection,
      type: this.type,
      interest_id: this.interest_id
    });

    if (this.currentIndex) {
      this.removeSubview(".events-list", this.currentIndex);
    }

    this.addSubview(".events-list", view);
    this.currentIndex = view;
  }
});
