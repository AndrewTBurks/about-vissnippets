// function generatorSnippet (previousData, next) {
// write your code here:
d3.json(
  "https://data.cityofchicago.org/resource/pvq4-8f4k.json?\\$limit=10000",
  next
);
//}

// function dataSnippet (data, next) {
// write your code here:
// 	let newData = data;
let newData = {};

newData.area = _.uniq(data.map((o) => o["community_area"]));
newData.zipcodes = _.uniq(data.map((o) => o["zip_code"]));
newData.property_types = _.uniq(data.map((o) => o["primary_property_type"]));
newData.years = _.uniq(data.map((o) => o["year_built"]));

newData.elec_usage_min = d3.min(data.map((o) => +o["electricity_use_kbtu"]));
newData.elec_usage_max = d3.max(data.map((o) => +o["electricity_use_kbtu"]));
newData.gas_usage_min = d3.min(data.map((o) => +o["natural_gas_use_kbtu"]));
newData.gas_usage_max = d3.max(data.map((o) => +o["natural_gas_use_kbtu"]));

next(newData);
//}

// function drawSnippet (data) {
// write your code here:
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "svg" });

// make sure Vega, VegaEmbed, and Vega-Lite are loaded
if (
  window.vega === undefined ||
  window.vegaEmbed === undefined ||
  window.vl === undefined
) {
  throw new Error(
    "Vega, VegaEmbed, and Vega-Lite are required for this Snippet"
  );
}

// Create the Vega-Lite spec
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
  mark: { type: "point", filled: true },
  encoding: {
    x: { field: "year_built", type: "temporal" },
    y: {
      field: "site_eui_kbtu_sq_ft",
      type: "quantitative",
      scale: { zero: "true", type: "log" },
    },
    // "color": {"field": "mag", "type": "quantitative", "scale": {"range": ["black", "red"]}},
    // "fillOpacity": 1,
    // "size": {"field": "mag"}
  },
};

// embed the visualization in the requested output element, using SVG renderer
vegaEmbed(elem, spec, { renderer: "svg" });

next([]);
//}

// function drawSnippet (data) {
// write your code here:
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "svg" });

// make sure Vega, VegaEmbed, and Vega-Lite are loaded
if (
  window.vega === undefined ||
  window.vegaEmbed === undefined ||
  window.vl === undefined
) {
  throw new Error(
    "Vega, VegaEmbed, and Vega-Lite are required for this Snippet"
  );
}

// Create the Vega-Lite spec
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
  mark: { type: "circle", filled: true },
  encoding: {
    x: { field: "year_built", type: "temporal" },
    y: {
      field: "primary_property_type",
      type: "nominal",
      scale: { zero: "true" },
    },
    size: {
      aggregate: "count",
      field: "*",
      type: "quantitative",
      scale: { range: [0, 100] },
    },
  },
};

// embed the visualization in the requested output element, using SVG renderer
vegaEmbed(elem, spec, { renderer: "svg" });

next([]);
//}

// function drawSnippet (data, next) {
// write your code here:
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "svg" });

let svg = d3.select(elem);

let grouped = _.groupBy(data, "community_area");

let aggregated = {};

Object.keys(grouped).forEach((comm) => {
  aggregated[comm] = {
    elec: d3.mean(grouped[comm], (d) => d["electricity_use_kbtu"]),
    gas: d3.mean(grouped[comm], (d) => d["natural_gas_use_kbtu"]),
    sqft: d3.mean(grouped[comm], (d) => d["gross_floor_area_buildings_sq_ft"]),
    num: d3.sum(grouped[comm], (d) => d["of_buildings"]),
  };
});

let barheight = height / Object.keys(grouped).length - 2;

let xScale = d3
  .scaleLog()
  .domain(d3.extent(Object.values(aggregated).map((com) => com.elec)))
  .range([50, width - 20]);

let yScale = d3
  .scaleLog()
  .domain(d3.extent(Object.values(aggregated).map((com) => com.gas)))
  .range([20, height - 30]);

let radScale = d3
  .scaleLinear()
  .domain(d3.extent(Object.values(aggregated).map((com) => com.num)))
  .range([5, 25]);

let fillScale = d3
  .scaleLinear()
  .domain(d3.extent(Object.values(aggregated).map((com) => com.sqft)))
  .range(["#a1dab4", "#253494"]);

let xAxis = d3.axisBottom(xScale);
let yAxis = d3.axisLeft(yScale);

svg.selectAll("g").remove();
svg.selectAll("text").remove();

svg
  .append("g")
  .attr("class", "axis")
  .call(xAxis)
  .attr("transform", "translate(0," + (height - 30) + ")");

svg
  .append("g")
  .call(yAxis)
  .attr("class", "axis")
  .attr("transform", "translate(50, 0)");

svg
  .append("text")
  .style("fill", "black")
  .text("Avg. Electricity Use (kbtu)")
  .attr("x", width / 2)
  .attr("y", height - 5)
  .style("text-anchor", "middle");

svg
  .append("text")
  .text("Avg. Natural Gas Use (kbtu)")
  .style("fill", "black")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", 10)
  .style("text-anchor", "middle");

let bind = svg.selectAll(".comm").data(Object.keys(grouped), (d) => d);

bind.exit().remove();

bind
  .enter()
  .append("circle")
  .attr("class", "comm")
  .style("fill-opacity", 0.75)
  .attr("cx", (d) => xScale(aggregated[d].elec))
  .attr("cy", (d) => height - yScale(aggregated[d].gas))
  .attr("r", (d) => radScale(aggregated[d].num))
  .style("stroke", "black")
  .style("fill", (d) => fillScale(aggregated[d].sqft))
  .on("click", function (d) {
    svg
      .select(".selected")
      .style("fill-opacity", 0.75)
      .classed("selected", false);

    d3.select(this).classed("selected", true);

    d3.select(this).style("fill-opacity", 1);

    next(grouped[d]);
  });

svg
  .selectAll(".comm")
  .attr("cy", (d) => height - yScale(aggregated[d].gas))
  .attr("cx", (d) => xScale(aggregated[d].elec))
  .select(".selected")
  .each((d) => {
    next(grouped[d]);
  });
//}
