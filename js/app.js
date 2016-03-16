var app = app || {};
var ENTER_KEY = 13;

$(function() {
  'use strict';
  // Kick things off by creating the `App`.
  new app.SearchView();
  // var testfoods = [
  //   {title: 'brocoli', calorie: 50},
  //   {title: 'strawberry', calorie: 40},
  //   {title: 'banana', calorie: 80}
  // ];
  new app.AppView();
  // app.foods.add(testfoods);
});