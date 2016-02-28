var Atlas = Atlas || {};

//##########################################################################
// Atlas Menu

Atlas.Menu = function (subdomain, token) {

  this.create_sections = function(acc) {
      var that = this;
      $.each($groups, function( index, group ) {
        var section = $(document.createElement("li"));

        var section_link = $(document.createElement("a"));
        section.append(section_link);
        section.addClass("section");
        section_link.attr("id",""+group.key);
        // link.attr("id",element.key);
        section_link.html(group.name);

        var ul = $(document.createElement("ul"));
        section.append(ul);

        $.each($treaties, function( index, element ) {
          if (that.is_elem_in_group(element, group.key)) {
            ul.append(that.add_links(element, group.key));
          }
        });

        if ($(ul).find('a').length) acc.append(section);
        if ($(ul).find('a.active').length) section.addClass("current");

      });

  };

  this.setup_regions = function (acc) {
    var region = $(document.createElement("li"));
    acc.append(region);

    var region_link = $(document.createElement("a"));
    region.append(region_link);
    region.addClass("section");
    region_link.attr("id","regions");
    // link.attr("id",element.key);
    region_link.html("Regions");

    var ul = $(document.createElement("ul"));
    region.append(ul);

    $.each($regions, function(index, elem) {
      var li = $(document.createElement("li"));
      ul.append(li);
      var link = $(document.createElement("a"));
      // link.attr("href","?region="+elem["code"]);
      link.attr("id",elem.key);
      link.html(elem.name);
      li.append(link);
      link.click(function() {
        window.location = "?region="+elem.key+location.hash
      });
    });
  };

};

Atlas.Menu.prototype.setup = function(selector) {
  var $menu = this;

  var menu = $("#atlas #treaties");

  var acc = $(document.createElement("ul"));
  acc.addClass("accordion");
  menu.append(acc);

  $menu.create_sections(acc);
  $menu.setup_regions(acc);

  // $(selector).on('submit', function(ev){
  //   ev.preventDefault();
  //   $.post(foobar.url(), $(selector).serialize()).done(success).fail(fail);
  // });
};

Atlas.Menu.prototype.is_elem_in_group = function (elem, type) {
   for(var index=0; index < elem.groups.length; index++) {
    if (type === elem.groups[index]) {
      return true;
    }
   }
  return false;
};

Atlas.Menu.prototype.add_links = function (element) {
  var li = $(document.createElement("li"));
  var link = $(document.createElement("a"));
  var div = $(document.createElement("div"));
  li.append(link);
  // li.append(div);
  link.attr("href","#"+element.key);
  link.attr("id",element.key+"_ID");
  link.html(element.name);
  return li;
};

// Atlas.Menu.prototype.display = function(selector, success, fail) {
Atlas.Menu.prototype.display = function() {

  $('#atlas ul.accordion').accordion();

  $("#atlas #description #export_button").click(function() {
    $("#atlas #description #export").fadeToggle();
  });

  $("#atlas #description #minimize_description_button").click(function() {
    $("#atlas #description #export").fadeOut();
    $("#atlas #description").fadeOut();
    $("#atlas #description_launcher").fadeIn();
  });

  $("#atlas #description_launcher #maximize_description_button").click(function() {
    $("#atlas #description").fadeIn();
    $("#atlas #description_launcher").fadeOut();
  });


  $(document).click(function() { $('#atlas #description #export').fadeOut(); });
  $('#atlas #description').click(function(e) { e.stopPropagation(); return false; });

};


//##########################################################################
// Atlas Map

Atlas.Map = function () {

  this.drawRegionsMap = function (name) {

    var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});

    // setTimeout(function() {
    //   window.scrollTo(0, 0);
    // }, 1);

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

    this.activate_link(key);

    // var data = google.visualization.arrayToDataTable($treaties[key].countries);

    var data = this.load_data($treaties[key]);

    var region = "world";
    if (params["region"]) region = params["region"]

    console.log("region = "+region);

    var options = {
      colorAxis: {colors: [ '#bdc3c7', '#69ABD4']},
      // colorAxis: {colors: ['#69ABD4','#F4AD22']},
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

    this.generate_description($treaties[key]);

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

  };

  this.load_data = function (treaty) {
    var that = this;
    // countries = treaty.countries
    // console.log("<><><><> countries: "+countries);
    var data = new google.visualization.DataTable();
      data.addColumn('string',  'Country');
      data.addColumn('number', 'Included');
      data.addColumn({type:'string',role:'tooltip'});
    //  data.addRows( countries );

    $.each(treaty.included, function(index, key) {
      data.addRow([$countries[key].name, 1, that.format_tooltip("Yes", $countries[key].marking, treaty)]);
    });

    $.each(treaty.excluded, function(index, key) {
      data.addRow([$countries[key].name, 0, that.format_tooltip("No", $countries[key].marking, treaty)]);
    });

    // $.each(countries, function(index, key, value) {
    //   console.log("VALU: "+key);
    //   data.addRow([key[0], key[1], format_tooltip(key[1], key[2])]);
    // });

    return data;
  };

  this.format_tooltip = function (inc, mark, treaty) {
    var tip = "Included: "+inc;
    if (mark && this.isTrademark(treaty)) {
      tip += "\nMark: "+mark;
    }
    return tip;

  };

  this.isTrademark = function (treaty) {
    return $.inArray("trademarks", treaty.groups) >= 0;
  };

  this.generate_description = function (treaty) {
    var that = this;
    $('#atlas #description .title').text(treaty.name);
    $('#atlas #description .body').text(treaty.description);
    var div = $('#description #export');
    var inc_ul = $('#atlas #description #export #included ul');
    var ex_ul = $('#atlas #description #export #excluded ul');
    // $('#atlas #description #export #included').append(inc_ul);
    // $('#atlas #description #export #excluded').append(ex_ul);

    $('#atlas #description #export #included .atlas-clipboard').click(function(){
      that.treaty_modal(treaty.included, "Included");
    });

    $('#atlas #description #export #excluded .atlas-clipboard').click(function(){
      that.treaty_modal(treaty.excluded, "Excluded");
    });

    inc_ul.empty();
    ex_ul.empty();

    $.each(treaty.included, function(index, key) {
      inc_ul.append(that.createCountryListItem($countries[key].name));
    });

    $.each(treaty.excluded, function(index, key) {
      ex_ul.append(that.createCountryListItem($countries[key].name));
    });

  };

  this.treaty_modal =function (treaties, name) {
    var data = $('#atlas #atlas-modal #data');
    $('#atlas #atlas-modal .title').html("Copy "+name);
    data.empty();

    $.each(treaties, function(index, key) {
      data.append($countries[key].name+", ");
    });
    data.select();

    (function($) {
      $('#atlas-modal').modal({overlayClose:true});
    }(_$));
  };

  this.createCountryListItem = function (name) {
    var li = $(document.createElement("li"));
    li.html(name);
    return li;
  };

  this.activate_link = function (key) {
    console.log("activate link: "+key);
    $("#atlas #treaties a").removeClass('active');
    $("#atlas a#"+key+"_ID").addClass('active');
    $('#atlas a#'+ $treaties[key].groups[0]).trigger('activate-node');
  };

  this.hashselect = function () {
      // alert("clicked...."+location.hash );
      this.drawRegionsMap(location.hash);
  };

};
