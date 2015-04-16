CleatUp.Views.GroupsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
  },

  template: JST['groups/index'],

  render: function () {
    var content = this.template({ type: this.type });
    this.$el.html(content);
    var $div = this.$el.find(".group-items");
    this.collection.each(function (group) {
      var view = new CleatUp.Views.GroupItem({ model: group });
      $div.append(view.render().$el);
    });
    return this;
  },
});
