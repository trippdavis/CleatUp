PickUp.Views.UserInterests = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.interests = options.interests;
  },

  template: JST["interests/user"],

  className: "user-interests",

  events: {
    "click .submit-interests": "submitInterests"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.interests.fetch({
      data: {
        type: "normal"
      }
    });

    var view = new PickUp.Views.InterestsIndex({
      type: "user",
      new: true,
      collection: this.interests
    });
    this.addSubview(".interests", view);
    return this;
  },

  submitInterests: function (event) {
    $(".btn-success").each(function(i, interestBtn) {
      $.ajax({
        url: "/interestings",
        type: "POST",
        data: {
          interest_id: $(interestBtn).data("id"),
          type: "User"
        }
      });
    });

    Backbone.history.navigate("", { trigger: true });
  }
});
