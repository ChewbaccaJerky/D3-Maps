let apiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
let features;
fetch(apiUrl).then(function(data){
    data.json().then(function(eq){
        console.log(eq);
        initialize(eq);
    });
});
