CleatUp.Views.EventsIndex = Backbone.View.extend({
  initialize: function (options) {
    var type = options.type;
    var interest_id = options.interest_id;
    this.collection.fetch({
      data: {
        type: type,
        interest_id: interest_id,
      },
      success: function (a,b,c) {
        debugger
      }
    });
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['events/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    $div = $(".event-items");
    this.collection.each(function (event) {
      var view = new CleatUp.Views.EventItem({ model: event });
      $div.append(view.render().$el);
    });
    return this;
  },
});
