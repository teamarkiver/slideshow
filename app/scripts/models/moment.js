var Backbone = require('backbone');
var $ = require('jquery');

var Moment = Backbone.Model.extend({
    urlRoot: 'https://arkiver.com/api/slideshow_moments',
    getHeight: function() {
      return this.get("meta").height
    },
    getWidth: function() {
      return this.get("meta").width
    },
    getThumbWidth: function() {
      return 200;

    },
    getThumbHeight: function() {
      return this.getHeight()*this.getThumbWidth()/this.getWidth()
    },
    imageSelected: function(){
      return false;
    }
});

var MomentCollection = Backbone.Collection.extend({
    model: Moment,
    url: 'https://arkiver.com/api/slideshow_moments'
});


module.exports = {
  'Moment': Moment,
  'MomentCollection': MomentCollection
}
