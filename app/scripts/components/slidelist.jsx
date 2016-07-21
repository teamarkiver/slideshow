var React = require('react');
var User = require('../models/user').User;
var SlideShowerCollection = require('../models/slideshow').SlideShowerCollection;
var $ = require('jquery');

var SlideListComponent = React.createClass({
  getInitialState: function(){
    return {slideDisplay: [] };
  },
  componentWillMount: function(){
    var self = this;
    var slideDisplay = new SlideShowerCollection();
    slideDisplay.fetch().done(function(){
      self.setState({'slideDisplay': slideDisplay})
    });
  },
  render: function(){
    var slideDisplayList = this.state.slideDisplay.map(function(slideShow){
      return ( <li className="slideshow-item">

        <div className="slideshow-name">{slideShow.get('title')}</div>
          <div className="slideshow-actions">
            <div className="delete"><button className="btn btn-danger">Delete</button></div>
            <div className="edit"><button className="btn btn-primary">Edit</button></div>
            <div className="view"><button className="btn btn-success">View</button></div>
          </div>
        </li>
      )
    });

    return(
      <div className="slider-main">
        <div className="row">
            <div className="col-xs-11 col-xs-offset-1">
              <h1 className="title-slide">Slide Show <span className="title-author">by Arkiver</span></h1>
            </div>
        </div>
          <div className="slid row">
            <div className="slide-container col-xs-11 col-xs-offset-1">
              {slideDisplayList}
            </div>
              <div className="col-xs-8 col-xs-offset-4">
                <button className="btn btn-success">Create</button>
              </div>
          </div>
      </div>
    )
  }
})

module.exports = {
  'SlideListComponent': SlideListComponent
}
