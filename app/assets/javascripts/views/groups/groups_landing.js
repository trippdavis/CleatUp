CleatUp.Views.GroupsLanding = Backbone.View.extend({
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
      data: { type: type },
      success: function () {
        if (this.collection.length > 0) {
          this.addIndex(type);
        }
      }.bind(this)
    });
  },

  addIndex: function (type) {
    var view = new CleatUp.Views.GroupsIndex({
      collection: this.collection,
      type: type
    });
    this.$el.find("." + type + "-groups-list").html(view.render().$el);
  }
});
