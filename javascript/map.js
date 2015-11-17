
      //  google.setOnLoadCallback(drawRegionsMap("madrid_agreement"));
       google.setOnLoadCallback(function() { location.hash="#madrid_agreement"});

  function drawRegionsMap(name) {

    key = name || "madrid_agreement"

    console.log('foo');
    console.log(key);
    key = key.replace("#","")
    console.log(treaties[key].countries.length);

    var data = google.visualization.arrayToDataTable(treaties[key].countries);

    // var data = google.visualization.arrayToDataTable([
    //   ['Country'],
    //   ['Germany'],
    //   ['United States'],
    //   ['Brazil'],
    //   ['Canada'],
    //   ['France'],
    //   ['RU']
    // ]);

    //var options = {};

    var options = {
     // region: '002', // Africa
      colorAxis: {colors: ['#69ABD4']},
      // backgroundColor: '#81d4fa',
      backgroundColor: { fill:'transparent', stroke:"#333" },
      // markerOpacity: '0.5',
      // backgroundColor.fill: 'blue',
      //datalessRegionColor: '#f8bbd0',
      defaultColor: '#bdc3c7',
      legend:'none',
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

    $(window).smartresize(function () {
      chart.draw(data, options);
    });

  }
