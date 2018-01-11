

/* CONSTANTS */
const WIDTH = 1000;
const HEIGHT = 1000;
let time = Date.now(),
    rotate = [10, -10],
    velocity = [.005, -.001];
/* D3 INFORMATION */

const svg = d3.select("body")
    .append("svg")
    .attr("class", "map")
    .attr("WIDTH", WIDTH)
    .attr("HEIGHT", HEIGHT);

const g = svg.append("g")
    .attr("class", "sphere");

const projection = d3.geoOrthographic()
    .scale(300)
    .center([0, 15]);

const geoPath = d3.geoPath()
    .projection(projection);

g.selectAll("path")
    .data(world_json.features)
    .enter()
    .append("path")
    .attr("fill", "#eee")
    .attr("stroke", "#ccc")
    .attr("d", geoPath);

const earthquakes = svg.append("g");

earthquakes.selectAll("path")
    .data(earthquakes_json.features)
    .enter()
    .append("path")
    .attr("fill", "#eee")
    .attr("stroke", "red")
    .attr("d", geoPath);

const feature = svg.selectAll("path");

d3.timer(function() {
  var dt = Date.now() - time;
  projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
  feature.attr("d", geoPath);
});