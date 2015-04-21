PickUp.Views.GroupsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.type = options.type;
  },

  template: JST['groups/index'],

  render: function () {
    var content = this.template({ type: this.type });
    this.$el.html(content);
    this.collection.each(function (group) {
      var view = new PickUp.Views.GroupItem({ model: group });
      this.addSubview(".group-items", view);
    }.bind(this));
    return this;
  },
});
