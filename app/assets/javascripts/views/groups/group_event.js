CleatUp.Views.GroupEvent = Backbone.View.extend({
  template: JST["groups/event"],

  render: function () {
    var content = this.template({ event: this.model });
    this.$el.html(content);
    return this;
  }
});
