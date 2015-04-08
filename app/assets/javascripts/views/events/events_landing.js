CleatUp.Views.EventsLanding = Backbone.View.extend({
  template: JST['events/landing'],

  // events: {
  //   "click .new-group": "newGroup"
  // },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.createdEvents();
    this.otherEvents();
    return this;
  },

  createdEvents: function () {
    var view = new CleatUp.Views.EventsIndex({ type: "created" });
    this.$el.find(".created-events").html(view.render().$el);
  },

  otherEvents: function () {
    var view = new CleatUp.Views.EventsIndex({ type: "other" });
    this.$el.find(".other-events").html(view.render().$el);
  }
  //
  // newGroup: function (event) {
  //   event.preventDefault();
  //   Backbone.history.navigate("#/groups/new");
  // }
});
