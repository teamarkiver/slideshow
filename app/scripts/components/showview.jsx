var _ = require('underscore');
var React = require('react');
var $ = require('jquery');

var User = require('../models/user').User;
var MomentCollection = require('../models/moment').MomentCollection;
var Moment = require('../models/moment').Moment;
var SlideShow = require('../models/slideshow').SlideShow;
console.log("window is", window);
 var Viewer = require('viewerjs');


var ViewSlideShowComponent = React.createClass({
  getInitialState: function(){
    return {
      'slideshow': new SlideShow()
    }
  },
  componentWillMount: function(){
    var self = this;
    var slideshow = this.state.slideshow;
    slideshow.set('id', this.props.slideshowId);

    slideshow.fetch().done(function(){
      console.log(slideshow);
      self.setState({'slideshow': slideshow})
      var viewer = new Viewer(document.getElementById('slideshow'), {button: true});
      viewer.show()
      viewer.play()


    });
  },
  componentDidMount: function(){

    var elems = document.getElementById('slideshow');
    console.log("elems are ", elems);

  },
  render: function(){
    var imageList = this.state.slideshow.get('moments').map(function(moment){
      return(
        <li key={moment.id}>
          <img src={moment.dropbox_path} />
        </li>
      )
    })
    return (
      <div>
        <header className="banner row">
          <div className="logo col-xs-7 col-xs-offset-5"><img src="./images/arkiver-black-logo.png"></img></div>
        </header>

        <div className="slide-container col-xs-11 col-xs-offset-1">
          <ul id="slideshow">
            {imageList}
          </ul>
        </div>
      </div>
    )

  }
});


module.exports = {
  'ViewSlideShowComponent': ViewSlideShowComponent
};
