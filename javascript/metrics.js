var client = new Keen({
  projectId: "55c6447596773d704c91e556", // String (required always)
  writeKey: "20522e41d21796c46e5dc23896f72ccec3af1d330bc6e9613647fd14b8e7f437bfc182f976a732ba2a642d49c54ea748533746d95e66cdbedc32891f360ae3507aa4b3761fcef25b6acb6fabf1044fc6f349931a8b43a03b036d678f5a0ac5db1815848aae11f9408ed749d0d45414f0",   // String (required for sending data)
});


$(function() {
  client.addEvent("page-load", {
"user_agent" : "${keen.user_agent}",
"ip_address" : "${keen.ip}",
"page_url" : window.location.href,
"keen" : {
  "addons" : [
    {
      "name" : "keen:ua_parser",
      "input" : {
        "ua_string" : "user_agent"
      },
      "output" : "parsed_user_agent"
    },
    {
      "name" : "keen:ip_to_geo",
      "input" : {
        "ip" : "ip_address"
      },
      "output" : "ip_geo_info"
    },
    {
      "name" : "keen:url_parser",
      "input" : {
        "url" : "page_url"
      },
      "output" : "parsed_page_url"
    }
  ]
}
  });
});
