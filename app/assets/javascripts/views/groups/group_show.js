CleatUp.Views.GroupShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .return-to-landing": "toLanding"
  },

  template: JST['groups/show'],

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  },

  toLanding: function (event) {
    debugger
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  }
});
