/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/message'
], function ($, _, Backbone, JST, MessageModel) {
  'use strict';

  var ChatView = Backbone.View.extend({

    template: JST['app/scripts/templates/chat.hbs'],

    el: '#app',

    tagName: 'div',

    id: 'chat-group',

    className: '',

    events: {

    },

    model: new MessageModel(),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  return ChatView;
});
