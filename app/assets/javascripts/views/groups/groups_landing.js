PickUp.Views.GroupsLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.interest_id = options.interest_id;
  },

  template: JST['groups/landing'],

  className: "groups-landing",

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  fetchIndexes: function () {
    this.$el.spin();
    $(".created-groups-list").addClass("hidden-index");
    $(".joined-groups-list").addClass("hidden-index");
    $(".other-groups-list").addClass("hidden-index");
    this.fetchGroup("created");
  },

  fetchGroups: function () {
    $(".groups-landing").spin();
  },

  fetchGroup: function (type) {
    this.collection.fetch({
      data: {
        type: type,
        interest_id: this.interest_id
      },
      success: function () {
        this.showIndex(type);
        this.nextIndex(type);
      }.bind(this)
    });
  },

  nextIndex: function (type) {
    if (type === "created") {
      this.fetchGroup("joined");
    } else if (type === "joined") {
      this.fetchGroup("other");
    }
  },

  showIndex: function (type) {
    if (this.collection.length > 0) {
      var view = new PickUp.Views.GroupsIndex({
        collection: this.collection,
        type: type
      });
      this.addSubview("." + type + "-groups-list", view);
    }

    if (type === "other") {
      this.revealIndexes();
    }
  },

  revealIndexes: function () {
    this.$el.spin(false);
    $(".created-groups-list").removeClass("hidden-index");
    $(".joined-groups-list").removeClass("hidden-index");
    $(".other-groups-list").removeClass("hidden-index");
  },

  switchIndex: function () {
    this.eachSubview(function (subview) {
      subview.remove();
    });
    this.fetchIndexes();
  }
});
