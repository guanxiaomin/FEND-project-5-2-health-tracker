var app = app || {};

(function($) {
  'use strict';

  // Food Item View
  // --------------
  app.FoodView = Backbone.View.extend({
    tagName: 'li',
    // Cache the template function for a single item.
    template: _.template( $('#food-item').html() ),
    events:{
      'click .destroy': 'clear',
    },

    initialize: function() {
      // console.log('This model has been initialized.');
      // console.log(this.model.get('calorie'));
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove); // delete item
    },

    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      return this;
      
    },

    clear: function() { 
      this.model.destroy();
    }

  });
})(jQuery);