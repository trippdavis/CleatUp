CleatUp.Views.GroupForm = Backbone.View.extend({
  initialize: function (options) {
    this.formType = options.formType;
    debugger
    this.listenTo(this.model, "sync", this.setupFill);
  },

  template: JST["groups/form"],

  events: {
    "submit .group-form": "submit",
    "click .back-to-index": "toIndex",
    "click .back-to-show": "toShow"
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
      this.$el.append("<button class='back-to-index'>Back</button>");
    } else {
      this.$el.prepend("<h3>Edit Group</h3>");
      this.$el.append("<button class='back-to-show'>Back</button>");
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
        if (response.status === 500) {
          Backbone.history.navigate("#/groups/" + model.id, { trigger: true });
        } else {
          this.handleError(model, response);
        }
      }.bind(this)
    });
  },

  toShow: function (event) {
    event.preventDefault();
    Backbone.history.navigate("#/groups/" + this.model.id, { trigger: true });
  },

  toIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  },

  handleError: function (model, response) {
    this.showErrors(response.responseJSON.errors);
    this.fillForm(
      model.attributes.group.title,
      model.attributes.group.description
    );
  },

  showErrors: function (errors) {
    var $ul = this.$el.find("ul.errors");
    $ul.empty();
    errors.forEach( function (err) {
      $ul.append("<li>" + err + "</li>");
    });
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
