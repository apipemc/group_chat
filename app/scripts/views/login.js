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
      var nickname = localStorage.getItem('nickname');
      if(nickname !== null || nickname !== undefined){
        Backbone.history.navigate('/chat', {trigger:true, replace: true});
      }
    },

    render: function () {
      this.$el.html(this.template());
    },

    onLogin: function(e){
      e.preventDefault();
      localStorage.setItem("nickname", this.serialize().nickname);
      Backbone.history.navigate('/chat', {trigger:true, replace: true});
    }

  });

  return LoginView;
});
