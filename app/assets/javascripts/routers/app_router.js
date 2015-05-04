PickUp.Routers.App = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$subEl = $("#sub-content");
    this.groups = new PickUp.Collections.Groups();
    this.myEvents = new PickUp.Collections.Events();
    this.interests = new PickUp.Collections.Interests();
    this.addNavbar();
    this.currentLanding = "groups";
  },

  addNavbar: function () {
    var view = new PickUp.Views.Navbar({
      interests: this.interests
    });
    $("#site-navbar").html(view.render().$el);
  },

  routes: {
    "": "landing",
    "interests/user": "userInterests",
    "groups/new": "groupNew",
    "groups/:id/edit": "groupEdit",
    "groups/:id/events/:attr1/:attr2": "groupShow",
    "groups/:id/events/:attr1": "groupShow",
    "groups/:id": "groupShow"
  },

  userInterests: function () {
    var view = new PickUp.Views.UserInterests({
      interests: this.interests
    });
    this._swapView(view);
  },

  landing: function () {
    var view = new PickUp.Views.Landing({
      groups: this.groups,
      myEvents: this.myEvents,
      interests: this.interests,
      router: this
    });
    this._swapView(view);
  },

  switchLanding: function () {
    this.currentLanding = (this.currentLanding === "groups" ? "events" : "groups");
  },

  groupShow: function (id, event_id, edit) {
    var group = this.groups.getOrFetch(id);
    var type = this.determineType(event_id, edit);

    var view = new PickUp.Views.GroupShow({
      model: group,
      collection: this.myEvents,
      interests: this.interests,
      event_id: event_id,
      type: type,
      showInterests: false
    });
    this._swapView(view);
  },

  determineType: function (event_id, edit) {
    if (event_id === "new" && edit === null) {
      return "event-new";
    } else if (event_id && edit === null) {
      return "event";
    } else if (event_id && edit === "edit") {
      return "event-edit";
    } else {
      return "group";
    }
  },

  groupNew: function () {
    var group = new PickUp.Models.Group();
    var view = new PickUp.Views.GroupForm({
      formType: "New",
      model: group
    });
    this._swapView(view);
  },

  groupEdit: function (id) {
    var group = this.groups.getOrFetch(id);
    var view = new PickUp.Views.GroupForm({
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

    this.$subEl.html(view.render().$el);
    this.currentView = view;
  }
});
