var React = require('react');
var User = require('../models/user').User;
var $ = require('jquery');

var SignUpComponent = React.createClass({
  handleCreateAccount: function(e){
    e.preventDefault();

    var email = $('.sign-email').val();
    var firstName = $('.first-name').val();
    var lastName = $('.last-name').val();
    var signPassword = $('.sign-password').val();
    var confPassword = $('.conf-password').val();

    var newUser = new User();
    console.log(newUser);
    newUser.signUp(firstName, lastName, email, signPassword, confPassword);
    newUser.set({'email': email, 'firstName': firstName, 'lastName': lastName, 'signPassword': signPassword, 'confPassword': confPassword})

    newUser.save();
  },
  render: function(){
    return(
      <div>
        <header className="banner row">
          <div className="logo col-xs-7 col-xs-offset-5"><img src="./images/arkiver-black-logo.png"></img></div>
        </header>

        <div className="signmeup row">
          <div className="signup-complete col-xs-8 col-xs-offset-4">
            <form onSubmit={this.handleCreateAccount}>
              <input type="text" className="sign-email" placeholder="Email"></input>
              <input type="text" className="first-name" placeholder="First Name"></input>
              <input type="text" className="last-name" placeholder="Last Name"></input>
            <div>
              <input type="text" className="sign-password" placeholder="Password"></input>
              <input type="text" className="conf-password" placeholder="Confirm Password"></input>
            </div>
            <button className="sign-success btn btn-success">Sign Up</button>
          </form>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = {
  'SignUpComponent': SignUpComponent
}
