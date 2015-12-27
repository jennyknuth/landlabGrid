var margin = { top: 50, right: 10, bottom: 30, left: 50 },
    cellSize = 100,
    rows = 3,
    columns = 4,
    height = (cellSize * rows) - margin.top - margin.bottom,
    width = (cellSize * columns) - margin.left - margin.right;

    colors = ["#D500F9", "#651FFF", "#00B8D4", "#64DD17", "#FFD600", "#FF6D00", "#FF1744"];

var getNodes = function (rows, columns) {
  var nodes = []

  for (var i = 0; i < (rows * columns); i++) {
    nodes.push(i)
  }
  console.log('nodes', nodes);
  return nodes;
}

var nodes = getNodes(rows, columns);
  // var markers = [
  //   { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' }
  //   , { id: 1, name: 'square', path: 'M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z', viewbox: '-5 -5 10 10' }
  //   , { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
  //   , { id: 3, name: 'stub', path: 'M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z', viewbox: '-1 -5 2 10' }
  // ]

var svg = d3.select("#chart").append("svg") // attach chart to the DOM and center it within an svg element based on margins
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") // an svg "group", similar to an html "div"
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var llGrid = svg.selectAll(".grid") // make chart with data, data can be a hard coded array or an array of objects brought in through another file
    .data(nodes)
    .enter().append("g")

var paths = svg.append('g')
  .attr('id', 'markers')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.append("defs").selectAll('marker')
.data(['circle', 'arrow'])
  .enter().append("marker")
    .attr("id", function(d) { console.log(d); return d; }) // define 'circle' or 'arrow' here
    .attr("viewBox", "0 -6 14 12")
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("markerWidth", 14)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5 L14,0 L0,5"); // make this a function with and check for circle or arrow! Or a function that maps to object with correct attributes
  // .data(markers)
  // .enter()
  // .append('marker')
  //   .attr('id', function(d){ return 'marker_' + d.name})
  //   // .attr('markerHeight', 4)
  //   // .attr('markerWidth', 4)
  //   // .attr('markerUnits', 'strokeWidth')
  //   .attr('orient', 'auto')
  //   // .attr('refX', 0)
  //   // .attr('refY', 0)
  //   .attr('viewBox', function(d){ return d.viewbox })
  //   .append('path')
  //     .attr('d', function(d){ return d.path })
  //     .attr('fill', 'brown');

llGrid.append("circle")
  .attr("cx", function(d) { return (d % columns) * (cellSize); })
  .attr("cy", function(d) {
    // return (Math.floor(d/columns) * cellSize)
    return ( (((rows - 1) - parseInt(d/columns))) * cellSize)
  })
  .attr("r", cellSize/8)
  .attr("fill", colors[0])
  .attr("class", "node")

llGrid.append('path')
  .attr('d', function(d,i){ console.log(d); return 'M 0,' + (i * cellSize) + ' L ' + (cellSize) + ',' + (i * cellSize) + '' })
  .attr('stroke', 'black')
  .attr('stroke-width', 3)
  // .attr('stroke-linecap', 'round')
  // .attr('marker-start', 'url(#circle)')
  .attr('marker-end', function(d,i){ return 'url(#arrow)' })
  .attr('marker-mid', function(d, i ) { return i})



// var path = paths.selectAll('path')
//   .data(nodes)
//   .enter()
//   .append('path')
//     .attr('d', function(d,i){ return 'M 0,' + (i * cellSize) + ' L ' + (cellSize) + ',' + (i * cellSize) + '' })
//     .attr('stroke', 'brown')
//     .attr('stroke-width', 3)
//     // .attr('stroke-linecap', 'round')
//     .attr('marker-start', function(d,i){ return 'url(#circle)' })
//     .attr('marker-end', function(d,i){ return 'url(#arrow)' })

llGrid.append("text")
    .text(function(d) { return d })
    .attr("x", function(d) { return (d % columns) * (cellSize) })
    .attr("y", function(d) {
      return ((((rows - 1) - parseInt(d/columns))) * cellSize) + (rows * columns)/rows
    })
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .attr("class", function(d) {
      if (d === 5) {
        return "coreNode"
      }
    })
