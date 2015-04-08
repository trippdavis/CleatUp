CleatUp.Routers.App = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // this.collection = new CleatUp.Collections.Groups();
  },

  routes: {
    "": "landing",
    "groups/new": "newGroup",
    "groups/:id/edit": "editGroup",
    "groups/:id": "groupShow",
    "events/:id": "eventShow",
    "events/:id/edit": "editEvent"
  },

  landing: function () {
    var view = new CleatUp.Views.Landing();
    this._swapView(view);
  },

  groupShow: function (id) {
    var group = new CleatUp.Models.Group({ id: id });
    group.fetch();
    var view = new CleatUp.Views.GroupShow({ model: group });
    this._swapView(view);
  },

  eventShow: function (id) {
    var event = new CleatUp.Models.Event({ id: id });
    event.fetch();
    var view = new CleatUp.Views.EventShow({ model: event });
    this._swapView(view);
  },

  newGroup: function () {
    var group = new CleatUp.Models.Group();
    var view = new CleatUp.Views.GroupForm({
      formType: "New",
      model: group
    });
    this._swapView(view);
  },

  editGroup: function (id) {
    var group = new CleatUp.Models.Group({ id: id });
    var view = new CleatUp.Views.GroupForm({
      formType: "Edit",
      model: group
    });
    this._swapView(view);
  },

  editEvent: function (id) {
    var event = new CleatUp.Models.Event({ id: id });
    var view = new CleatUp.Views.EventForm({
      formType: "Edit",
      model: event
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }

    this.$rootEl.html(view.render().$el);
    this.currentView = view;
  }
});
