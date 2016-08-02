var _ = require('underscore');
var React = require('react');
var $ = require('jquery');

var User = require('../models/user').User;
var MomentCollection = require('../models/moment').MomentCollection;
var Moment = require('../models/moment').Moment;
var SlideShow = require('../models/slideshow').SlideShow;


var CreateUpdateShowComponent = React.createClass({
  getInitialState: function(){
    return {
      momentCollection: [],
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
    // Build an array of the selected image ids
    var selectedMoments = _.pluck(this.state.momentCollection.where({selected: true}), 'id');
    console.log("selectedMoments are ", selectedMoments);
    // Create new slideshow

    var slideshow = this.state.slideshow;
    slideshow.set({
      'title': this.state.title,
      'description': this.state.description,
      'moment_ids': selectedMoments,
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
            <div className="col-xs-7 col-xs-offset-5">
                <input onChange={this.handleTitleChange} value={this.state.title}  className="create-title"  type="text" name="title" placeholder="Create SlideShow Title" />
          </div>
          <div className="slide-second-container col-xs-11 col-xs-offset-1">
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
  'CreateUpdateShowComponent': CreateUpdateShowComponent
}
