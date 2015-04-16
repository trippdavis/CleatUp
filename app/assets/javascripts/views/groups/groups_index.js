CleatUp.Views.GroupsIndex = Backbone.View.extend({
  template: JST['groups/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    var $div = this.$el.find(".group-items");
    this.collection.each(function (group) {
      var view = new CleatUp.Views.GroupItem({ model: group });
      $div.append(view.render().$el);
    });
    return this;
  },
});
