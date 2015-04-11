CleatUp.Views.Dropdown = Backbone.View.extend({
  initialize: function () {
    this.collection = new CleatUp.Collections.Interests();
    this.collection.fetch({ data: { type: "normal" } });
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["dropdown"],

  render: function () {
    var content = this.template({ interests: this.collection });
    this.$el.html(content);
    return this;
  }
});
