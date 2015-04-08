CleatUp.Views.Landing = Backbone.View.extend({
  initialize: function () {
  },

  template: JST['landing'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.createdGroups();
    this.otherGroups();
    return this;
  },

  createdGroups: function () {
    var view = new CleatUp.Views.GroupsIndex({ type: "created" });
    this.$el.find(".created-groups").html(view.render().$el);
  },

  otherGroups: function () {
    var view = new CleatUp.Views.GroupsIndex({ type: "other" });
    this.$el.find(".other-groups").html(view.render().$el);
  }
});
