CleatUp.Views.GroupEvents = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.addEvents);
  },

  template: JST["groups/events"],

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);

    return this;
  },

  addEvents: function () {
    this.collection.each(function (event) {
      var view = new CleatUp.Views.GroupEvent({ model: event });
      this.$el.find(".group-events").append(view.render().$el);
    }.bind(this));
  }
});
