$(window).load(function() {
  var menu = $("#atlas #treaties ul");

  $.each(treaties, function( index, element ) {
    console.log("creating menu item: "+element.key+", name: "+element.name)
      var li = $(document.createElement("li"));
      li.addClass("treaty_nav");
      menu.append(li);
      var link = $(document.createElement("a"));
      li.append(link);
      link = $(link);
      link.attr("href","#"+element.key);
      link.attr("id",element.key);
      link.html(element.name);
  });

});
