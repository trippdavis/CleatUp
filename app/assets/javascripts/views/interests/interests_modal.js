PickUp.Views.InterestsModal = Backbone.View.extend({
  initialize: function (options) {
    this.group_id = options.group_id;
    this.type = options.type;
    this.collection.fetch({
      data: {
        interestable_type: this.type,
        group_id: this.group_id
      }
    });
    PickUp.pubSub.on("exitInterests", this.remove, this);
  },

  events: {
    "click": "escape"
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

    var view = new PickUp.Views.InterestsIndex({
      type: this.type,
      group_id: this.group_id,
      collection: this.collection,
      model: this.model
    });

    this.$el.find(".interests").html(view.$el);
    return this;
  }
});
