var React = require('react');
var User = require('../models/user').User;


var SignUpComponent = React.createClass({
  render: function(){
    return(
      <div>
        <header className="banner row">
          <div className="logo col-xs-7 col-xs-offset-5"><img src="./images/arkiver-black-logo.png"></img></div>
        </header>

        <div className="signmeup row">
          <div className="signup-complete col-xs-8 col-xs-offset-4">
            <form>
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
