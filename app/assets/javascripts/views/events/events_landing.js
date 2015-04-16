CleatUp.Views.EventsLanding = Backbone.View.extend({
  initialize: function (options) {
    this.interest_id = options.interest_id;
    this.type = options.type;
  },

  template: JST['events/landing'],

  events: {
    "click button": "switchingIndex"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".reserved-events");
    this.switchIndex();
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

  // createdEvents: function () {
  //   var view = new CleatUp.Views.EventsIndex({
  //     collection: this.collection,
  //     type: "created",
  //     interest_id: this.interest_id
  //   });
  //   this._swapIndex(view);
  // },
  //
  // reservedEvents: function () {
  //   var view = new CleatUp.Views.EventsIndex({
  //     collection: this.collection,
  //     type: "reserved",
  //     interest_id: this.interest_id
  //   });
  //   this._swapIndex(view);
  // },
  //
  // joinedGroupEvents: function () {
  //   var view = new CleatUp.Views.EventsIndex({
  //     collection: this.collection,
  //     type: "joined-group",
  //     interest_id: this.interest_id
  //   });
  //   this._swapIndex(view);
  // },
  //
  // otherEvents: function () {
  //   var view = new CleatUp.Views.EventsIndex({
  //     collection: this.collection,
  //     type: "other",
  //     interest_id: this.interest_id
  //   });
  //   this._swapIndex(view);
  // },

  switchIndex: function (interest_id) {
    if (interest_id) {
      this.interest_id = interest_id;
    }

    var view = new CleatUp.Views.EventsIndex({
      collection: this.collection,
      type: this.type,
      interest_id: this.interest_id
    });

    if (this.currentIndex) {
      this.currentIndex.remove();
    }

    this.$el.find(".events-list").html(view.render().$el);
    this.currentIndex = view;
  }
});
