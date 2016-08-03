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

        <span className="slideshow-name pull-left">{slideShow.get('title')}</span>

          <div className="slideshow-actions pull-right">
            <button onClick={function(){self.handleDelete(slideShow)} } className="delete btn btn-danger">Delete</button>
            <a href={"#slide/" + slideShow.get('id') + '/edit'} className="edit btn btn-primary">Edit</a>
            <a href={"#slide/" + slideShow.get('id')} className="view btn btn-success">View</a>
          </div>
          <div className="clearfix"></div></li>

      )
    });

    return(
      <div className="slider-main fluid">

        <div className="row">
            <div>
            <h3 className="title-slide">Slide Show <span className="title-author">by Arkiver</span></h3>
            </div>

            <span className="back-link"><a className="back-link-second" href="http://arkiver.com">Back</a></span>
        </div>
          <div className="slid row">
            <div className="col-md-7 col-md-offset-5">
              <form onSubmit={this.handleOnSubmit}>
                <button type="submit" className="create btn btn-success">Create</button>
              </form>
            </div>
            <div className="slide-container col-md-10 col-md-offset-2">
              <ul className="list-group">
              {slideDisplayList}
              </ul>
            </div>

          </div>
      </div>
    )
  }
})

module.exports = {
  'SlideListComponent': SlideListComponent
}
