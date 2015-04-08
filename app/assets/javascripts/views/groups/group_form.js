CleatUp.Views.GroupForm = Backbone.View.extend({
  initialize: function (options) {
    this.formType = options.formType;
    this.model.fetch();
    this.listenTo(this.model, "sync", this.setupFill);
  },

  template: JST["groups/form"],

  events: {
    "submit .group-form": "submit",
    "click .back-to-index": "toIndex"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.formSpecific();
    return this;
  },

  formSpecific: function () {
    if (this.formType === "New") {
      this.$el.prepend("<h3>New Group</h3>");

    } else {
      this.$el.prepend("<h3>Edit Group</h3>");
    }
  },

  submit: function (event) {
    event.preventDefault();

    var data = $(event.currentTarget).serializeJSON();
    this.model.set(data);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("#/groups/" + this.model.id, { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this.handleError(model, response);
        // Backbone.history.navigate("#/groups/new", { trigger: true });
        // Backbone.history.navigate("#/groups/" + model.id, { trigger: true });
      }.bind(this)
    });
  },

  toIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  },

  handleError: function (model) {
    this.fillForm(
      model.attributes.group.title,
      model.attributes.group.description
    );
  },

  setupFill: function () {
    if (this.formType == "Edit") {
      this.fillForm(this.model.get("title"), this.model.get("description"));
    }
  },

  fillForm: function (title, description) {
    this.$el.find(".group-title").val(title);
    this.$el.find(".group-description").val(description);
  }
});
