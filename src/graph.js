var d3 = require("d3");
import { select } from 'd3-selection';

var barHeight = 25;
var data = [{"name": "Dustin", "value": 6},{"name": "Fred", "value": 5}];
var margin = ({});
margin.top = 30;
margin.right = 0;
margin.bottom = 10;
margin.left = 30;

var width = 50;
var height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;

var x = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([margin.left, width - margin.right]);

var y = d3.scaleBand()
  .domain(d3.range(data.length))
  .rangeRound([margin.top, height - margin.bottom])
  .padding(0.1);

var format = x.tickFormat(20, data.format);

var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0));

var xAxis = g => g
  .attr("transform", `translate(0,${margin.top})`)
  .call(d3.axisTop(x).ticks(width / 80, data.format))
  .call(g => g.select(".domain").remove());

const graph = (node) => {

  select(node)
      .append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth());

  select(node)
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("x", d => x(d.value))
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => format(d.value))
    .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));

  select(node)
      .append("g")
      .call(xAxis);

  select(node)
      .append("g")
      .call(yAxis);
}

export default graph;