var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var UserLoginComponent = require('./components/login.jsx').UserLoginComponent;
var SlideListComponent = require('./components/slidelist.jsx').SlideListComponent;

var Router = Backbone.Router.extend({
    routes: {
        '': 'login',
        'slide/list': 'slidelist'
    },
    execute: function(cb, args) {
      console.log("execute called");
      if (localStorage['logged_in']) {
        cb.apply( this, args)
      } else {
        console.log("user is not logged in, so redirect to login yo, this is ", this);
        this.navigate("")
        this.login()
      }
    },
    login: function(){
        ReactDOM.render(
          React.createElement(UserLoginComponent, {router: this}),
          document.getElementById('container')
        );
    },
    slidelist: function(){
      ReactDOM.render(
        React.createElement(SlideListComponent, {router: this}),
        document.getElementById('container')
      );
    }











});

var router = new Router();

module.exports = {
  'router': router
}
