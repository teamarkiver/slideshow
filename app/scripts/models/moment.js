var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

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
    url: 'https://arkiver.com/api/slideshow_moments',

    determineMomentSelectedState: function(activeMomentIds){
      console.log("determineMomentSelectedState", activeMomentIds);
      this.models.map(function(moment){
        if(_.some(activeMomentIds, function(id){return id == moment.get("id")})){
          moment.set("selected", true)
        }
      })
    },

    parse: function(response){
      console.log("response in collection parse method is",response);

      return response
    }
});


module.exports = {
  'Moment': Moment,
  'MomentCollection': MomentCollection
};
