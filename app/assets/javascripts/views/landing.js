CleatUp.Views.Landing = Backbone.View.extend({
  template: JST["landing"],

  events: {
    "click .groups": "switchLanding",
    "click .events": "switchLanding",
    "click .new-group": "newGroup"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.groupsLanding();
    return this;
  },

  switchLanding: function (event) {
    $(event.target).prop("disabled", true);
    if ($(event.target).hasClass("events")) {
      this.eventsLanding();
      $(".groups").prop("disabled", false);
    } else {
      this.groupsLanding();
      $(".events").prop("disabled", false);
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
