CleatUp.Views.GroupItem = Backbone.View.extend({
  template: JST["groups/item"],

  className: "group-item",

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  }
});
