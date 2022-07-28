var fullData = {};

$.get("http://127.0.0.1:5000", function (data) {
  countryOption = "";
  yearOption = "";
  yearArray = [];
  Object.keys(data).forEach(function (key) {
    countryOption += "<option value='" + key + "'>" + key + "</option>";
    Object.keys(data[key]).forEach(function (key2) {
      if (!yearArray.includes(key2)) {
        yearArray.push(key2);
        yearOption += "<option value='" + key2 + "'>" + key2 + "</option>";
      }
    });
  });

  fullData = data;
  document.getElementById("yearSelect").innerHTML = yearOption;
  document.getElementById("countrySelect").innerHTML = countryOption;
  document.getElementById("yearSelect2").innerHTML = yearOption;
  document.getElementById("countrySelect2").innerHTML = countryOption;

  loadGraph1(
    document.getElementById("yearSelect").value,
    document.getElementById("countrySelect").value
  );

  loadGraph2(
    document.getElementById("yearSelect2").value,
    document.getElementById("countrySelect2").value
  );
});

function selectChanged1() {
  year = document.getElementById("yearSelect").value;
  country = document.getElementById("countrySelect").value;
  loadGraph1(year, country);
}

function selectChanged2() {
  loadGraph2(
    document.getElementById("yearSelect2").value,
    document.getElementById("countrySelect2").value
  );
}

function loadGraph1(year, country) {
  $("#firstChart").empty();
  var margin = { top: 40, right: 100, bottom: 30, left: 100 },
    width = 700 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  var svg = d3
    .select("#firstChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var q1Stringency = fullData[country][year]["Q1"]["stringencyAvg"];
  var q2Stringency = fullData[country][year]["Q2"]["stringencyAvg"];
  var q3Stringency = fullData[country][year]["Q3"]["stringencyAvg"];
  var q4Stringency = fullData[country][year]["Q4"]["stringencyAvg"];

  var maxStringency = 0;
  if (q1Stringency > maxStringency) {
    maxStringency = q1Stringency;
  }
  if (q2Stringency > maxStringency) {
    maxStringency = q2Stringency;
  }
  if (q3Stringency > maxStringency) {
    maxStringency = q3Stringency;
  }
  if (q4Stringency > maxStringency) {
    maxStringency = q4Stringency;
  }

  var q1Covid = fullData[country][year]["Q1"]["covidCases"];
  var q2Covid = fullData[country][year]["Q2"]["covidCases"];
  var q3Covid = fullData[country][year]["Q3"]["covidCases"];
  var q4Covid = fullData[country][year]["Q4"]["covidCases"];

  var maxCovid = 0;
  if (q1Covid > maxCovid) {
    maxCovid = q1Covid;
  }
  if (q2Covid > maxCovid) {
    maxCovid = q2Covid;
  }
  if (q3Covid > maxCovid) {
    maxCovid = q3Covid;
  }
  if (q4Covid > maxCovid) {
    maxCovid = q4Covid;
  }

  var xScale = d3.scaleBand().range([0, width]).padding(0.5);
  var y0 = d3.scaleLinear().domain([0, maxCovid]).range([height, 0]);
  var y1 = d3.scaleLinear().domain([0, maxStringency]).range([height, 0]);
  xScale.domain(["Q1", "Q2", "Q3", "Q4"]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3.axisBottom(xScale).tickFormat(function (d) {
        return d;
      })
    );
  svg.append("g").call(d3.axisLeft(y0));
  svg
    .append("g")
    .attr("transform", "translate(" + width + ",0)")
    .call(d3.axisRight(y1));

  lineData = [];
  lineData[0] = { quarter: "Q1", value: q1Stringency };
  lineData[1] = { quarter: "Q2", value: q2Stringency };
  lineData[2] = { quarter: "Q3", value: q3Stringency };
  lineData[3] = { quarter: "Q4", value: q4Stringency };

  barData = [];
  barData[0] = { quarter: "Q1", value: q1Covid };
  barData[1] = { quarter: "Q2", value: q2Covid };
  barData[2] = { quarter: "Q3", value: q3Covid };
  barData[3] = { quarter: "Q4", value: q4Covid };

  svg
    .selectAll(".bar")
    .data(barData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return xScale(d.quarter);
    })
    .attr("y", function (d) {
      return y0(d.value);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - y0(d.value);
    });

  svg
    .append("path")
    .datum(lineData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return xScale(d.quarter);
        })
        .y(function (d) {
          return y1(d.value);
        })
    );

  svg.append("text")
    .attr("x", width/2)
    .attr("y1", width/2)
    .attr("y2", width)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Effect of Stringency Index on COVID-19 Cases");
  
  svg.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height+30) + ")")
    .style("text-anchor", "middle")
    .text("Quarter per year");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2))
    .attr("dy", -70)
    .style("text-anchor", "middle")
    .text("Avg of COVID-19 Cases");
  
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2))
    .attr("dy", 540)
    .style("text-anchor", "middle")
    .text("Strigency Index (STI)");
}

