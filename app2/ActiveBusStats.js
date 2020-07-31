// function dataSnippet (data, next) {
// write your code here:
let routes = data.route.map((o) => o["tag"]);

Promise.all(
  routes.map((r) => {
    return new Promise(function (resolve, reject) {
      d3.json(
        "http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=" +
          r,
        resolve
      );
    });
  })
).then((result) => {
  // console.log(result);
  let busStats = [];
  console.log(result);

  for (let route of result) {
    if (route.vehicle && route.vehicle.length && route.vehicle[0].routeTag) {
      busStats.push({
        route: route.vehicle[0].routeTag,
        count: route.vehicle.length,
        avgSpeed: d3.mean(route.vehicle, (d) => d.speedKmHr),
      });
    }
  }

  next(busStats);

  SAGE2.SnippetTimeout({ time: 1000 * 10 }); // 1s timeout
});
