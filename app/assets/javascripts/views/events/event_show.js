CleatUp.Views.EventShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  className: "event-show",

  events: {
    "click .delete-event": "destroy",
    "click .join-event": "joinEvent",
    "click .leave-event": "leaveEvent"
  },

  template: JST['events/show'],

  render: function () {
    var content = this.template({ event: this.model });
    this.$el.html(content);
    if (this.model.get("reservation_id")) {
      this.toggleButton();
    }

    return this;
  },

  toggleButton: function () {
    $button = $("#joined-event");
    $button.toggleClass("join-event");
    $button.toggleClass("leave-event");
    if ($button.text() === "Reserve Spot!") {
      $button.text("Cancel Reservation");
    } else {
      $button.text("Reserve Spot!");
    }
  },

  joinEvent: function (event) {
    event.preventDefault();
    $.ajax({
      url: "/event_reservations",
      type: "POST",
      data: { event_id: this.model.id },
      success: function (reservation) {
        this.toggleButton();
        this.model.set("reservation_id", reservation.id);
      }.bind(this)
    });
  },

  leaveEvent: function (event) {
    event.preventDefault();
    $.ajax({
      url: "/event_reservations/" + this.model.get("reservation_id"),
      type: "DELETE",
      success: function () {
        this.model.set("reservation_id", 0);
        this.toggleButton();
      }.bind(this)
    });
  },

  destroy: function (event) {
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("groups/" + this.model.get("group_id"), { trigger: true });
      }.bind(this)
    });
  }
});
