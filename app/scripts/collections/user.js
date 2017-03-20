/*global define*/

define([
  'underscore',
  'backbone',
  'models/User'
], function (_, Backbone, UserModel) {
  'use strict';

  var UserCollection = Backbone.Collection.extend({
    model: UserModel
  });

  return UserCollection;
});
