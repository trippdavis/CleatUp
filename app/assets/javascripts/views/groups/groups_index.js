CleatUp.Views.GroupsIndex = Backbone.View.extend({
  initialize: function (options) {
    var type = options.type;
    this.collection.fetch({ data: { type: type } });
    this.listenTo(this.collection, "sync add", this.render);
  },

  template: JST['groups/index'],

  render: function () {
    var content = this.template({ groups: this.collection });
    this.$el.html(content);
    return this;
  }
});
