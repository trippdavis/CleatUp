PickUp.Views.EventsLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.interest_id = options.interest_id;
    this.type = options.type;
    this.time = Date.now();
    this.listenTo(this.collection, "sync", this.highlightDates);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  },

  template: JST['events/landing'],

  events: {
    "click button": "switchingIndex",
    "click .date-square": "clickDate",
    "click .next": "highlightDates",
    "click .prev": "highlightDates"
  },

  clickDate: function (event) {
    var day = $(event.target).text();
    var yearMonth = $(".month").text().split(" ");

    var year = yearMonth[1];
    var month = this.months.indexOf(yearMonth[0]);

    var date = new Date(year, month, day);
    this.time = date.getTime();
    this.fetchIndexes();
  },

  highlightDates: function () {
    var calMonthYear = $(".month").text().split(" ");
    this.collection.models.forEach( function (game) {
      if (calMonthYear[0] == this.months[game.month] && calMonthYear[1] == game.year) {
        var $dates = $('a').filter(function(index) {
          return $(this).text() == parseInt(game.day);
        });
        $dates.each( function (idx, date) {
          $(date).parent().addClass("has-game");
        });
      }
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$currentButton = this.$el.find(".reserved-events");
    this.$el.find("#calendar").calendar();
    return this;
  },

  switchingIndex: function (event) {
    $(".has-game").each( function (idx, game) {
      $(game).removeClass("has-game");
    });

    var $button = $(event.target);
    $button.prop("disabled", true);
    if ($button.hasClass("created-events")) {
      this.type = "created";
    } else if ($button.hasClass("reserved-events")) {
      this.type = "reserved";
    } else if ($button.hasClass("group-events")) {
      this.type = "joined-group";
    } else {
      this.type = "other";
    }
    this.$currentButton.prop("disabled", false);
    this.$currentButton = $button;
    this.fetchIndexes();
  },

  fetchIndexes: function () {
    if (this.currentIndex) {
      this.removeSubview(".events-list", this.currentIndex);
    }
    $(".events-list").spin();
    this.switchIndex();
  },

  switchIndex: function () {
    this.collection.fetch({
      data: {
        type: this.type,
        interest_id: this.interest_id,
        time: this.time
      },
      success: function () {
        $(".events-list").spin(false);
      }.bind(this)
    });

    var view = new PickUp.Views.EventsIndex({
      collection: this.collection,
      type: this.type,
      interest_id: this.interest_id,
      time: this.time
    });

    this.addSubview(".events-list", view);
    this.currentIndex = view;
  }
});
