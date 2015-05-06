PickUp.Views.GroupShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.interests = options.interests;
    this.type = options.type;
    this.event_id = options.event_id;
    this.showInterests = options.showInterests;
    this.listenTo(this.model, "sync", this.fillContent);
    this.alert = false;
    PickUp.pubSub.on("interestsAdded", this.addSidebar, this);
    PickUp.pubSub.on("newGroup", this.newGroup, this);
    PickUp.pubSub.on("editedGroup", this.editedGroup, this);
  },

  newGroup: function () {
    this.alert = true;
    this.alertText = "Group created successfully!";
  },

  editedGroup: function () {
    this.alert = true;
    this.alertText = "Group edited successfully!";
  },

  showAlert: function () {
    $(".group-alert").html(this.alertText);
    $(".group-alert").css("display", "block");
    setTimeout(2000);
    $(".group-alert").animate({ opacity: 0 }, 2000);
  },

  fillContent: function () {
    this.render();
    if (this.alert) {
      this.showAlert();
    }
    this.fillBody();
    if (this.showInterests) {
      this.editInterests();
    }
  },

  events: {
    "click .delete-group": "destroy",
    "click .edit-group": "edit",
    "click .create-event": "newEvent",
    "click .edit-interests": "editInterests",
    "click .join-group": "joinGroup",
    "click .leave-group": "leaveGroup",
    "click .group-banner": "backHome",
  },

  template: JST['groups/show'],

  className: "col-md-8 col-md-offset-2",

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    if (this.model.get("membership_id")) {
      this.toggleButton();
    }

    this.addSidebar();
    return this;
  },

  addSidebar: function () {
    if (this.currentSidebar) {
      this.removeSubview(".group-sidebar", this.currentSidebar);
    }

    var newSidebar = new PickUp.Views.GroupSidebar({ model: this.model });
    this.addSubview(".group-sidebar", newSidebar);
    this.currentSidebar = newSidebar;
  },

  fillBody: function () {
    var view = new PickUp.Views.GroupBody({
      type: this.type,
      event_id: this.event_id,
      model: this.model,
      collection: this.collection
    });

    this._addBody(view);
  },

  backHome: function () {
    var view = new PickUp.Views.GroupBody({
      type: "group",
      model: this.model,
      collection: this.collection
    });
    Backbone.history.navigate("groups/" + this.model.id);

    this._addBody(view);
  },

  newEvent: function (event) {
    $(event.target).blur();
    var view = new PickUp.Views.GroupBody({
      type: "event-new",
      model: this.model,
      collection: this.collection
    });
    Backbone.history.navigate("groups/" + this.model.id + "/events/new");

    this._addBody(view);
  },

  editInterests: function (event) {
    if (event) {
      $(event.target).blur();
    }

    var view = new PickUp.Views.InterestsModal({
      model: this.model,
      collection: this.interests,
      type: "group",
      group_id: this.model.id
    });

    this.addSubview(".group-show", view);
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
      this.removeSubview(".group-show", this.currentBody);
    }

    this.addSubview(".group-show", view);
    this.currentBody = view;
  }
});
