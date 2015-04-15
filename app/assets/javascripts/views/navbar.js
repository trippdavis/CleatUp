CleatUp.Views.Navbar = Backbone.View.extend({
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

    var type = "user";

    this.interests.fetch({ data: {
        interestable_type: type
      }
    });

    var view = new CleatUp.Views.InterestsIndex({
      collection: this.interests,
      type: type
    });

    this.$el.append(view.render().$el);
  },

  logout: function (event) {
    event.preventDefault();

    $.ajax({
      url: "/session",
      type: "DELETE"
    });
  }
});
