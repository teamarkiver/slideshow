var $ = window.jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var router = require('./router.js');

$.ajaxSetup({
  headers : {
    "Accept": "application/json,version=2",
    "Content-Type": "application/json"
  }
});

$(function(){
  console.log('start app');
  Backbone.history.start();
});
