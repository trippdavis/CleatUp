PickUp.Views.InterestsModal = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.group_id = options.group_id;
    this.type = options.type;
    this.collection.fetch({
      data: {
        interestable_type: this.type,
        group_id: this.group_id
      }
    });
  },

  events: {
    "click": "escape",
    "click .submit-interests": "submitInterests"
  },

  escape: function (event) {
    if ($(event.target).hasClass("interests-modal")) {
      this.remove();
    }
  },

  template: JST["interests/modal"],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.interestsIndex = new PickUp.Views.InterestsIndex({
      type: this.type,
      group_id: this.group_id,
      collection: this.collection,
      model: this.model
    });

    this.addSubview(".interests", this.interestsIndex);
    return this;
  },

  submitInterests: function () {
    buttons = this.$el.find(".btn-success");
    this.updatedInterestIDs = [];
    this.updatedInterestTopics = [];
    buttons.each(function (i, button) {
      this.updatedInterestTopics.push($(button).text());
      this.updatedInterestIDs.push($(button).data("id"));
    }.bind(this));

    var newInterestIDs = _.difference(this.updatedInterestIDs, this.interestsIndex.prevInterestIDs);
    var oldInterestIDs = _.difference(this.interestsIndex.prevInterestIDs, this.updatedInterestIDs);

    this.addInterests(newInterestIDs);
    this.destroyInterests(oldInterestIDs);

    if (this.type === "group") {
      this.model.interests = this.updatedInterestTopics;
      PickUp.pubSub.trigger("interestsAdded");
    }
    this.remove();
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
