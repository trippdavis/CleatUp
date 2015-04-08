CleatUp.Views.EventsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.collection = new CleatUp.Collections.Events();
    var type = options.type;
    this.collection.fetch({ data: { type: type } });
    this.listenTo(this.collection, "sync add", this.render);
  },

  template: JST['events/index'],

  render: function () {
    var content = this.template({ events: this.collection });
    this.$el.html(content);
    return this;
  }
});
