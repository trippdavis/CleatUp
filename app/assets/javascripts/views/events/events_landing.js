CleatUp.Views.EventsLanding = Backbone.View.extend({
  template: JST['events/landing'],

  events: {
    "click button": "switchIndex"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".reserved-events");
    this.reservedEvents();
    return this;
  },

  switchIndex: function (event) {
    var $button = $(event.target);
    $button.prop("disabled", true);
    if ($button.hasClass("created-events")) {
      this.createdEvents();
    } else if ($button.hasClass("reserved-events")) {
      this.reservedEvents();
    } else if ($button.hasClass("group-events")) {
      this.joinedGroupEvents();
    } else {
      this.otherEvents();
    }
    this.$currentButton.prop("disabled", false);
    this.$currentButton = $button;
  },

  createdEvents: function () {
    var view = new CleatUp.Views.EventsIndex({
      collection: this.collection,
      type: "created"
    });
    this._swapIndex(view);
  },

  reservedEvents: function () {
    var view = new CleatUp.Views.EventsIndex({
      collection: this.collection,
      type: "reserved"
    });
    this._swapIndex(view);
  },

  joinedGroupEvents: function () {
    var view = new CleatUp.Views.EventsIndex({
      collection: this.collection,
      type: "joined-group"
    });
    this._swapIndex(view);
  },

  otherEvents: function () {
    var view = new CleatUp.Views.EventsIndex({
      collection: this.collection,
      type: "other"
    });
    this._swapIndex(view);
  },

  _swapIndex: function (view) {
    if (this.currentIndex) {
      this.currentIndex.remove();
    }

    this.$el.find(".events-list").html(view.render().$el);
    this.currentIndex = view;
  }
});
