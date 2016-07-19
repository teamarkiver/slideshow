var React = require('react');
var User = require('../models/user').User;

var UserLoginComponent = React.createClass({
  render: function(){
    return(
      <div className="main-login">
        <header className="banner row">
          <div className="logo col-xs-7 col-xs-offset-5"><img src="./images/arkiver-black-logo.png"></img></div>
        </header>

        <div className="logmein row">
          <div className="login-complete col-xs-9 col-xs-offset-3">
            <form className="navbar-form" id="login-user">
              <input type="text" className="log-email" placeholder="Email"></input>
              <input type="text" className="log-password" placeholder="Password"></input>
              <button className="login btn btn-success">Log In</button>
              <span><a className="need-account" href="#sign-up">Need an Account?</a></span>
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
