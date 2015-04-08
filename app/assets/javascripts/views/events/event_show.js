CleatUp.Views.EventShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .return-to-landing": "toLanding",
    "click .delete-event": "destroy",
    // "click .edit-group": "edit"
  },

  template: JST['events/show'],

  render: function () {
    var content = this.template({ event: this.model });
    this.$el.html(content);
    return this;
  },

  // edit: function () {
  //   event.preventDefault();
  //   Backbone.history.navigate("groups/" + this.model.id + "/edit", { trigger: true });
  // },

  toLanding: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  },

  destroy: function (event) {
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
});
