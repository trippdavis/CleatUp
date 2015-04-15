CleatUp.Views.GroupShow = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
    this.event_id = options.event_id;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.fillBody);
  },

  events: {
    "click .delete-group": "destroy",
    "click .edit-group": "edit",
    "click .create-event": "newEvent",
    "click .edit-interests": "editInterests",
    "click .join-group": "joinGroup",
    "click .leave-group": "leaveGroup",
    "click .group-banner": "backHome"
  },

  template: JST['groups/show'],

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    if (this.model.get("membership_id")) {
      this.toggleButton();
    }
    return this;
  },

  fillBody: function () {
    var view = new CleatUp.Views.GroupBody({
      type: this.type,
      event_id: this.event_id,
      model: this.model,
      collection: this.collection
    });

    this._addBody(view);
  },

  backHome: function () {
    var view = new CleatUp.Views.GroupBody({
      type: "group",
      model: this.model,
      collection: this.collection
    });
    Backbone.history.navigate("groups/" + this.model.id);

    this._addBody(view);
  },

  newEvent: function (event) {
    $(event.target).blur();
    var view = new CleatUp.Views.GroupBody({
      type: "event-new",
      model: this.model,
      collection: this.collection
    });
    Backbone.history.navigate("groups/" + this.model.id + "/events/new");

    this._addBody(view);
  },

  editInterests: function (event) {
    $(event.target).prop("disabled", true);
    Backbone.history.navigate("interests/group/" + this.model.id, { trigger: true });
  },

  joinGroup: function (event) {
    $(event.target).blur();
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
    $(event.target).blur();
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

  _addBody: function (view) {
    if (this.currentBody) {
      this.currentBody.remove();
    }

    this.$el.append(view.render().$el);
    this.currentBody = view;
  }
});
