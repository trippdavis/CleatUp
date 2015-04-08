CleatUp.Views.GroupForm = Backbone.View.extend({
  initialize: function (options) {
    this.formType = options.formType;
  },

  template: JST["groups/form"],

  events: {
    "submit .group-form": "submit",
    "click .back-to-index": "toIndex"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$el.prepend("<h3>" + (this.formType === "New" ? "New Group" : "Edit Group") + "</h3>");
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var data = $(event.currentTarget).serializeJSON();
    this.model.set(data);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("#/groups/" + this.model.id, { trigger: true });
      }.bind(this)
    });
  },

  toIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  }
});
