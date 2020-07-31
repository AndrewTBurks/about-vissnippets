// function generatorSnippet (previousData, next) {
// write your code here:
d3.json(
  "http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni",
  next
);
//}

// function dataSnippet (data, next) {
// write your code here:
d3.json(
  "http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=" +
    data.tag,
  next
);

SAGE2.SnippetTimeout({ time: 5000 }); // 5s timeout
//}

// function drawSnippet (data, next) {
// write your code here:
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "div" });

let route = _.sortBy(data.route, (o) => o.tag);
console.log(route);

let container = d3
  .select(elem)
  .style("text-align", "center")
  .style("background", "#fff");

let bind = container.selectAll(".route").data(route, (d) => d.tag);

bind.exit().remove();

bind
  .enter()
  .append("div")
  .attr("class", "route")
  .style("display", "inline-flex")
  .style("font-family", "sans-serif")
  .style("justify-content", "center")
  .style("align-items", "center");

container
  .selectAll(".route")
  .style("width", "60px")
  .style("height", "60px")
  .style("font-size", "15px")
  .style("box-shadow", "inset 0 0 10px #0004")
  .text((d) => {
    return d.tag.split("_").join(" ");
  })
  .on("click", function (d) {
    container
      .selectAll(".route")
      .classed("selected", false)
      .style("background", "#e0e0e0");

    d3.select(this).classed("selected", true).style("background", "#a6cee3");

    next(d);
  });

if (!container.selectAll(".selected").size()) {
  next(route[0]);
} else {
  container.selectAll(".selected").each((d) => next(d));
}
//}

// function drawSnippet (data, next) {
// write your code here:
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "div" });

this.locals = this.locals || {};

if (!this.locals.map) {
  let sf = [37.773972, -122.431297];

  this.locals.map = L.map(elem).setView(sf, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.locals.map);

  this.locals.pins = [];
}

elem.style.width = width + "px";
elem.style.height = height + "px";
this.locals.map.invalidateSize();

for (let pin of this.locals.pins) {
  this.locals.map.removeLayer(pin);
}

this.locals.pins = [];

if (data.vehicle) {
  this.locals.pins = data.vehicle.map((d) =>
    L.marker([d.lat, d.lon]).addTo(this.locals.map)
  );

  let bounds = L.latLngBounds(data.vehicle.map((d) => [d.lat, d.lon]));

  this.locals.map.fitBounds(bounds);
}

// optional initial output value for linking operations
next([]);
//}

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

  SAGE2.SnippetTimeout({ time: 1000 * 10 }); // 500ms timeout
});

// d3.json("http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=" + routes[10].tag, function(r) {
//     console.log(r);
// })

// 	next(newData);
//}

// function drawSnippet (data, next) {
// write your code here:
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "svg" });

let yAttr = SAGE2.SnippetInput({
  name: "Y Attribute", // name your input element
  type: "text",
  defaultVal: "count", // an *optional* default value for the input
});

let spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v2.json",
  width: width,
  height: height,
  autosize: {
    type: "fit",
    contains: "padding",
  },
  // everything above here is boilerplate to resize the chart correctly
  // below is the custom visualization specification
  data: {
    values: data,
  },
  mark: { type: "bar", filled: true },
  encoding: {
    x: { field: "route", type: "nominal" },
    y: { field: yAttr, type: "quantitative", scale: { zero: "true" } },
    // "color": {"field": "mag", "type": "quantitative", "scale": {"range": ["black", "red"]}},
    // "fillOpacity": 1,
    // "size": {"field": "mag"}
  },
};

// embed the visualization in the requested output element, using SVG renderer
vegaEmbed(elem, spec, { renderer: "svg" });

next([]);
//}
