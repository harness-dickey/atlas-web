
  // google.setOnLoadCallback(drawRegionsMap(location.hash));
  google.setOnLoadCallback(function() {
    // if (location.hash) {
      drawRegionsMap(location.hash);
    // } else {
      // location.hash="#madrid_agreement";
    // }
  });

  function drawRegionsMap(name) {

    var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});

    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1);

    if (name) {
      name = name.replace("#","");
    }

    var key = name
    if(!$treaties.hasOwnProperty(key)) {
      key = "paris_convention";
      location.hash="#paris_convention";
    }

    console.log(key);
    key = key.replace("#","")
    console.log($treaties[key].countries.length);

    activate_link(key);

    // var data = google.visualization.arrayToDataTable($treaties[key].countries);

    var data = load_data($treaties[key]);

    var region = "world";
    if (params["region"]) region = params["region"]

    console.log("region = "+region);

    var options = {
      colorAxis: {colors: ['#F4AD22','#69ABD4']},
      backgroundColor: { fill:'transparent', stroke:"#333" },
      animation: {"startup": true},
      animation:{
       duration: 1000,
       easing: 'out',
     },
     region: region,
      defaultColor: '#bdc3c7',
      datalessRegionColor: '#bdc3c7',
      // datalessRegionColor: '#E09600',
      legend:'none',
    };

    generate_description($treaties[key]);

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

    google.visualization.events.addListener(chart, 'regionClick', regionHandler);

    function regionHandler(e) {
      console.log('country clicked' + e['region']);
      window.location = "?region="+e['region']+location.hash
    }

    $(window).smartresize(function () {
      chart.draw(data, options);
    });

  }

  function load_data(treaty) {
    countries = treaty.countries
    console.log("<><><><> countries: "+countries);
    var data = new google.visualization.DataTable();
      data.addColumn('string',  'Country');
      data.addColumn('number', 'Included');
      data.addColumn({type:'string',role:'tooltip'});
    //  data.addRows( countries );

    $.each(countries, function(index, key, value) {
      console.log("VALU: "+key);
      data.addRow([key[0], key[1], format_tooltip(key[1], key[2])]);
    });

    return data;
  }

  function format_tooltip(inc, mark) {
    var tip = "Included: "+inc.f;
    if (mark) {
      tip += "\nMark: "+mark;
    }
    return tip;

  }

  function generate_description(treaty) {
    $('#atlas #description .title').text(treaty.name);
    $('#atlas #description .body').text(treaty.description);
    var div = $('#description #export');
    var inc_ul = $('#atlas #description #export #included ul');
    var ex_ul = $('#atlas #description #export #excluded ul');
    // $('#atlas #description #export #included').append(inc_ul);
    // $('#atlas #description #export #excluded').append(ex_ul);
    inc_ul.empty();
    ex_ul.empty();

    $.each(treaty.included, function(index, key) {
      var li = $(document.createElement("li"));
      inc_ul.append(li);
      li.html($countries[key].name);
    });

    $.each(treaty.excluded, function(index, key) {
      var li = $(document.createElement("li"));
      ex_ul.append(li);
      li.html($countries[key].name);
    });

  }

  function activate_link(key) {
    console.log("activate link: "+key);
    $("#atlas #treaties a").removeClass('active');
    $("#atlas a#"+key).addClass('active');
    $('#atlas a#'+ $treaties[key].groups[0]).trigger('activate-node');
  }
