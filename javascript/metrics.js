var client = new Keen({
  projectId: "569e84da46f9a72c3aba2792", // String (required always)
  writeKey: "eabfddf1d87495f92e6fa537d8a26f29c49580e07759024fcd8c9f270c09de9fed1ef2d4112aa801bcd3b42470c24549d963dac21ded05b4a2b9931ca951450c8e20e64332ab0775e3b2ed5266014caaf0e4ab5e1870b33c474be5e628af27c8",   // String (required for sending data)
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
