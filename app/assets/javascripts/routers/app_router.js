CleatUp.Routers.App = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // this.collection = new CleatUp.Collections.Groups();
  },

  routes: {
    "": "landing",
    "interests/:type": "interestsIndex",
    "interests/:type/:id": "interestsIndex",
    "groups/new": "groupNew",
    "groups/:id/edit": "groupEdit",
    "groups/:id/events/new": "eventNew",
    "groups/:id": "groupShow",
    "events/:id": "eventShow",
    "events/:id/edit": "eventEdit",
  },

  interestsIndex: function (type, id) {
    var interests = new CleatUp.Collections.Interests();
    interests.fetch({ data: {
        interestable_type: type,
        group_id: id
      }
    });
    var view = new CleatUp.Views.InterestsIndex({
      collection: interests,
      type: type,
      group_id: id
    });
    this._swapView(view);
  },

  landing: function () {
    var view = new CleatUp.Views.Landing();
    this._swapView(view);
  },

  eventNew: function (group_id) {
    var event = new CleatUp.Models.Event();
    event.fetch();
    // var group = new CleatUp.Models.Group({ id: group_id });
    // group.fetch();
    var view = new CleatUp.Views.EventForm({
      formType: "New",
      model: event,
      group_id: group_id
    });
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

  groupNew: function () {
    var group = new CleatUp.Models.Group();
    group.fetch();
    var view = new CleatUp.Views.GroupForm({
      formType: "New",
      model: group
    });
    this._swapView(view);
  },

  groupEdit: function (id) {
    var group = new CleatUp.Models.Group({ id: id });
    group.fetch();
    var view = new CleatUp.Views.GroupForm({
      formType: "Edit",
      model: group
    });
    this._swapView(view);
  },

  eventEdit: function (id) {
    var event = new CleatUp.Models.Event({ id: id });
    event.fetch();
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
