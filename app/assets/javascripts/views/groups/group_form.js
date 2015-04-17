PickUp.Views.GroupForm = Backbone.View.extend({
  initialize: function (options) {
    this.formType = options.formType;
    this.listenTo(this.model, "sync", this.setupFill);
  },

  template: JST["groups/form"],

  className: "group-form-box col-md-6 col-md-offset-3",

  events: {
    "submit .group-form": "submit",
    "click .back": "back"
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
      this.$el.prepend("<h3>Edit Your Group</h3>");
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

  back: function (event) {
    event.preventDefault();

    if (this.formType === "New") {
      Backbone.history.navigate("", { trigger: true });
    } else {
      Backbone.history.navigate("#/groups/" + this.model.id, { trigger: true });
    }
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

    $ul.parent().show();
  },

  setupFill: function () {
    if (this.formType == "Edit") {
      this.fillForm(this.model.get("title"), this.model.get("description"));
    }
  },

  fillForm: function (title, description) {
    this.$el.find(".form-group-title").val(title);
    this.$el.find(".form-group-description").val(description);
  }
});
