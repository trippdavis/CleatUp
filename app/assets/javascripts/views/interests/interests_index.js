PickUp.Views.InterestsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
    this.new = options.new;
    this.listenTo(this.collection, "sync", this.render);
    if (!this.new) {
      this.listenTo(this.collection, "sync", this.preselectInterests);
    }
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
    var header;
    if (this.type === "user") {
      header = (this.new ? "To get started, let us know what PickUps you are interested in:" : "What Pickups are you interested in:");
    } else {
      header = "What are the interests of your group:";
    }
    this.$el.find(".interests-header").html(header);
  },

  preselectInterests: function () {
    this.prevInterestIDs = [];
    this.collection.where({ interested: true }).forEach(function (interest) {
      this.prevInterestIDs.push(interest.id);
      this.$el.find('button[data-id="' + interest.id + '"]').toggleClass("btn-default btn-success");
    }.bind(this));
  },

  handleClick: function (event) {
    event.preventDefault();
    $button = $(event.target);
    $button.toggleClass("btn-default btn-success");
  }
});
