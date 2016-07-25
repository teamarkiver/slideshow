var Backbone = require('backbone');
var $ = require('jquery');

var SlideShow = Backbone.Model.extend({
  urlRoot: 'https://arkiver.com/api/slideshows'
});

var SlideShowCollection = Backbone.Collection.extend({
  model: SlideShow,
  url: 'https://arkiver.com/api/slideshows',
  // slides: function(title, description, moment_ids){
  //
  //   var queryString = jQuery.param({'title': title, 'description': description, 'moment_ids': moment_ids});
  //   var payload = {
  //         "slideshow":{
  //           "title":"cool story bro",
  //           "description":"tell it again",
  //           "moment_ids": [1,2,3]
  //     }
  //   };
  //
  //   $.post("https://arkiver.com/api/slideshow_moments", JSON.stringify(payload), function(resp){
  //     //resp.user_token
  //     console.log(arguments);
  //
  //     localStorage["user_email"] = email,
  //     localStorage["user_token"] = resp.authentication_token
  //   }).success(function() {
  //     callbacks.success();
  //   }).fail(function() {
  //     callbacks.fail();
  //   });
  //   console.log(callbacks);

});


module.exports = {
  'SlideShow': SlideShow,
  'SlideShowCollection': SlideShowCollection
}
