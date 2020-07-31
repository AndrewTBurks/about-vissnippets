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
