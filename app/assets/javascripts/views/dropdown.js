PickUp.Views.Dropdown = Backbone.View.extend({
  initialize: function () {
    this.collection.fetch({ data: { type: "normal" } });
    this.listenToOnce(this.collection, "sync", this.render);
  },

  tagType: "li",

  className: "dropdown",

  template: JST["dropdown"],

  render: function () {
    var content = this.template({ interests: this.collection });
    this.$el.html(content);
    return this;
  }
});
