var React = require('react');
var User = require('../models/user').User;
var $ = require('jquery');
var UserLoginComponent = React.createClass({
  handleLogIn: function(e){
    e.preventDefault();
    var email = $('.log-email').val();
    var password = $('.log-password').val();
    var router = this.props.router;
    var user = new User();
    user.login(email, password,{
      success: function(user){
        console.log(user);
        router.navigate('slide/list', {trigger: true});
      },
      error: function(user, error){
        console.log(user, error);
      }
    });
  },
  render: function(){
    return(
      <div className="main-login">
        <header className="banner row">
          <div className="logo col-xs-7 col-xs-offset-5"><img src="./images/arkiver-black-logo.png"></img></div>
        </header>

        <div className="logmein row">
          <div className="login-complete col-xs-9 col-xs-offset-3">
            <form onSubmit={this.handleLogIn} className="navbar-form" id="login-user">
              <input type="text" className="log-email" placeholder="Email"></input>
              <input type="password" className="log-password" placeholder="Password"></input>
              <button className="login btn btn-success">Log In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})
module.exports = {
  'UserLoginComponent': UserLoginComponent
}
