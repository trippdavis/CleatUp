PickUp.Views.Navbar = Backbone.View.extend({
  initialize: function (options) {
    this.interests = options.interests;
  },

  template: JST["navbar"],

  events: {
    "click .edit-interests": "editInterests",
    "click .log-out": "logout"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  editInterests: function (event) {
    event.preventDefault();

    var view = new PickUp.Views.InterestsModal({
      collection: this.interests,
      type: "user"
    });

    this.$el.append(view.render().$el);
  },

  logout: function (event) {
    event.preventDefault();

    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location.pathname = "/session/new";
      }
    });
  }
});
