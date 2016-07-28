var Backbone = require('backbone');
var $ = require('jquery');

var Moment = Backbone.Model.extend({
    urlRoot: 'https://arkiver.com/api/slideshow_moments',
    defaults: {
      selected: false
    },
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
    }
});


var MomentCollection = Backbone.Collection.extend({
    model: Moment,
    url: 'https://arkiver.com/api/slideshow_moments'
});


module.exports = {
  'Moment': Moment,
  'MomentCollection': MomentCollection
};
