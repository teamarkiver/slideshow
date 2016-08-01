var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var UserLoginComponent = require('./components/login.jsx').UserLoginComponent;
var SlideListComponent = require('./components/slidelist.jsx').SlideListComponent;
var CreateUpdateShowComponent = require('./components/editor.jsx').CreateUpdateShowComponent;
var ViewSlideShowComponent = require('./components/showview.jsx').ViewSlideShowComponent;

function userIsLoggedIn(){
  if (localStorage["user_email"] && localStorage["user_token"]){
    return true;
  }else {
    return false;
  }
}

var Router = Backbone.Router.extend({
    routes: {
        '': 'login',
        'slide': 'slideList',
        'slide/create': 'createShow',
        'slide/:id/edit': 'slideEdit',
        'slide/:id': 'viewer'


    },
    execute: function(routeMethod, args) {
      if (userIsLoggedIn()) {

        $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
          originalOptions.data = originalOptions.data || {};

          var authData = {
            user_email: localStorage["user_email"],
            user_token: localStorage["user_token"]
          }

          // options.data = _.extend(originalOptions.data, authData)
          options.url = options.url + "?user_email=" + authData.user_email + "&user_token=" + authData.user_token;
        });

      } else if(routeMethod.name != 'login') {
        this.navigate('login', {trigger: true});
        return false;
      }

      routeMethod.apply(this, args);
    },
    login: function(){
      ReactDOM.render(
        React.createElement(UserLoginComponent, {router: this}),
        document.getElementById('container')
      );
    },
    slideList: function(){
      ReactDOM.render(
        React.createElement(SlideListComponent, {router: this}),
        document.getElementById('container')
      );
    },
    createShow: function(){
      ReactDOM.render(
        React.createElement(CreateUpdateShowComponent, {router: this}),
        document.getElementById('container')
      );
    },
    slideEdit: function(slideshowId){
      ReactDOM.render(
        React.createElement(CreateUpdateShowComponent, {router: this, slideshowId: slideshowId}),
        document.getElementById('container')
      );
    },
    viewer: function(slideshowId){
      ReactDOM.render(
        React.createElement(ViewSlideShowComponent, {router: this, slideshowId: slideshowId}),
        document.getElementById('container')
      );
    }











});

var router = new Router();

module.exports = {
  'router': router
}
