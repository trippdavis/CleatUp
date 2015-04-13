CleatUp.Views.EventItem = Backbone.View.extend({
  template: JST["events/item"],

  events: {
    "click .event-item": "eventShow"
  },

  render: function () {
    var content = this.template({ event: this.model });
    this.$el.html(content);
    return this;
  },

  eventShow: function () {
    Backbone.history.navigate("events/" + this.model.id, { trigger: true });
  }
});
