CleatUp.Views.GroupsIndex = Backbone.View.extend({
  initialize: function (options) {
    var type = options.type;
    var interest_id = options.interest_id;
    this.collection.fetch({
      data: {
        type: type,
        interest_id: interest_id
      }
    });
    this.listenTo(this.collection, "sync add", this.render);
  },

  template: JST['groups/index'],

  render: function () {
    var content = this.template({ groups: this.collection });
    this.$el.html(content);
    return this;
  }
});
