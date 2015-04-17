PickUp.Views.EventsLanding = Backbone.View.extend({
  initialize: function (options) {
    this.interest_id = options.interest_id;
    this.type = options.type;
  },

  template: JST['events/landing'],

  events: {
    "click button": "switchingIndex",
    // "click td": "clickDate"
  },

  // clickDate: function (event) {
  //   debugger
  // },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".reserved-events");
    this.switchIndex();
    // this.$el.find("#calendar").datepicker();
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
      this.currentIndex.remove();
    }

    this.$el.find(".events-list").html(view.render().$el);
    this.currentIndex = view;
  }
});
