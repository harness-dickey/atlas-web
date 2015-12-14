function create_sections(acc) {

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
        if (is_elem_in_group(element, group.key)) {
          ul.append(add_links(element, group.key));
        }
      });

      if ($(ul).find('a').length) acc.append(section);
      if ($(ul).find('a.active').length) section.addClass("current");

    });

};

function setup_regions(acc) {
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
}

function add_links(element) {
  var li = $(document.createElement("li"));
  var link = $(document.createElement("a"));
  var div = $(document.createElement("div"));
  li.append(link);
  // li.append(div);
  link.attr("href","#"+element.key);
  link.attr("id",element.key);
  link.html(element.name);
  return li;
}

function is_elem_in_group(elem, type) {
   for(var index=0; index < elem.groups.length; index++) {
    if (type === elem.groups[index]) {
      return true;
    }
   }

  return false;
}


$(document).ready(function() {
  var menu = $("#atlas #treaties");

  var acc = $(document.createElement("ul"));
  acc.addClass("accordion");
  menu.append(acc);

  create_sections(acc);
  setup_regions(acc);

});

$(window).load(function() {
  $('#atlas ul.accordion').accordion();

  $("#atlas #description #export_button").click(function() {
    $("#atlas #description #export").fadeToggle();
  });

  $(document).click(function() { $('#atlas #description #export').fadeOut(); });
  $('#atlas #description').click(function(e) { e.stopPropagation(); return false; });

});
