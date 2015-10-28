var margin = { top: 50, right: 10, bottom: 30, left: 50 },
    cellSize = 100,
    rows = 3,
    columns = 4,
    height = (cellSize * rows) - margin.top - margin.bottom,
    width = (cellSize * columns) - margin.left - margin.right;

    // days = ["M", "T", "W", "T", "F"],
    // weeks = ["", "J", "", "", "", "F", "", "", "", "M", "", "", "", "", "A", "", "", "", "M", "", "", "", "J", "", "", "", "", "J", "", "", "", "A", "", "", "", "S", "", "", "", "", "O", "", "", "", "N", "", "", "", "D", "", "", "", "" ],
    // values = ['hike', 'bike', 'swim', 'run', 'stretch', 'climb', 'lift'],
    colors = ["#D500F9", "#651FFF", "#00B8D4", "#64DD17", "#FFD600", "#FF6D00", "#FF1744"];
    var getNodes = function (rows, columns) {
      var nodes = []

      for (var i = 0; i < (rows * columns); i++) {
        nodes.push(i)
      }
      return nodes;
    }

    var nodes = getNodes(rows, columns);


var svg = d3.select("#chart").append("svg") // attach chart to the DOM and center it within an svg element based on margins
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") // an svg "group", similar to an html "div"
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var llGrid = svg.selectAll(".grid") // make heatMap with data, data can be a hard coded array or an array of objects brought in through another file
    .data(nodes)
    .enter().append("g")

    llGrid.append("circle")
      .attr("cx", function(d) { return (d % columns) * (cellSize); })
      .attr("cy", function(d) {
        return (Math.floor(d/columns)) * (cellSize);
      })
      .attr("r", cellSize/8)
      .attr("fill", colors[0])
      .attr("class", "node")

    llGrid.append("text")
        .text(function(d) { console.log(d);return d})
        .attr("x", function(d) { return (d % columns) * (cellSize) })
        .attr("y", function(d) { return (Math.floor(d/columns) * (cellSize)) + 12/3})
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
