PickUp.Views.GroupsLanding = Backbone.View.extend({
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
    this.fetchGroup("joined");
    this.fetchGroup("other");
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
      }.bind(this)
    });
  },

  showIndex: function (type) {
    if (this.collection.length > 0) {
      var view = new PickUp.Views.GroupsIndex({
        collection: this.collection,
        type: type
      });
      this.$el.find("." + type + "-groups-list").html(view.render().$el);
    } else {
      this.$el.find("." + type + "-groups-list").empty();
    }
  },

  switchIndex: function (interest_id) {
    this.interest_id = interest_id;
    this.fetchGroup("created");
    this.fetchGroup("joined");
    this.fetchGroup("other");
  }
});
