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
    "groups/:id/events/:id/edit": "eventEdit",
    "groups/:id/events/:id": "eventShow",
    "groups/:id": "groupShow"
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
    this.$rootEl.append(view.render().$el);
    this.currentModal = view;
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

  groupShow: function (id) {
    var group = this.groups.getOrFetch(id);
    var view = new CleatUp.Views.GroupShow({
      model: group,
      collection: this.myEvents,
      type: "group"
    });
    this._swapView(view);
  },

  eventNew: function (group_id) {
    var group = this.groups.getOrFetch(group_id);
    var view = new CleatUp.Views.GroupShow({
      collection: this.myEvents,
      model: group,
      type: "event-new"
    });
    this._swapView(view);
  },

  eventEdit: function (group_id, event_id) {
    var group = this.groups.getOrFetch(group_id);
    var view = new CleatUp.Views.GroupShow({
      collection: this.myEvents,
      model: group,
      event_id: event_id,
      type: "event-edit"
    });
    this._swapView(view);
  },

  eventShow: function (group_id, event_id) {
    var group = this.groups.getOrFetch(group_id);
    var view = new CleatUp.Views.GroupShow({
      collection: this.myEvents,
      model: group,
      event_id: event_id,
      type: "event"
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

  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }

    if (this.currentModal) {
      this.currentModal.remove();
      this.currentModal = null;
    }

    this.$banner.addClass("invisible-banner");
    this.$subEl.html(view.render().$el);
    this.currentView = view;
  }
});
