var React = require('react');
var User = require('../models/user').User;
var SlideShowCollection = require('../models/slideshow').SlideShowCollection;
var $ = require('jquery');

var SlideListComponent = React.createClass({
  getInitialState: function(){
    return {slideShowCollection: [] };
  },
  componentWillMount: function(){
    var self = this;
    var slideShowCollection = new SlideShowCollection();
    slideShowCollection.fetch().done(function(){
      self.setState({'slideShowCollection': slideShowCollection})
    });
  },
  handleDelete: function (slideShow){
    console.log("slideshow is ", slideShow);
    this.state.slideShowCollection.remove(slideShow);
    console.log("this.state.slideShowCollection is ", this.state.slideShowCollection);
    slideShow.destroy();
    this.forceUpdate();

  },
  handleOnSubmit: function(e){
    e.preventDefault();
    var create = $('.create').val();
    var router = this.props.router;
    router.navigate('slide/create', {trigger: true});
  },
  // handleView: function(e){
  //   e.preventDefault();
  //   var self = this;
  //   var view = $('.view').val();
  //   var router = this.props.router;
  //   router.navigate('view/show', {trigger: true});
  // },
  render: function(){
    var self = this;
    var slideDisplayList = this.state.slideShowCollection.map(function(slideShow, index){
      return ( <li className="slideshow-item" key={index}>

        <h3 className="slideshow-name pull-left">{slideShow.get('title')}</h3>

          <div className="slideshow-actions pull-right">
            <button onClick={function(){self.handleDelete(slideShow)} } className="delete btn btn-danger">Delete</button>
            <button className="edit btn btn-primary">Edit</button>
            <a href={"#view/show/" + slideShow.get('id')} className="view btn btn-success">View</a>
          </div>
          <div className="clearfix"></div></li>

      )
    });

    return(
      <div className="slider-main fluid">

        <div className="row">
            <div className="col-xs-11 col-xs-offset-1">
              <h3 className="title-slide">Slide Show <span className="title-author">by Arkiver</span></h3>
            </div>
        </div>
          <div className="slid row">
            <div className="slide-container col-xs-11 col-xs-offset-1">
              <ul className="list-group">
              {slideDisplayList}
              </ul>
            </div>
              <div className="col-xs-7 col-xs-offset-5">
                <form onSubmit={this.handleOnSubmit}>
                  <button type="submit" className="create btn btn-success">Create</button>
                </form>
              </div>
          </div>
      </div>
    )
  }
})

module.exports = {
  'SlideListComponent': SlideListComponent
}
