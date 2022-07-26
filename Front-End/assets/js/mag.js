 // set the dimensions and margins of the graph
 const margin = {top: 20, right: 20, bottom: 40, left: 40},
 width = 460 - margin.left - margin.right,
 height = 400 - margin.top - margin.bottom;

 // append the svg object to the body of the page
 const svg = d3.select("#stiChart")
   .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
   .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);
 
 // Parse the Data
 d3.json("http://127.0.0.1:5000/").then(function(data){
     console.log(data)
    
 });