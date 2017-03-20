/*global define*/

define([
  'underscore',
  'backbone',
  'models/Message'
], function (_, Backbone, MessageModel) {
  'use strict';

  var MessageCollection = Backbone.Collection.extend({
    model: MessageModel
  });

  return MessageCollection;
});
