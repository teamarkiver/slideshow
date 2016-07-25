/* login flow:
1. POST to login - this will return a user_token
2. save that user_token and the user's email to localStorage
3. Get user info by a GET request to https://arkiver.com/api/me

$.get("https://arkiver.com/api/me", function(resp){

})

Login is done
*/
var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
var User = Backbone.Model.extend({
  urlRoot: 'https://arkiver.com/api/me',
  initialize: function(){
    console.log("initialize called, this is ", this);
  },
  login: function(email, password, callbacks){
    var queryString = jQuery.param({'email': email, 'password': password});
    var payload =   {
        "user":{
            "email": email,
            "password": password

        }
    };
    $.post("https://arkiver.com/login", JSON.stringify(payload), function(resp){
      //resp.user_token
      console.log(arguments);

      localStorage["logged_in"] = true
      localStorage["user_token"] = resp.authentication_token
      localStorage["user_email"] = email

    
    }).success(function() {
      callbacks.success();
    }).fail(function() {
      callbacks.fail();
    });
    console.log(callbacks);

    // {
    //   user_email: localStorage["user_email"]
    //   user_token: localStorage["user_token"]
    //   slideshow: {
    //     title: "great first slideshow",
    //     moment_ids: [1,2,3]
    //   }
    // }
    // var loggedInUser = new User();
    //
    // loggedInUser.urlRoot = 'https://arkiver.com/login?' + queryString;
    //
    // loggedInUser.fetch().done(function(data){
    //   localStorage.setItem('user', JSON.stringify(loggedInUser.toJSON()));
    //   callbacks.success(loggedInUser);
    //
    // }).fail(function(error){
    //   callbacks.error(loggedInUser, error);
    //
    // });
  },
  signUp: function(email, firstName, lastName, signPassword, confPassword){
    $.post('https://arkiver.com/signup',
         {'data': {
           "user":{
               "first_name": firstName,
               "last_name": lastName,
               "email": email,
               "password": signPassword,
               "password_confirmation": confPassword

           },
           "origin": "web"
       }});
    }
});
module.exports = {
  'User': User
};
