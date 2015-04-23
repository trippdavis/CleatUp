PickUp.Views.InterestsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.group_id = options.group_id;
    this.type = options.type;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.preselectInterests);
  },

  events: {
    "click .interest": "handleClick",
    "click .submit-interests": "submitInterests"
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
  },

  submitInterests: function () {
    buttons = $(".btn-success");
    this.updatedInterestIDs = [];
    this.updatedInterestTopics = [];
    buttons.each(function (i, button) {
      this.updatedInterestTopics.push($(button).text());
      this.updatedInterestIDs.push($(button).data("id"));
    }.bind(this));

    var newInterestIDs = _.difference(this.updatedInterestIDs, this.prevInterestIDs);
    var oldInterestIDs = _.difference(this.prevInterestIDs, this.updatedInterestIDs);

    this.addInterests(newInterestIDs);
    this.destroyInterests(oldInterestIDs);

    PickUp.pubSub.trigger("exitInterests");
    if (this.type === "group") {
      this.model.interests = this.updatedInterestTopics;
      PickUp.pubSub.trigger("interestsAdded");
    }
  },

  addInterests: function (newInterestIDs) {
    var type = this.type;
    var group_id = this.group_id;
    newInterestIDs.forEach( function (interestID) {
      $.ajax({
        url: "/interestings",
        type: "POST",
        data: {
          interest_id: interestID,
          type: type,
          group_id: group_id
        }
      });
    });
  },

  destroyInterests: function (oldInterestIDs) {
    var type = this.type;
    var group_id = this.group_id;
    oldInterestIDs.forEach( function (interestID) {
      $.ajax({
        url: "/interestings/1",
        type: "DELETE",
        data: {
          interest_id: interestID,
          type: type,
          group_id: group_id
        }
      });
    });
  }
});
