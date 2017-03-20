/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'socketio',
  'templates',
  'moment',
  'models/message',
  'collections/message'
], function ($, _, Backbone, io, JST, moment, MessageModel,MessageCollection) {
  'use strict';

  var ChatView = Backbone.View.extend({

    template: JST['app/scripts/templates/chat.hbs'],

    el: '#app',

    tagName: 'div',

    id: 'chat-group',

    className: '',

    events: {
      'submit #chat-form': 'onSend'
    },

    collection: new MessageCollection(),
    socket:{},
    nickname: null,

    serialize: function(){
      return {
        message: this.$('#message').val()
      }
    },

    initialize: function () {
      var self   = this;
      this.nickname = localStorage.getItem('nickname');
      if(this.nickname === null || this.nickname === undefined){
        console.log(Backbone.history.navigate('login', {trigger: true, replace: true}));
        return false;
      }

      this.socket = io.connect('http://127.0.0.1:5000/chat');
      this.socket.on('connect', function() {
        self.socket.emit('joined', { 'nickname': self.nickname});
      });
      this.socket.on('status', function(data) {
        self.collection.create({
          msg: data.msg,
          date: moment.unix(data.time).format("YYYY-MM-DD HH:mm")
        });
      });
      this.socket.on('message', function(data) {
        self.collection.create({
          msg: data.msg,
          date: moment.unix(data.time).format("YYYY-MM-DD HH:mm")
        });
      });
      this.listenTo(this.collection, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template({collection: this.collection.toJSON()}));
    },

    onSend: function(e) {
      e.preventDefault();
      var self   = this;
      var message = this.serialize().message;
      this.socket.emit('text', { 'nickname': self.nickname, 'msg': message });
      this.$el.find('#message').empty()
    }
  });

  return ChatView;
});
