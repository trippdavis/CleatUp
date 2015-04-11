CleatUp.Views.Landing = Backbone.View.extend({
  template: JST["landing"],

  events: {
    "click .groups": "switchLanding",
    "click .events": "switchLanding",
    "click .new-group": "newGroup",
    "click .add-interests": "addInterests"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.groupsLanding();
    this.dropdown();
    return this;
  },

  addInterests: function () {
    Backbone.history.navigate("/interests/user", { trigger: true });
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

  dropdown: function () {
    var view = new CleatUp.Views.Dropdown();
    this.$el.find(".dropdown-bar").html(view.render().$el);
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
