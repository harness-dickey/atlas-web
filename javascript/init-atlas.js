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

  google.charts.load('current', {
      'packages':['geochart']
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      // 'mapsApiKey': 'REPLACEME'
    });

  menu = new Atlas.Menu();
  menu.setup();

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
