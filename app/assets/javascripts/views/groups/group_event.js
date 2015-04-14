CleatUp.Views.GroupEvent = Backbone.View.extend({
  template: JST["groups/event"],

  events: {
    "click .group-event": "showEvent"
  },

  render: function () {
    var content = this.template({ event: this.model });
    this.$el.html(content);
    return this;
  },

  showEvent: function () {
    Backbone.history.navigate("events/" + this.model.id, { trigger: true });
  }
});
