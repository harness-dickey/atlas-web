
      // google.setOnLoadCallback(drawRegionsMap(location.hash));
      google.setOnLoadCallback(function() {
        // if (location.hash) {
          drawRegionsMap(location.hash);
        // } else {
          // location.hash="#madrid_agreement";
        // }
      });

  function drawRegionsMap(name) {

    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1);

    if (name) {
      name = name.replace("#","");
    }

    var key = name
    if(!$treaties.hasOwnProperty(key)) {
      key = "madrid_agreement";
      location.hash="#madrid_agreement";
    }

    console.log(key);
    key = key.replace("#","")
    console.log($treaties[key].countries.length);

    activate_link(key);

    var data = google.visualization.arrayToDataTable($treaties[key].countries);

    var options = {
      colorAxis: {colors: ['#69ABD4']},
      backgroundColor: { fill:'transparent', stroke:"#333" },
      animation: {"startup": true},
      animation:{
       duration: 1000,
       easing: 'out',
     },
      defaultColor: '#bdc3c7',
      legend:'none',
    };

    generate_description($treaties[key]);

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

    $(window).smartresize(function () {
      chart.draw(data, options);
    });

    $(window).load(function() {
      $('#atlas ul.accordion').accordion();
    });

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
