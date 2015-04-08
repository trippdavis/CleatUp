CleatUp.Routers.App = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // this.collection = new CleatUp.Collections.Groups();
  },

  routes: {
    "": "landing"
  },

  landing: function () {
    var view = new CleatUp.Views.Landing();
    this.$rootEl.html(view.render().$el);
  }
});
