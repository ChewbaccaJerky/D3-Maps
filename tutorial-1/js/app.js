const width = 700;
const height = 580;

console.log(d3);
// Wait for all dom elements to be loaded
document.addEventListener('DOMContentLoaded', function(){
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g");
});