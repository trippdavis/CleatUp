CleatUp.Routers.App = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // this.collection = new CleatUp.Collections.Groups();
  },

  routes: {
    "": "landing",
    "groups/new": "newGroup",
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
    var view = new CleatUp.Views.GroupsNew();
    this.$rootEl.html(view.render().$el);
  }
});
