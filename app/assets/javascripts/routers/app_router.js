CleatUp.Routers.App = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$subEl = $("#sub-content");
    this.$banner = $("#landing-banner");
    this.groups = new CleatUp.Collections.Groups();
    this.myEvents = new CleatUp.Collections.Events();
    this.interests = new CleatUp.Collections.Interests();
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
    this.interests.fetch({ data: {
        interestable_type: type,
        group_id: id
      }
    });
    var view = new CleatUp.Views.InterestsIndex({
      collection: this.interests,
      type: type,
      group_id: id
    });
    this._swapView(view);
  },

  landing: function () {
    var view = new CleatUp.Views.Landing({
      groups: this.groups,
      myEvents: this.myEvents,
      interests: this.interests
    });
    this._swapView(view);
    this.$banner.removeClass("invisible-banner");
  },

  eventNew: function (group_id) {
    var event = new CleatUp.Models.Event();
    var view = new CleatUp.Views.EventForm({
      formType: "New",
      model: event,
      group_id: group_id
    });
    this._swapView(view);
  },

  groupShow: function (id) {
    var group = this.groups.getOrFetch(id);
    this.myEvents.fetch({
      data: {
        type: "group",
        group_id: id
      }
    });
    var view = new CleatUp.Views.GroupShow({
      model: group,
      collection: this.myEvents
    });
    this._swapView(view);
  },

  eventShow: function (id) {
    var event = this.myEvents.getOrFetch(id);
    var view = new CleatUp.Views.EventShow({
      model: event
    });
    this._swapView(view);
  },

  groupNew: function () {
    var group = new CleatUp.Models.Group();
    var view = new CleatUp.Views.GroupForm({
      formType: "New",
      model: group
    });
    this._swapView(view);
  },

  groupEdit: function (id) {
    var group = this.groups.getOrFetch(id);
    var view = new CleatUp.Views.GroupForm({
      formType: "Edit",
      model: group
    });
    this._swapView(view);
  },

  eventEdit: function (id) {
    var event = this.myEvents.getOrFetch(id);
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

    this.$banner.addClass("invisible-banner");
    this.$subEl.html(view.render().$el);
    this.currentView = view;
  }
});
