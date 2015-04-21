PickUp.Views.GroupEvents = Backbone.CompositeView.extend({
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
      var view = new PickUp.Views.GroupEvent({ model: event });
      this.addSubview(".group-events", view);
    }.bind(this));
  }
});
