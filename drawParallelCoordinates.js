//Sources used for D3 help:
//https://syntagmatic.github.io/parallel-coordinates/
//https://bl.ocks.org/jasondavies/1341281
//https://www.d3-graph-gallery.com/graph/parallel_basic.html
//https://www.d3-graph-gallery.com/graph/parallel_custom.html

// Set the dimensions and margins of the SVG
var margin = {top: 20, right: 5, bottom: 5, left: 5},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Creating the svg
var svg = d3.select("#mySVG")
  .attr("width", width + margin.left + margin.right )
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data from a reduced set of the original data. Reducing was done with a python script.
  d3.csv("reducedData.csv").then (function(data) {

  // This extracts the columns that we want
  dimensions = d3.keys(data[0]).filter(function(d) {
    return (["female", "tier", "par_mean", "k_mean"].includes(d));
  })
  console.log(dimensions);

  //This line swaps the dimensionsso that I get the format I desire.
  [dimensions[0], dimensions[1]] = [dimensions[1], dimensions[0]];

  // Building a scale for each dimension that we will use
  var y = {}
  for (i in dimensions) {
    name = dimensions[i]
    y[name] = d3.scaleLinear()
      .domain( d3.extent(data, function(d) { return +d[name] ; }) )
      .range([height, 0])
  }

  // Building the x scale
  x = d3.scalePoint()
    .range([0, width])
    .padding(1)
    .domain(dimensions);

  function path(d) {
      return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
  }

  // Draw the lines
  svg
    .selectAll("myPath")
    .data(data)
    .enter().append("path")
    .attr("d",  path)
    .style("fill", "none")
    .style("stroke", "#e086c7")
    .style("opacity", 0.3)

  // Axis drawing
  svg.selectAll("myAxis")
    .data(dimensions).enter()
    .append("g")
    .attr("transform", function(d) { return "translate(" + x(d) +")"; })
    .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) {
        switch(d) {
          case "tier":
            return "School Tier";
          case "female":
            return "Female to Male Ratio";
          case "par_mean":
            return "Parental Mean Income";
          case "k_mean":
            return "Kid Mean Income";
          default:
            return d;
        }
      })
      .style("fill", "black")
})
