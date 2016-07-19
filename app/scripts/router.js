var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var UserLoginComponent = require('./components/login.jsx').UserLoginComponent;
var SignUpComponent = require('./components/signup.jsx').SignUpComponent;

var Router = Backbone.Router.extend({
    routes: {
        '': 'login',
        'sign-up': 'signin'
    },
    login: function(){
        ReactDOM.render(
          React.createElement(UserLoginComponent, {router: this}),
          document.getElementById('container')
        );
    },
    signin: function(){
      ReactDOM.render(
        React.createElement(SignUpComponent, {router: this}),
        document.getElementById('container')
      );
    }











});

var router = new Router();

module.exports = {
  'router': router
}
