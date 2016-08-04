var _ = require('underscore');
var React = require('react');
var $ = require('jquery');
var Masonry = require('masonry-layout');
var SC = require('soundcloud');

var User = require('../models/user').User;
var MomentCollection = require('../models/moment').MomentCollection;
var Moment = require('../models/moment').Moment;
var SlideShow = require('../models/slideshow').SlideShow;


var CreateUpdateShowComponent = React.createClass({
  getInitialState: function(){
    return {
      momentCollection: [],
      rob: "",
      moment: [],
      'slideshow': new SlideShow()
    };
  },
  componentWillMount: function(){
    var self = this;
    var momentCollection = new MomentCollection();
    var slideshow = this.state.slideshow;


    momentCollection.fetch().done(function(){
      self.setState({'momentCollection': momentCollection})
      var elem = document.querySelector('.slide-second-container');
      var msnry = new Masonry( elem, {
        // options
        itemSelector: '.image-thumb',

      });
      if(self.props.slideshowId){
        slideshow.set('id', self.props.slideshowId);

        slideshow.fetch().done(function(){
          var slideshowIds = slideshow.get("moments").map(function(moment){return moment.id})
          momentCollection.determineMomentSelectedState(slideshowIds)
          console.log("momentCollection is ", momentCollection);
          self.setState({
            'slideshow': slideshow,
            'title': slideshow.get('title'),
            'description': slideshow.get('description'),
          });

        });
      }
    });

  },
  componentDidMount: function(){
    SC.initialize({
      client_id: '385569c7d665b0e5a16779f44870a89b',
      redirect_uri: 'https://rhc912.github.io/final-project-soundcloud/callback.html'
    });

    // initiate auth popup
    SC.connect().then(function() {
      return SC.get('/me');
    }).then(function(me) {
      alert('Hello, ' + me.username);
    });

  },
  handleChange: function(moment){
    var self = this;
    console.log("moment is",moment);
    var isSelected = moment.get('selected');
    moment.set("selected", !isSelected);
    // re-render here
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
    console.log(this.state.song)

    // Build an array of the selected image ids
    var selectedMoments = _.pluck(this.state.momentCollection.where({selected: true}), 'id');
    console.log("selectedMoments are ", selectedMoments);
    // Create new slideshow

    var slideshow = this.state.slideshow;
    slideshow.set({
      'title': this.state.title,
      'description': this.state.description,
      'moment_ids': selectedMoments,
      'id': this.state.id
    });

    slideshow.save().then(function(resp){
      console.log("response after save is ", resp);
      self.props.router.navigate('slide', {trigger: true});
      console.log(slideshow);
    })
  },
  handleSelectedState: function(moment, e){
    moment.set("selected", !moment.get("selected"))
    console.log("moment selected state is toggled to:", moment.get("selected"));
    this.forceUpdate();
  },

  render: function(){
    console.log(this.state.slideshow);
    var self = this;
    var momentListDisplay = this.state.momentCollection.map(function(moment, index){
      return (
        <li className={"image-thumb " + (moment.get('selected') ? 'active' : '')}  data-moment-id={moment.get("id")} onClick={function(){ self.handleSelectedState(moment) }} key={index}>
          <label className="image-holder"  htmlFor={index}>
            <div className="select-indicator">
              <div className={moment.get("selected") ? "active-indicator active" : "active-indicator"}></div>
            </div>
            <img className={moment.get("selected") ? "slideshow-image selected" : "slideshow-image"}  width={moment.getThumbWidth()} height={moment.getThumbHeight()} src={moment.get("dropbox_path")}></img>
          </label>
        </li>
      )
    });
    return (
      <div>

        <div className="row">

        </div>
        <div className="slid row">
            <div className="col-md-7 col-md-offset-5">
                <input onChange={this.handleTitleChange} value={this.state.title}  className="create-title"  type="text" name="title" placeholder="Enter Title" />
          </div>
          <div className="slide-second-container col-md-10 col-md-offset-2">
            {momentListDisplay}
          </div>
          <footer className="row">
            <button onClick={this.handleSave} type="submit" className="save btn btn-danger col-xs-offset-5 col-md-3">Save</button>
          </footer>
          <TrackList parent={this}/>
        </div>
      </div>
    )
  }
});

var TrackList = React.createClass({

  getInitialState() {
    return {
      search: "",
      results: []
    };
  },

  handleChange: function(event) {
    console.log("show it");
    this.setState({search: event.target.value});
  },
  handleSongSelect: function(result, e){
    e.preventDefault();
    var self = this;
    // get id of LI that was clicked on
    this.props.parent.setState({"id": e.target.value});
    console.log("joel", result)
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var self = this;
    console.log("SEARCH STRING", this.state.search);

    SC.get('/tracks', {
      limit: 10,
      q: this.state.search,
      order: 'hotness'
    }).then(function(tracks){
      self.setState({results: tracks});
    });
  },

  render: function() {
    var self = this;
    var songs = this.state.results.map(function(result){
      return (
        <li key={result.id}>
          <a onClick={self.handleSongSelect.bind(self, result)}>
            {result.title}
          </a>
        </li>
      );
    });

    return (
      <div className="col-md-5 col-md-offset-5">
        <h1>Select Track</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
        <ul>
          {songs}
        </ul>
      </div>
    );
  }
});


module.exports = {
  'CreateUpdateShowComponent': CreateUpdateShowComponent,
  'TrackList': TrackList
}
