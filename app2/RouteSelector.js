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
