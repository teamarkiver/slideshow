var $ = window.jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var router = require('./router.js');

$.ajaxSetup({
  beforeSend: function(xhr){
  xhr.setRequestHeader("Authorization: Token token=43a14bfc3896d21323cd9b8c9a7f8019");
  xhr.setRequestHeader("Accept: application/json,version=2");
  xhr.setRequestHeader("Content-Type: application/json");
  }
});
$(function(){
  console.log('start app');
  Backbone.history.start();
});
