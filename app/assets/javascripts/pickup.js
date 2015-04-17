window.PickUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  pubSub: _.extend({}, Backbone.Events),
  initialize: function() {
    new PickUp.Routers.App({ $rootEl: $("#content") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PickUp.initialize();
});
