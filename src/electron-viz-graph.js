// three colored circles with SVG rendering, a simple demo of itemflow's transition features

function electron_viz_graph() {

  var width  = 50 ;
  var height = 50 ;

  var viz = $Z.helper.viz.setup({
    width: width,
    height: height,
    fadeDuration: document.dur,
    collision_detect: function() {}, // turn off collision detection for this game, improving performance          
  }) ;

  document.body.removeChild(viz.screenCanvas) ;
 
  document.viz = viz ;

  document.svgns  = "http://www.w3.org/2000/svg" ;
  
  viz.svg = document.createElementNS(document.svgns, 'svg') ;

  viz.svg.setAttribute( 'viewBox', '0 0 ' + 2 * width + ' ' + 2 * height) ;
  document.body.appendChild(viz.svg) ;

  viz.g = document.createElementNS(document.svgns, 'g') ;
  viz.g.setAttribute('transform', 'translate(' + width + ',' + height + ')' ) ;

  viz.svg.appendChild(viz.g) ;

  document.random_color = function random_color() {

    var r = Math.round( 255 * Math.random() ).toString( 16 ) ;
    var g = Math.round( 255 * Math.random() ).toString( 16 ) ;
    var b = Math.round( 255 * Math.random() ).toString( 16 ) ;

    // make sure they are the right length
    if ( r.length === 1 ) r += r ;
    if ( g.length === 1 ) g += g ;
    if ( b.length === 1 ) b += b ;

    return '#' + r + g + b ;
  }

  var red   = '#993333' ;
  var green = '#339933' ;
  var blue  = '#333399' ;

  var data = [ // array of objects defining the nodes of the graph
    { x: -10, y:   0, radius: 2, color: red,   color0: red   },
    { x:  10, y:   0, radius: 2, color: green, color0: green },
    { x:   0, y: -10, radius: 2, color: blue,  color0: blue  }
  ] ;

  data.forEach(function (d) {
    d.node = nodeModule.setup(viz, d) ;
  }) ;

  viz.run() ;
  
}