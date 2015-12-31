var margin = { top: 50, right: 10, bottom: 30, left: 50 },
    cellSize = 100,
    rows = 3,
    columns = 4,
    height = (cellSize * (rows + 2)) - margin.top - margin.bottom,
    width = (cellSize * (columns + 2)) - margin.left - margin.right;

    colors = ["#D500F9", "#651FFF", "#00B8D4", "#64DD17", "#FFD600", "#FF6D00", "#FF1744"];

var getNodes = function (r, c) {
  var result = []

  for (var i = 0; i < (r * c); i++) {
    var node = {}
    console.log(i);
    node.x = (i % c) * cellSize
    console.log('x', node.x);
    node.y = ((r - (i / c)) * cellSize) + ((r * c)/r)
    console.log('y', node.y);
    result.push(node)
  }
  return result;
}

var nodes = getNodes(rows, columns);
console.log(nodes);

// define marker shapes
var markers = [
  { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' }
  , { id: 1, name: 'square', path: 'M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z', viewbox: '-5 -5 10 10' }
  , { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
  , { id: 3, name: 'stub', path: 'M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z', viewbox: '-1 -5 2 10' }
]

var svg = d3.select("#chart").append("svg") // attach chart to the DOM and center it within an svg element based on margins
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") // an svg "group", similar to an html "div"
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.append("defs").selectAll('marker')
.data(markers)
  .enter().append("marker")
    .attr("id", function(d) { return d.name; }) // define '#circle' or '#arrow' here
    .attr("viewBox", function(d) { return d.viewbox; }) // define viewBox
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("markerWidth", 10)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", function(d) { return d.path; }); // attach marker shape

var llGrid = svg.selectAll(".grid") // make chart with data, data can be a hard coded array or an array of objects brought in through another file
    .data(nodes)
    .enter().append("g")

llGrid.append("circle")
  .attr("cx", function(d) {return d.x})
  // { return (d % columns) * (cellSize); })
  .attr("cy", function(d) {
    // return (Math.floor(d/columns) * cellSize)
    // return ( (((rows - 1) - parseInt(d/columns))) * cellSize)
    return d.y
  })
  .attr("r", cellSize/8)
  .attr("fill", colors[0])
  .attr("class", "node")

llGrid.append('path')
  .attr('d', function(d,i){ console.log('d.x', d.x); console.log('d.y', d.y); return 'M ' + d.x + ',' + d.y + ' L ' + (d.x ) + ',' + (d.y + cellSize) })
  .attr('stroke', 'black')
  .attr('stroke-width', 2)
  // .attr('stroke-linecap', 'round')
  .attr('marker-start', 'url(#circle)')
  .attr('marker-end', 'url(#arrow)')
  // .attr('marker-mid', 'url(hey)')

llGrid.append("text")
    .text(function(d, i) { return i })
    // .attr("x", function(d) { return (d % columns) * (cellSize) })
    .attr("x", function(d) { return d.x })
    .attr("y", function(d) { return d.y })
    // .attr("y", function(d) {
    //   return ((((rows - 1) - parseInt(d/columns))) * cellSize) + (rows * columns)/rows
    // })
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .attr("class", function(d) {
      if (d === 5) {
        return "coreNode"
      }
    })
