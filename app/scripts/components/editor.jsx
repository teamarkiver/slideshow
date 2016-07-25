var React = require('react');
var User = require('../models/user').User;
var MomentCollection = require('../models/moment').MomentCollection;
var Moment = require('../models/moment').Moment;
var $ = require('jquery');

var CreateShowComponent = React.createClass({
  getInitialState: function(){
    return {momentCollection: [] };
  },
  componentWillMount: function(){
    var self = this;
    var momentCollection = new MomentCollection();
    momentCollection.fetch().done(function(){
      self.setState({'momentCollection': momentCollection})
    });
  },
  render: function(){
    var momentListDisplay = this.state.momentCollection.map(function(moment, index){
      console.log("thumb width and height", moment.getThumbHeight(), moment.getThumbWidth())
      return (
        <li className="image-thumb col-xs-2" data-moment-id={moment.get("id")} key={index}>
          <label htmlFor={index}><input  id={index} type="checkbox" /><img  width={moment.getThumbWidth()} height={moment.getThumbHeight()} src={moment.get("dropbox_path")}></img></label>
        </li>
      )
    });
    return (
      <div>
        <header className="banner row">
          <div className="logo col-xs-7 col-xs-offset-5"><img src="./images/arkiver-black-logo.png"></img></div>
        </header>
        <div className="row">
            <div className="col-xs-11 col-xs-offset-1">
              <h3 className="title-slide">Create Slide Show</h3>
            </div>
        </div>
        <div className="slid row">
          <div className="slide-container col-xs-11 col-xs-offset-1">
            {momentListDisplay}
          </div>
          <div className="col-xs-7 col-xs-offset-5">
            <form>
              <button type="submit" className="save btn btn-danger">Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = {
  'CreateShowComponent': CreateShowComponent
}
