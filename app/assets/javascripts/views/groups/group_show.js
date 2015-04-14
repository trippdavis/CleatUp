CleatUp.Views.GroupShow = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
    this.event = options.event;
    this.listenTo(this.model, "sync", this.render);
    if (this.type === "group") {
      this.listenTo(this.model, "sync", this.addEvents);
    }
  },

  events: {
    "click .return-to-landing": "toLanding",
    "click .delete-group": "destroy",
    "click .edit-group": "edit",
    "click .create-event": "newEvent",
    "click .edit-interests": "editInterests",
    "click .join-group": "joinGroup",
    "click .leave-group": "leaveGroup"
  },

  template: JST['groups/show'],

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    if (this.model.get("membership_id")) {
      this.toggleButton();
    }
    if (this.type === "event") {
      this.showEvent();
    }
    return this;
  },

  addEvents: function () {
    this.collection.fetch({
      data: {
        type: "group",
        group_id: this.model.id
      }
    });
    var view = new CleatUp.Views.GroupEvents({ collection: this.collection });
    this.$el.find(".group-body").append(view.$el);
  },

  showEvent: function () {
    var view = new CleatUp.Views.EventShow({ model: this.event });
    this.$el.find(".group-body").html(view.$el);
  },

  editInterests: function () {
    Backbone.history.navigate("interests/group/" + this.model.id, { trigger: true });
  },

  newEvent: function (event) {
    event.preventDefault();
    Backbone.history.navigate("groups/" + this.model.id + "/events/new", { trigger: true });
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
    $button = $("#joined");
    $button.toggleClass("join-group");
    $button.toggleClass("leave-group");
    if ($button.text() === "Join Us!") {
      $button.text("Leave Group");
    } else {
      $button.text("Join Us!");
    }
  },

  edit: function (event) {
    event.preventDefault();
    Backbone.history.navigate("groups/" + this.model.id + "/edit", { trigger: true });
  },

  toLanding: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  },

  destroy: function (event) {
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
});
