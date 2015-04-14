CleatUp.Views.GroupEvents = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["groups/events"],

  render: function () {
    var content = this.template({ events: this.collection });
    this.$el.html(content);

    this.collection.each(function (event) {
      var view = new CleatUp.Views.GroupEvent({ model: event });
      this.$el.find(".group-events").append(view.render().$el);
    }.bind(this));

    return this;
  }
});
