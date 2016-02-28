var _$ = jQuery.noConflict();

(function($) {
//FIXME: terrible hack for loading older version of jquery outside my power
// Put everything for atlas in this method to guarantee a ref to the
// correct version of jQuery
// http://api.jquery.com/jQuery.noConflict/
//##########################################################################

var menu;
var map;
$(document).ready(function() {

  menu = new Atlas.Menu("#atlas #treaties");
  menu.setup("#atlas #treaties");

  map = new Atlas.Map();

  google.setOnLoadCallback(function() {
      map.drawRegionsMap(location.hash);
  });

  window.addEventListener("hashchange", function() {
    map.hashselect();
  }, false);

});

$(window).load(function() {
  menu.display();
});


//##########################################################################
}(_$)); //XXX: END OF FORCED JQUERY VERSION