function loadGraph2(year, country) {
  $("#secondChart").empty();
  var margin = { top: 40, right: 130, bottom: 30, left: 90 },
    width = 700 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  var svg = d3
    .select("#secondChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var q1Stringency = fullData[country][year]["Q1"]["stringencyAvg"];
  var q2Stringency = fullData[country][year]["Q2"]["stringencyAvg"];
  var q3Stringency = fullData[country][year]["Q3"]["stringencyAvg"];
  var q4Stringency = fullData[country][year]["Q4"]["stringencyAvg"];

  var maxStringency = 0;
  if (q1Stringency > maxStringency) {
    maxStringency = q1Stringency;
  }
  if (q2Stringency > maxStringency) {
    maxStringency = q2Stringency;
  }
  if (q3Stringency > maxStringency) {
    maxStringency = q3Stringency;
  }
  if (q4Stringency > maxStringency) {
    maxStringency = q4Stringency;
  }

  var q1Death = fullData[country][year]["Q1"]["death"];
  var q2Death = fullData[country][year]["Q2"]["death"];
  var q3Death = fullData[country][year]["Q3"]["death"];
  var q4Death = fullData[country][year]["Q4"]["death"];

  var maxDeath = 0;
  if (q1Death > maxDeath) {
    maxDeath = q1Death;
  }
  if (q2Death > maxDeath) {
    maxDeath = q2Death;
  }
  if (q3Death > maxDeath) {
    maxDeath = q3Death;
  }
  if (q4Death > maxDeath) {
    maxDeath = q4Death;
  }

  var xScale = d3.scaleBand().range([0, width]).padding(0.5);
  var y0 = d3.scaleLinear().domain([0, maxDeath]).range([height, 0]);
  var y1 = d3.scaleLinear().domain([0, maxStringency]).range([height, 0]);
  xScale.domain(["Q1", "Q2", "Q3", "Q4"]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3.axisBottom(xScale).tickFormat(function (d) {
        return d;
      })
    );
  svg.append("g").call(d3.axisLeft(y0));
  svg
    .append("g")
    .attr("transform", "translate(" + width + ",0)")
    .text("Number of Covid Deaths")
    .call(d3.axisRight(y1));

  lineData = [];
  lineData[0] = { quarter: "Q1", value: q1Stringency };
  lineData[1] = { quarter: "Q2", value: q2Stringency };
  lineData[2] = { quarter: "Q3", value: q3Stringency };
  lineData[3] = { quarter: "Q4", value: q4Stringency };

  barData = [];
  barData[0] = { quarter: "Q1", value: q1Death };
  barData[1] = { quarter: "Q2", value: q2Death };
  barData[2] = { quarter: "Q3", value: q3Death };
  barData[3] = { quarter: "Q4", value: q4Death };

  svg
    .selectAll(".bar")
    .data(barData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return xScale(d.quarter);
    })
    .attr("y", function (d) {
      return y0(d.value);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - y0(d.value);
    });

  svg
    .append("path")
    .datum(lineData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return xScale(d.quarter);
        })
        .y(function (d) {
          return y1(d.value);
        })
    );
  
  svg.append("text")
    .attr("x", width/2)
    .attr("y1", width/2)
    .attr("y2", width)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Effect of Stringency Index on Death Rates");
  
  svg.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height+30) + ")")
    .style("text-anchor", "middle")
    .text("Quarter per year");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2))
    .attr("dy", -70)
    .style("text-anchor", "middle")
    .text("Avg Deaths");
  
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2))
    .attr("dy", 520)
    .style("text-anchor", "middle")
    .text("Strigency Index (STI)");
 
}
