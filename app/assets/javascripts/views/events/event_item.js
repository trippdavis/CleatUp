PickUp.Views.EventItem = Backbone.View.extend({
  initialize: function (options) {
    this.showDate = options.showDate;
  },

  template: JST["events/item"],

  events: {
    "click .event-item": "eventShow"
  },

  render: function () {
    var content = this.template({
      event: this.model,
      showDate: this.showDate
    });
    this.$el.html(content);
    return this;
  },

  eventShow: function () {
    Backbone.history.navigate("groups/" + this.model.get("group_id") + "/events/" + this.model.id, { trigger: true });
  }
});
