var _ = require('underscore');
var React = require('react');
var $ = require('jquery');

var User = require('../models/user').User;
var MomentCollection = require('../models/moment').MomentCollection;
var Moment = require('../models/moment').Moment;
var SlideShow = require('../models/slideshow').SlideShow;


var CreateShowComponent = React.createClass({
  getInitialState: function(){
    return {momentCollection: [], moment: [] };
  },
  componentWillMount: function(){
    var self = this;
    var momentCollection = new MomentCollection();
    momentCollection.fetch().done(function(){
      self.setState({'momentCollection': momentCollection})
    });
  },
  handleChange: function(moment){
    var self = this;
    console.log(moment);
    var isSelected = moment.get('selected');
    moment.set("selected", !isSelected);
  },
  handleTitleChange: function(e){
    this.setState({'title': e.target.value});
  },
  handleDescriptionChange: function(e){
    // var slideshow = slideshow.get('description')
    this.setState({'description': e.target.value});
  },
  handleSave: function(){
    var self = this;
    // Build an array of the selected image ids
    var selectedMoments = _.pluck(this.state.momentCollection.where({selected: true}), 'id');
    console.log(this.state.description);
    // Create new slideshow
    var slideshow = new SlideShow();

    slideshow.set({
      'title': this.state.title,
      'description': this.state.description,
      'moment_ids': selectedMoments
    });

    slideshow.save().then(function(resp){
      self.props.router.navigate('slide/list', {trigger: true});
      slideshow.fetch();
      console.log(slideshow);
    })
  },
  render: function(){
    var self = this;
    var momentListDisplay = this.state.momentCollection.map(function(moment, index){
      console.log("thumb width and height", moment.getThumbHeight(), moment.getThumbWidth())
      return (
        <li className="image-thumb col-xs-2" data-moment-id={moment.get("id")} key={index}>
          <label  htmlFor={index}>
            <input onChange={function(){ self.handleChange(moment) }} id={index} type="checkbox" />
            <img  width={moment.getThumbWidth()} height={moment.getThumbHeight()} src={moment.get("dropbox_path")}></img>
          </label>
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
            <div className="col-xs-11 col-xs-offset-1">
                <input onChange={this.handleTitleChange}  className="create-title"  type="text" name="title" placeholder="Title" />
                <input onChange={this.handleDescriptionChange} className="create-description" type="text" name="description" placeholder="Description" />
          </div>
          <div className="slide-container col-xs-11 col-xs-offset-1">
            {momentListDisplay}
          </div>
          <div className="col-xs-7 col-xs-offset-5">
            <button onClick={this.handleSave} type="submit" className="save btn btn-danger">Save</button>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = {
  'CreateShowComponent': CreateShowComponent
}
