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
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['groups/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    var $div = $(".group-items");
    this.collection.each(function (group) {
      var view = new CleatUp.Views.GroupItem({ model: group });
      $div.append(view.render().$el);
    });
    return this;
  },
});
