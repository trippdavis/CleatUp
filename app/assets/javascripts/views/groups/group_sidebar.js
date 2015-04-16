CleatUp.Views.GroupSidebar = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  template: JST["groups/sidebar"],

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  }
});
