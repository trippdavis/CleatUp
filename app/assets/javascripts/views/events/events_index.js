PickUp.Views.EventsIndex = Backbone.View.extend({
  initialize: function (options) {
    var type = options.type;
    var interest_id = options.interest_id;
    this.collection.fetch({
      data: {
        type: type,
        interest_id: interest_id,
      }
    });
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['events/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    $div = $(".event-items");
    var currentDate = "";
    this.collection.each(function (event) {
      var showDate = !(event.date === currentDate);
      currentDate = event.date;
      var view = new PickUp.Views.EventItem({
        model: event,
        showDate: showDate
      });
      $div.append(view.render().$el);
    });
    return this;
  },
});
