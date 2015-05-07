PickUp.Views.EventsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    var type = options.type;
    var interest_id = options.interest_id;
    this.listenTo(this.collection, "sync", this.showGames);
  },

  template: JST['events/index'],

  showGames: function () {
    var currentDate = "";
    this.collection.each(function (event) {
      var showDate = !(event.date === currentDate);
      currentDate = event.date;
      var view = new PickUp.Views.EventItem({
        model: event,
        showDate: showDate
      });
      this.addSubview(".event-items", view);
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
});
