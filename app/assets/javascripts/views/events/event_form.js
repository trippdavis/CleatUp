PickUp.Views.EventForm = Backbone.View.extend({
  initialize: function (options) {
    this.group_id = options.group_id;
    this.formType = options.formType;

    if (this.formType === "Edit") {
      this.listenTo(this.model, "sync", this.render);
      this.listenTo(this.model, "sync", this.setupFill);
    }
  },

  className: "event-form-box",

  template: JST["events/form"],

  render: function () {
    var content = this.template({
      event: this.model,
      group_id: this.group_id
    });
    this.$el.html(content);
    this.formSpecific();
    this.setupFill();
    return this;
  },

  formSpecific: function () {
    if (this.formType === "New") {
      this.$el.prepend("<h3>Create a New Game!</h3>");
      this.$el.find(".back").addClass("back-to-index");
    } else {
      this.$el.prepend("<h3>Edit Your Game!</h3>");
      this.$el.find(".back").addClass("back-to-show");
    }
  },

  handleError: function (model, response) {
    this.showErrors(response.responseJSON.errors);

    this.fillForm(
      model.attributes.event.title,
      model.attributes.event.location,
      model.attributes.event.description,
      model.attributes.event.date,
      model.attributes.event.time
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
      this.fillForm(
        this.model.get("title"),
        this.model.get("location"),
        this.model.get("description"),
        this.model.formDate,
        this.model.formTime
      );
    }
  },

  fillForm: function (title, location, description, date , time) {
    this.$el.find(".form-event-title").val(title);
    this.$el.find(".form-event-location").val(location);
    this.$el.find(".form-event-description").val(description);
    this.$el.find(".form-event-date").val(date);
    this.$el.find(".form-event-time").val(time);
  }
});
