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
