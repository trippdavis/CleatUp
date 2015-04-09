CleatUp.Views.GroupShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.events(), "sync", this.addEvents);
  },

  events: {
    "click .return-to-landing": "toLanding",
    "click .delete-group": "destroy",
    "click .edit-group": "edit",
    "click .create-event": "newEvent",
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

    return this;
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
      success: function () {
        this.toggleButton();
        this.model.set("membership_id", 0);
      }.bind(this)
    });
  },

  leaveGroup: function (event) {
    event.preventDefault();
    $.ajax({
      url: "/group_memberships/" + this.model.get("membership_id"),
      type: "DELETE",
      success: function (membership) {
        this.model.set("membership_id", membership.id);
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


  // addEvents: function () {
  //   var view = new CleatUp.Views.GroupEventsIndex({
  //     collection: this.model.comments()
  //   });
  //   this.$el.find(".group-events").html(view.render().$el);
  // },

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
