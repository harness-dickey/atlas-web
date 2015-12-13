function create_sections(acc) {

    $.each($groups, function( index, group ) {
      var section = $(document.createElement("li"));

      section.append(section_link);
      var section_link = $(document.createElement("a"));
      section.append(section_link);
      section.addClass("section");
      section_link.attr("id",""+group.key);
      // link.attr("id",element.key);
      section_link.html(group.name);

      var ul = $(document.createElement("ul"));
      section.append(ul);
      ul.attr("style","list-style-type:none;");

      var has_links = new Boolean(false);

      $.each($treaties, function( index, element ) {
        if (is_elem_in_group(element, group.key)) {
          ul.append(add_links(element, group.key));
        }
      });

      if ($(ul).find('a').length) acc.append(section);
      if ($(ul).find('a.active').length) section.addClass("current");

    });
};

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
  acc.attr("style", "list-style-type:none;");
  menu.append(acc);

  create_sections(acc);

});

$(window).load(function() {
  $('#atlas ul.accordion').accordion();

  $("#atlas #description #export_button").click(function() {
    $("#atlas #description #export").toggle();
  });
});
