// function dataSnippet (data, next) {
// write your code here:
d3.json(
  "http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=" +
    data.tag,
  next
);

SAGE2.SnippetTimeout({ time: 5000 }); // 5s timeout
//}
