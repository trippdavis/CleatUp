window.CleatUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  pubSub: _.extend({}, Backbone.Events),
  initialize: function() {
    new CleatUp.Routers.App({ $rootEl: $("#content") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  CleatUp.initialize();
});
