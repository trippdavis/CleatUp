CleatUp.Views.Landing = Backbone.View.extend({
  template: JST["landing"],

  events: {
    "click .switch": "switch",
    "click .new-group": "newGroup"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$el.find(".switch").text("Events");
    this.groupsLanding();
    return this;
  },

  switch: function (event) {
    event.preventDefault();
    if (this.$el.find(".switch").text() === "Events") {
      this.eventsLanding();
      this.$el.find(".switch").text("Groups");
    } else {
      this.groupsLanding();
      this.$el.find(".switch").text("Events");
    }
  },

  groupsLanding: function () {
    var view = new CleatUp.Views.GroupsLanding();
    this._swapLanding(view);
  },

  eventsLanding: function () {
    var view = new CleatUp.Views.EventsLanding();
    this._swapLanding(view);
  },

  newGroup: function (event) {
    event.preventDefault();
    Backbone.history.navigate("#/groups/new");
  },

  _swapLanding: function (view) {
    if (this.currentLanding) {
      this.currentLanding.remove();
    }

    this.$el.find(".indexes-area").html(view.render().$el);
    this.currentLanding = view;
  }
});
