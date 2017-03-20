/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LoginView = Backbone.View.extend({
    template: JST['app/scripts/templates/login.hbs'],

    el: '#app',

    tagName: 'div',

    id: 'login-form',

    className: '',

    events: {
      'submit #login-form': 'onLogin'
    },

    serialize : function() {
      return {
        nickname: this.$("#nickname").val()
      };
    },

    initialize: function () {
      //this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    onLogin: function(e){
      e.preventDefault();
      Backbone.history.navigate('/chat', true);
    }

  });

  return LoginView;
});
