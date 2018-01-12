/* CONSTANTS */
const WIDTH = 500;
const HEIGHT = 500;
let time = Date.now(),
    rotate = [
        10, -10
    ],
    velocity = [.01, -.0001];
/* D3 INFORMATION */

const svg = d3
    .select("body")
    .append("svg")
    .attr("class", "map");

const g = svg.append("g");

const projection = d3
    .geoOrthographic()
    .scale(250)
    .center([30, 10]);

const geoPath = d3
    .geoPath()
    .projection(projection);

g
    .selectAll("path")
    .data(world_json.features)
    .enter()
    .append("path")
    .attr("fill", "#000")
    .attr("stroke", "#fff")
    .attr("d", geoPath);

const earthquakes = svg.append("g");

earthquakes
    .selectAll("path")
    .data(earthquakes_json.features)
    .enter()
    .append("path")
    .attr("class", "point")
    .attr("d", geoPath);

/* Mouse controlled interactions */

// var λ = d3.scaleLinear()     .domain([0, WIDTH])     .range([-180, 180]); var
// φ = d3.scaleLinear()     .domain([0, HEIGHT])     .range([90, -90]);
// svg.on("mousemove", function(d){     let p = d3.mouse(this);
// projection.rotate([λ(p[0]), φ(p[1])]);     svg.selectAll("path").attr("d",
// geoPath); });

/* Automatic rotation */

const feature = svg.selectAll("path");

d3.timer(function () {
    var dt = Date.now() - time;
    projection.rotate([
        rotate[0] + velocity[0] * dt,
        rotate[1] + velocity[1] * dt
    ]);
    feature.attr("d", geoPath);
});