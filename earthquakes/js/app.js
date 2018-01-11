

/* CONSTANTS */
const WIDTH = 500;
const HEIGHT = 500;
let time = Date.now(),
    rotate = [10, -10],
    velocity = [.001, -.0001];
/* D3 INFORMATION */

const svg = d3.select("body")
    .append("svg")
    .attr("class", "map")
    .attr("WIDTH", WIDTH)
    .attr("HEIGHT", HEIGHT);

const g = svg.append("g");

const projection = d3.geoOrthographic()
    .scale(250)
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
    .attr("stroke", "purple")
    .attr("d", geoPath)
    .on("mouseover", function(d){
        // d3.select(this).attr("r", 100);
    })
    .on("mouseout", function(d){
        // console.log(d);
    });

const feature = svg.selectAll("path");

d3.timer(function() {
  var dt = Date.now() - time;
  projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
  feature.attr("d", geoPath);
});