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
        router.navigate('slide', {trigger: true});
      },
      error: function(user, error){
        console.log(user, error);
      }
    });
  },
  render: function(){
    return(
      <div className="main-login row">
        <div className="align-log">
          <h2 className="login-title">SlideShow</h2>
          <img className="slideshow-image" src="./images/Slideshow2.png" />
        </div>

        <div className="logmein row">
          <div className="login-complete col-md-offset-5 col-md-2">
            <form onSubmit={this.handleLogIn} className="navbar-form" id="login-user">
              <input type="text" className="log-email loglog" placeholder="Email"></input>
              <input type="password" className="log-password loglog" placeholder="Password"></input>
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
