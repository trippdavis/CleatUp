CleatUp.Views.GroupShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.events(), "sync", this.addEvents);
  },

  events: {
    "click .return-to-landing": "toLanding",
    "click .delete-group": "destroy",
    "click .edit-group": "edit"
  },

  template: JST['groups/show'],

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  },

  // addEvents: function () {
  //   var view = new CleatUp.Views.GroupEventsIndex({
  //     collection: this.model.comments()
  //   });
  //   this.$el.find(".group-events").html(view.render().$el);
  // },

  edit: function () {
    event.preventDefault();
    Backbone.history.navigate("groups/" + this.model.id + "/edit", { trigger: true });
  },

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
