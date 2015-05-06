PickUp.Views.GroupsLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.interest_id = options.interest_id;
  },

  template: JST['groups/landing'],

  className: "groups-landing",

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".joined-groups");
    this.fetchGroup("created");
    return this;
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
  },

  switchIndex: function () {
    this.eachSubview(function (subview) {
      subview.remove();
    });
    this.fetchGroup("created");
    this.fetchGroup("joined");
    this.fetchGroup("other");
  }
});
