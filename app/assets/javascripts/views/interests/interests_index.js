PickUp.Views.InterestsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.preselectInterests);
  },

  events: {
    "click .interest": "handleClick"
  },

  template: JST['interests/index'],

  render: function () {
    var content = this.template({ interests: this.collection });
    this.$el.html(content);
    this.addHeader();
    return this;
  },

  addHeader: function () {
    var header = this.type === "user" ? "What are your interests?" : "What are the interests of your group?";
    this.$el.find(".interests-header").html(header);
  },

  preselectInterests: function () {
    this.prevInterestIDs = [];
    this.collection.where({ interested: true }).forEach(function (interest) {
      this.prevInterestIDs.push(interest.id);
      $('button[data-id="' + interest.id + '"]').toggleClass("btn-default btn-success");
    }.bind(this));
  },

  handleClick: function (event) {
    $button = $(event.target);
    $button.toggleClass("btn-default btn-success");
  }
});
