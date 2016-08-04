var _ = require('underscore');
var React = require('react');
var $ = require('jquery');
var SC = require('soundcloud');

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
    var router = this.props.router;
    var slideshow = this.state.slideshow;
    slideshow.set('id', this.props.slideshowId);

    slideshow.fetch().done(function(){
      console.log(slideshow);
      self.setState({'slideshow': slideshow})
      var viewer = new Viewer(document.getElementById('slideshow'),
      {
        button: true,
        hide:function(){
          console.log("hide event fired");
          router.navigate('slide', {trigger: true});
        }
      })
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
        <li className="hidden" key={moment.id}>
          <img src={moment.dropbox_path} />
        </li>
      )
    })
    return (
      <div>


        <div className="slide-container col-md-11 col-md-offset-1">
          <ul id="slideshow">
            {imageList}
            <TrackDetail slideshowId={this.props.slideshowId}/>
          </ul>
        </div>
      </div>
    )

  }
});
var TrackDetail = React.createClass({
  getInitialState() {
    return {
      track: {},
    };
  },

  componentWillMount() {
    this.fetchTrack();
  },

  fetchTrack() {
    var self = this;
    var trackId = localStorage.getItem('track_id_' + this.props.slideshowId);
    console.log(trackId);
    if(!trackId){
      return;
    }

    SC.get('/tracks/' + trackId).then(function(track){
      self.setState({ track: track });

      SC.oEmbed(track.uri, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
        self.setState({embed: {__html: oEmbed.html}});
      });

      // SC.stream('/tracks/' + this.props.id).then(function(stream){
      //   console.log(stream);
      //   self.setState({ stream: stream });
      // });
    });
  },

  togglePlaying() {
    this.state.stream && this.state.stream.toggle();
    this.forceUpdate();
  },

  render() {
    return (
      <div>
        <h1 className="soundcloud-title">{this.state.track.title}</h1>
        {<button className="soundcloud-play" onClick={this.togglePlaying}>
          {this.state.stream && this.state.stream.isPlaying() ? "Pause" : "Play"}
        </button>}

        <div className="soundcloud-album" dangerouslySetInnerHTML={this.state.embed} />
      </div>
    );
  }
});


module.exports = {
  'ViewSlideShowComponent': ViewSlideShowComponent,
  'TrackDetail': TrackDetail
};
