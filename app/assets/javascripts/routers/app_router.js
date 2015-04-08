CleatUp.Routers.App = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // this.collection = new CleatUp.Collections.Groups();
  },

  routes: {
    "": "landing",
    "groups/new": "newGroup",
    "groups/:id/edit": "editGroup",
    "groups/:id": "groupShow"
  },

  landing: function () {
    var view = new CleatUp.Views.Landing();
    this.$rootEl.html(view.render().$el);
  },

  groupShow: function (id) {
    var group = new CleatUp.Models.Group({ id: id });
    group.fetch();
    var view = new CleatUp.Views.GroupShow({ model: group });
    this.$rootEl.html(view.render().$el);
  },

  newGroup: function () {
    var group = new CleatUp.Models.Group();
    var view = new CleatUp.Views.GroupForm({
      formType: "New",
      model: group
    });
    this.$rootEl.html(view.render().$el);
  },

  editGroup: function (id) {
    var group = new CleatUp.Models.Group({ id: id });
    var view = new CleatUp.Views.GroupForm({
      formType: "Edit",
      model: group
    });
    this.$rootEl.html(view.render().$el);
  }
});
