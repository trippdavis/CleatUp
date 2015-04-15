CleatUp.Views.GroupShow = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
    this.event_id = options.event_id;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .delete-group": "destroy",
    "click .edit-group": "edit",
    "click .create-event": "clickNewEvent",
    "click .edit-interests": "editInterests",
    "click .join-group": "joinGroup",
    "click .leave-group": "leaveGroup",
    "click .group-banner": "backHome",
    "click .group-event": "clickEvent"
  },

  template: JST['groups/show'],

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    if (this.model.get("membership_id")) {
      this.toggleButton();
    }

    this.fillBody();
    return this;
  },

  fillBody: function () {
    if (this.type === "group") {
      this.groupHome();
    } else if (this.type === "event") {
      this.showEvent();
    } else if (this.type === "event-edit") {
      this.editEvent();
    } else if (this.type === "event-new") {
      this.newEvent();
    }
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

  clickNewEvent: function () {
    this.newEvent();
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
    this.groupHome();
  },

  groupHome: function () {
    this.$el.find(".group-body").html("<div class='group-description'>" + this.model.escape("description") + "</div>");
    this.collection.fetch({
      data: {
        type: "group",
        group_id: this.model.id
      }
    });
    var view = new CleatUp.Views.GroupEvents({ collection: this.collection });
    this._swapBody(view);
  },

  clickEvent: function (event) {
    this.event_id = $(event.currentTarget).data("event-id");
    this.showEvent();
  },

  showEvent: function () {
    this.event = this.collection.getOrFetch(this.event_id);
    var view = new CleatUp.Views.EventShow({ model: this.event });
    this._swapBody(view);
  },

  editInterests: function () {
    Backbone.history.navigate("interests/group/" + this.model.id, { trigger: true });
  },

  joinGroup: function (event) {
    event.preventDefault();
    $.ajax({
      url: "/group_memberships",
      type: "POST",
      data: { group_id: this.model.id },
      success: function (membership) {
        this.toggleButton();
        this.model.set("membership_id", membership.id);
      }.bind(this)
    });
  },

  leaveGroup: function (event) {
    event.preventDefault();
    $.ajax({
      url: "/group_memberships/" + this.model.get("membership_id"),
      type: "DELETE",
      success: function () {
        this.model.set("membership_id", 0);
        this.toggleButton();
      }.bind(this)
    });
  },

  toggleButton: function () {
    $button = $("#joined-group");
    $button.toggleClass("join-group");
    $button.toggleClass("leave-group");
    if ($button.text() === "Join Us!") {
      $button.text("Leave Group");
    } else {
      $button.text("Join Us!");
    }
  },

  edit: function () {
    Backbone.history.navigate("groups/" + this.model.id + "/edit", { trigger: true });
  },

  destroy: function () {
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  _swapBody: function (view) {
    if (this.currentBody) {
      this.currentBody.remove();
    }

    this.$el.find(".group-body").html(view.render().$el);
    this.currentBody = view;
  }
});
