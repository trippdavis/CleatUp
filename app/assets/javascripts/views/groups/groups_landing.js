CleatUp.Views.GroupsLanding = Backbone.View.extend({
  initialize: function () {
    this.collection = new CleatUp.Collections.Groups();
  },

  template: JST['groups/landing'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".joined-groups");
    this.joinedGroups();
    return this;
  },

  events: {
    "click button": "switchIndex"
  },

  switchIndex: function (event) {
    var $button = $(event.target);
    $button.prop("disabled", true);
    if ($button.hasClass("created-groups")) {
      this.createdGroups();
    } else if ($button.hasClass("joined-groups")) {
      this.joinedGroups();
    } else if ($button.hasClass("other-groups")) {
      this.otherGroups();
    }
    this.$currentButton.prop("disabled", false);
    this.$currentButton = $button;
  },

  createdGroups: function () {
    var view = new CleatUp.Views.GroupsIndex({
      collection: this.collection,
      type: "created"
    });
    this._swapIndex(view);
  },

  joinedGroups: function () {
    var view = new CleatUp.Views.GroupsIndex({
      collection: this.collection,
      type: "joined"
    });
    this._swapIndex(view);
  },

  otherGroups: function () {
    var view = new CleatUp.Views.GroupsIndex({
      collection: this.collection,
      type: "other"
    });
    this._swapIndex(view);
  },

  _swapIndex: function (view) {
    if (this.currentIndex) {
      this.currentIndex.remove();
    }

    this.$el.find(".groups-list").html(view.render().$el);
    this.currentIndex = view;
  }
});
