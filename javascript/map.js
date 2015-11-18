
      // google.setOnLoadCallback(drawRegionsMap(location.hash));
      google.setOnLoadCallback(function() {
        // if (location.hash) {
          drawRegionsMap(location.hash);
        // } else {
          // location.hash="#madrid_agreement";
        // }
      });

  function drawRegionsMap(name) {

    if (name) {
      name = name.replace("#","");
    }

    var key = name
    if(!treaties.hasOwnProperty(key)) {
      key = "madrid_agreement";
      location.hash="#madrid_agreement";
    }

    console.log(key);
    key = key.replace("#","")
    console.log(treaties[key].countries.length);

    var data = google.visualization.arrayToDataTable(treaties[key].countries);

    var options = {
     // region: '002', // Africa
      colorAxis: {colors: ['#69ABD4']},
      // backgroundColor: '#81d4fa',
      backgroundColor: { fill:'transparent', stroke:"#333" },
      // markerOpacity: '0.5',
      // backgroundColor.fill: 'blue',
      //datalessRegionColor: '#f8bbd0',
      // animation: {"startup": true},
      animation:{
       duration: 1000,
       easing: 'out',
     },
      defaultColor: '#bdc3c7',
      legend:'none',
    };

    console.log(treaties[key].description);
    $('#description').text(treaties[key].description);

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    // chart.draw(data, options);

    function drawChart() {
  // Disabling the button while the chart is drawing.
  // button.disabled = true;
  // google.visualization.events.addListener(chart, 'ready',
  //     function() {
  //       button.disabled = false;
  //       button.value = 'Switch to ' + (current ? 'Tea' : 'Coffee');
  //     });
  // options['title'] = 'Monthly ' + (current ? 'Coffee' : 'Tea') + ' Production by Country';

  // chart.draw(data[current], options);
  chart.draw(data, options);
}
drawChart();


    $(window).smartresize(function () {
      // chart.draw(data, options);
      drawChart();
    });

  }
