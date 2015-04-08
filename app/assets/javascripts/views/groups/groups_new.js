CleatUp.Views.GroupsNew = Backbone.View.extend({
  template: JST["groups/new"],

  events: {
    "submit .new-group-form": "submit",
    "click .back-to-index": "toIndex"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var data = $(event.currentTarget).serializeJSON();
    var model = new CleatUp.Models.Group(data);
    model.save({}, {
      success: function () {
        Backbone.history.navigate("#/groups/" + model.id, { trigger: true });
      }
    });
  },

  toIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  }
});
