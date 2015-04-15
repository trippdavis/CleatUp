CleatUp.Views.GroupBody = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
    this.event_id = options.event_id;
  },

  className: "group-body",

  events: {
    "click .back-to-index": "backHome",
    "click .group-event": "clickEvent",
    "click .edit-event": "clickEdit",
    "click .back-to-show": "showEvent"
  },

  render: function () {
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
    Backbone.history.navigate("groups/" + this.model.id + "/events/" + this.event_id + "/edit");
    editEvent();
  },

  editEvent: function () {
    var event = this.collection.getOrFetch(this.event_id);
    var view = new CleatUp.Views.EventForm({
      model: event,
      group_id: this.model.id,
      formType: "Edit"
    });
    this._swapBody(view);
  },

  newEvent: function () {
    var event = new CleatUp.Models.Event();
    event.fetch();
    var view = new CleatUp.Views.EventForm({
      model: event,
      group_id: this.model.id,
      formType: "New"
    });
    this._swapBody(view);
  },

  backHome: function () {
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
    var view = new CleatUp.Views.GroupEvents({
      model: this.model,
      collection: this.collection
    });
    this._swapBody(view);
  },

  clickEvent: function (event) {
    this.event_id = $(event.currentTarget).data("event-id");
    Backbone.history.navigate("groups/" + this.model.id + "/events/" + this.event_id);
    this.showEvent();
  },

  showEvent: function () {
    this.event = this.collection.getOrFetch(this.event_id);
    var view = new CleatUp.Views.EventShow({ model: this.event });
    this._swapBody(view);
  },

  _swapBody: function (view) {
    if (this.currentBody) {
      this.currentBody.remove();
    }

    this.$el.html(view.render().$el);
    this.currentBody = view;
  }
});
