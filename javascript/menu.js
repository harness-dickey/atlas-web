// $(window).load(function() {
//   var menu = $("#atlas #treaties");
//
//   var acc = $(document.createElement("ul"));
//   acc.addClass("accordion");
//   menu.append(acc);
//
//   create_sections(acc);
//
//   // $('ul.accordion').accordion();
//
// });

function create_sections(acc) {

    $.each(groups, function( index, group ) {
      var section = $(document.createElement("li"));
      acc.append(section);
      if (index == 0) {
        // section.addClass("current");
      }
      section.append(section_link);
      var section_link = $(document.createElement("a"));
      section.append(section_link);
      section_link.attr("href","#"+group.key);
      // link.attr("id",element.key);
      section_link.html(group.name);

      var ul = $(document.createElement("ul"));
      section.append(ul);

      $.each(treaties, function( index, element ) {
        if (is_elem_in_group(element, group.key)) {
          ul.append(add_links(element, group.key));
        }
      });

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
      console.log("is elem in group? "+elem.groups+" -- "+type);
      return true;
    }
   }

  return false;
}


$(function() {
  var menu = $("#atlas #treaties");

  var acc = $(document.createElement("ul"));
  acc.addClass("accordion");
  menu.append(acc);

  create_sections(acc);

  // $('ul.accordion').accordion();
  // setTimeout(function() {
    // window.scrollTo(0, 0);
  $('ul.accordion').accordion();
// }, 1000);
  // $('a[href=#patents]').trigger('activate-node');
});
