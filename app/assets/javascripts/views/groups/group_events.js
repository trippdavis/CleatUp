CleatUp.Views.GroupEvents = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["groups/events"],

  render: function () {
    var content = this.template({ events: this.collection });
    this.$el.html(content);
    return this;
  }
});
