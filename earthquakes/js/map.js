/* CONSTANTS */
const WIDTH = innerWidth;
const HEIGHT = innerHeight;
let time = Date.now(),
    rotate = [
        10, -10
    ],
    velocity = [.01, -.0001];
/* D3 INFORMATION */



const svg = d3
    .select(".container")
    .append("svg")
    .attr("class", "map")
    .attr("width", WIDTH/2)
    .attr("height", HEIGHT * .8);

const g = svg.append("g");

const projection = d3
    .geoOrthographic()
    .scale(275)
    .center([20, 20]);

// d3.select("body")
//     .on("resize", function(){
//         d3.select("svg")
//             .attr("width", WIDTH/2)
//             .attr("height", HEIGHT * .8);
//     });

const geoPath = d3
    .geoPath()
    .projection(projection);

g.selectAll("path")
    .data(world_json.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", geoPath);

const earthquakes = svg.append("g");

earthquakes
    .selectAll("path")
    .data(earthquakes_json.features)
    .enter()
    .append("path")
    .attr("class", "point")
    .attr("d", geoPath)
    // .transition(400)
    .on("mouseover", function(d){
        const date = new Date();
        const cur_time = date.toUTCString(d.properties.time);
        d3.select(this)
            .attr("class", "hover");
        d3.select(".chart ul")
            .append("li")
            .attr("class", "chart-item")
            .html(function(){
                return "<h4>" +  
                            d.properties.place + 
                                "<br> <span> Mag: " + d.properties.mag + "</span>" + 
                                "<br>" + cur_time + 
                        "</h4>";
                
            });
        console.log(d);
    })
    .on("mouseout", function(d){
        d3.select(this)
            .attr("class", "point");
    });

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