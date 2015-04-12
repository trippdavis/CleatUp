CleatUp.Views.GroupItem = Backbone.View.extend({
  template: JST["groups/item"],

  events: {
    "click .group-item": "groupShow"
  },

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  },

  groupShow: function () {
    Backbone.history.navigate("groups/" + this.model.id, { trigger: true });
  }
});
