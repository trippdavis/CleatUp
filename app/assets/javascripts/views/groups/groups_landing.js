CleatUp.Views.GroupsLanding = Backbone.View.extend({
  template: JST['groups/landing'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".joined-groups");
    this.createdGroups();
    this.joinedGroups();
    this.otherGroups();
    return this;
  },

  // events: {
  //   "click button": "switchIndex"
  // },

  // switchIndex: function (event) {
  //   var $button = $(event.target);
  //   $button.prop("disabled", true);
  //   if ($button.hasClass("created-groups")) {
  //     this.createdGroups();
  //   } else if ($button.hasClass("joined-groups")) {
  //     this.joinedGroups();
  //   } else if ($button.hasClass("other-groups")) {
  //     this.otherGroups();
  //   }
  //   this.$currentButton.prop("disabled", false);
  //   this.$currentButton = $button;
  // },

  createdGroups: function () {
    this.collection.fetch({
      data: { type: "created" },
      success: function () {
        var view = new CleatUp.Views.GroupsIndex({ collection: this.collection });
        this.$el.find(".created-groups-list").html(view.render().$el);
      }.bind(this)
    });
  },

  joinedGroups: function () {
    this.collection.fetch({
      data: { type: "joined" },
      success: function () {
        var view = new CleatUp.Views.GroupsIndex({ collection: this.collection });
        this.$el.find(".joined-groups-list").html(view.render().$el);
      }.bind(this)
    });
  },

  otherGroups: function () {
    this.collection.fetch({
      data: { type: "other" },
      success: function () {
        var view = new CleatUp.Views.GroupsIndex({ collection: this.collection });
        this.$el.find(".other-groups-list").html(view.render().$el);
      }.bind(this)
    });
  }
});
