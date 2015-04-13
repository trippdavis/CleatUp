CleatUp.Views.EventsIndex = Backbone.View.extend({
  initialize: function (options) {
    var type = options.type;
    var interest_id = options.interest_id;
    this.collection.fetch({
      data: {
        type: type,
        interest_id: interest_id
      }
    });
    this.listenTo(this.collection, "sync", this.addEventItems);
  },

  template: JST['events/index'],

  render: function () {
    var content = this.template({ events: this.collection });
    this.$el.html(content);
    return this;
  },

  addEventItems: function () {
    $div = $(".event-items");
    this.collection.each(function (event) {
      var view = new CleatUp.Views.EventItem({ model: event });
      $div.append(view.render().$el);
    });
  }
});
