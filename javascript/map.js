
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

    activate_link(key);

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

    generate_description(treaties[key]);

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

    $(window).smartresize(function () {
      chart.draw(data, options);
    });

  }

  function generate_description(treaty) {
    $('#description').text(treaty.description);
    
    var li = $(document.createElement("li"));
    li.addClass("treaty_nav");
    menu.append(li);
    var link = $(document.createElement("a"));
    li.append(link);
    link = $(link);
    link.attr("href","#"+element.key);
    link.attr("id",element.key);
    link.html(element.name);
  }

  function activate_link(key) {
    console.log("activate link: "+key);
    $("#atlas #treaties a").removeClass('active');
    $("#atlas a#"+key).addClass('active');
  }
