PickUp.Views.GroupForm = Backbone.View.extend({
  initialize: function (options) {
    this.formType = options.formType;
    this.listenTo(this.model, "sync", this.setupFill);
  },

  template: JST["groups/form"],

  className: "group-form-box col-md-4 col-md-offset-4",

  events: {
    "click .submit-group-form": "submit",
    "click .back": "back",
    "click .show-interests": "showInterests",
    "click .file-upload": "upload"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.formSpecific();
    return this;
  },

  upload: function (event) {
    event.preventDefault();
    filepicker.pick(function(blob) {
      this.filepickerUrl = blob.url;
      $(".group-preview-image").attr("src", blob.url);
      $(".alert-success").show();
    }.bind(this));
  },

  showInterests: function () {
    event.preventDefault();
    var interests = new PickUp.Collections.Interests();
    interests.fetch({ data: { type: "normal"} });
    this.interestsIndex = new PickUp.Views.InterestsIndex({
      new: true,
      type: "group",
      collection: interests
    });

    $(".new-group-interests").html(this.interestsIndex.$el);
  },

  formSpecific: function () {
    if (this.formType === "New") {
      this.$el.prepend("<h3>New Group</h3>");
      this.$el.find(".new-group-interests").css("visibility", "visible");
    } else {
      this.$el.prepend("<h3>Edit Your Group</h3>");
    }
  },

  submit: function (event) {
    event.preventDefault();

    var data = $(event.currentTarget).parent().serializeJSON();
    if (this.filepickerUrl) {
      data.group.filepicker_url = this.filepickerUrl;
    }
    this.model.set(data);
    this.model.save({}, {
      success: function () {
        $(".btn-success").each(function (i, interestBtn) {
          $.ajax({
            url: "/interestings",
            type: "POST",
            data: {
              interest_id: $(interestBtn).data("id"),
              type: "group",
              group_id: this.model.id
            }
          });
        }.bind(this));
        Backbone.history.navigate("#/groups/" + this.model.id, { trigger: true });

        if (this.formType === "New") {
          PickUp.pubSub.trigger("newGroup");
        } else {
          PickUp.pubSub.trigger("editedGroup");
        }
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
      this.fillForm(this.model.get("title"), this.model.get("description"), this.model.get("filepicker_url"));
    }
  },

  fillForm: function (title, description, imageUrl) {
    $(".form-group-title").val(title);
    $(".form-group-description").val(description);
    $(".group-preview-image").attr("src", imageUrl);
  }
});
