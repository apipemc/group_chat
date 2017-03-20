/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var MessageModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
      msg: '',
      date: function () {
        new Date();
      }
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return MessageModel;
});
