PickUp.Views.GroupBody = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.type = options.type;
    this.event_id = options.event_id;
    if (this.event_id > 0) {
      this.currentEvent = this.collection.getOrFetch(this.event_id);
    }
  },

  template: JST["groups/body"],

  events: {
    "click .delete-event": "destroy",
    "click .back-to-index": "backHome",
    "click .group-event": "clickEvent",
    "click .edit-event": "clickEdit",
    "click .back-to-show": "showEvent",
    "submit .event-form": "submitEvent"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.type === "group") {
      this.groupHome();
    } else if (this.type === "event") {
      this.showEvent();
    } else if (this.type === "event-edit") {
      this.editEvent();
    } else if (this.type === "event-new") {
      this.newEvent();
    }

    return this;
  },

  clickEdit: function () {
    Backbone.history.navigate("groups/" + this.model.id + "/events/" + this.currentEvent.id + "/edit");
    this.editEvent();
  },

  editEvent: function () {
    $(".game-alert").html("Game edited successfully!");
    $(".game-alert").css("display", "none");
    $(".game-alert").css("opacity", 1);
    var view = new PickUp.Views.EventForm({
      model: this.currentEvent,
      group_id: this.model.id,
      formType: "Edit"
    });
    this._swapBody(view);
  },

  newEvent: function () {
    this.currentEvent = new PickUp.Models.Event();
    var view = new PickUp.Views.EventForm({
      model: this.currentEvent,
      group_id: this.model.id,
      formType: "New"
    });
    this._swapBody(view);
  },

  backHome: function (event) {
    if (event) {
      event.preventDefault();
    }

    Backbone.history.navigate("groups/" + this.model.id);
    this.groupHome();
  },

  groupHome: function () {
    this.collection.fetch({
      data: {
        type: "group",
        group_id: this.model.id
      }
    });
    var view = new PickUp.Views.GroupEvents({
      model: this.model,
      collection: this.collection
    });
    this._swapBody(view);
  },

  clickEvent: function (event) {
    var event_id = $(event.currentTarget).data("event-id");
    this.currentEvent = this.collection.getOrFetch(event_id);
    Backbone.history.navigate("groups/" + this.model.id + "/events/" + event_id);
    this.showEvent();
  },

  showEvent: function (event) {
    if (event) {
      event.preventDefault();
    }

    Backbone.history.navigate("groups/" + this.model.id + "/events/" + this.currentEvent.id);
    var view = new PickUp.Views.EventShow({
      model: this.currentEvent
    });
    this._swapBody(view);
  },

  submitEvent: function (event) {
    event.preventDefault();

    var data = $(event.currentTarget).serializeJSON();
    this.currentEvent.set(data);
    this.currentEvent.save({}, {
      success: function () {
        $(".game-alert").css("display", "block");
        this.currentEvent.owned = true;
        this.showEvent();
        $(".game-alert").css("opacity", 0);
      }.bind(this),
      error: function (model, response) {
        if (response.status === 500) {
          this.showEvent();
        } else {
          this.currentBody.handleError(model, response);
        }
      }.bind(this)
    });
  },

  destroy: function (event) {
    this.currentEvent.destroy({
      success: function () {
        this.backHome();
      }.bind(this)
    });
  },

  _swapBody: function (view) {
    if (this.currentBody) {
      this.removeSubview(".group-body", this.currentBody);
    }

    this.addSubview(".group-body", view);
    this.currentBody = view;
  }
});
