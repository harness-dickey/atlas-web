
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
    // console.log($treaties[key].countries.length);

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
    // countries = treaty.countries
    // console.log("<><><><> countries: "+countries);
    var data = new google.visualization.DataTable();
      data.addColumn('string',  'Country');
      data.addColumn('number', 'Included');
      data.addColumn({type:'string',role:'tooltip'});
    //  data.addRows( countries );

    $.each(treaty.included, function(index, key) {
      data.addRow([$countries[key].name, 1, format_tooltip("Yes", $countries[key].marking)]);
    });

    $.each(treaty.excluded, function(index, key) {
      data.addRow([$countries[key].name, 0, format_tooltip("No", $countries[key].marking)]);
    });

    // $.each(countries, function(index, key, value) {
    //   console.log("VALU: "+key);
    //   data.addRow([key[0], key[1], format_tooltip(key[1], key[2])]);
    // });

    return data;
  }

  function format_tooltip(inc, mark) {
    var tip = "Included: "+inc;
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

    $('#atlas #description #export #included .atlas-clipboard').click(function(){
      treaty_modal(treaty.included, "Included");
    });

    $('#atlas #description #export #excluded .atlas-clipboard').click(function(){
      treaty_modal(treaty.excluded, "Excluded");
    });

    inc_ul.empty();
    ex_ul.empty();

    $.each(treaty.included, function(index, key) {
      inc_ul.append(createCountryListItem($countries[key].name));
    });

    $.each(treaty.excluded, function(index, key) {
      ex_ul.append(createCountryListItem($countries[key].name));
    });

  }

  function treaty_modal(treaties, name) {
    var modal = $('#atlas #atlas-modal');
    var data = $('#atlas #atlas-modal #data');
    $('#atlas #atlas-modal .title').html("Copy "+name);
    data.empty();

    $.each(treaties, function(index, key) {
      data.append($countries[key].name+", ");
    });
    data.select();
    $('#atlas-modal').modal({overlayClose:true});
  }

  function createCountryListItem(name) {
    var li = $(document.createElement("li"));
    li.html(name);
    return li;
  }

  function activate_link(key) {
    console.log("activate link: "+key);
    $("#atlas #treaties a").removeClass('active');
    $("#atlas a#"+key).addClass('active');
    $('#atlas a#'+ $treaties[key].groups[0]).trigger('activate-node');
  }
