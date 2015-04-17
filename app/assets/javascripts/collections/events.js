PickUp.Collections.Events = Backbone.Collection.extend({
  model: PickUp.Models.Event,

  url: "/api/events",

  getOrFetch: function (id) {
    var model = this.get(id);

    if (!model) {
      model = new this.model({ id: id });
      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    } else {
      model.fetch();
    }

    return model;
  }
});
