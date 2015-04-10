CleatUp.Views.InterestsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.preselectInterests);
  },

  events: {
    "click .interest": "handleClick",
    "click .submit": "submitInterests"
  },

  template: JST['interests/index'],

  render: function () {
    var content = this.template({ interests: this.collection });
    this.$el.html(content);
    return this;
  },

  preselectInterests: function () {
    this.prevInterestIDs = [];
    this.collection.where({ user_interest: true }).forEach(function (interest) {
      this.prevInterestIDs.push(interest.id);
      $('button[data-id="' + interest.id + '"]').toggleClass("btn-default btn-success");
    }.bind(this));
  },

  handleClick: function (event) {
    $button = $(event.target);
    $button.toggleClass("btn-default btn-success");
  },

  submitInterests: function () {
    buttons = $(".btn-success");
    this.updatedInterestIDs = [];
    buttons.each(function (i, button) {
      this.updatedInterestIDs.push($(button).data("id"));
    }.bind(this));

    var newInterestIDs = _.difference(this.updatedInterestIDs, this.prevInterestIDs);
    var oldInterestIDs = _.difference(this.prevInterestIDs, this.updatedInterestIDs);

    this.addInterests(newInterestIDs);
    this.destroyInterests(oldInterestIDs);
    Backbone.history.navigate("", { trigger: true });
  },

  addInterests: function (newInterestIDs) {
    newInterestIDs.forEach( function (interestID) {
      $.ajax({
        url: "/interestings",
        type: "POST",
        data: {
          interest_id: interestID,
          type: "User"
        }
      });
    });
  },

  destroyInterests: function (oldInterestIDs) {
    oldInterestIDs.forEach( function (interestID) {
      $.ajax({
        url: "/interestings/1",
        type: "DELETE",
        data: {
          interest_id: interestID,
          type: "User"
        }
      });
    });
  }
});
