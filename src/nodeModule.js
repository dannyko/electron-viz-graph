var nodeModule = {

  setup: function node_setup( viz, d ) {

    var node = viz.setup_item({ 
      render: nodeModule.render,
      x: d.x,
      y: d.y,
    }) ; // function that tells the visulization engine how to render the items for each frame of the visualization

    node.radius       = d.radius ;
    node.color        = d.color ;
    node.config.color = d.color0 ;
    
    node.svg         = document.createElementNS(document.svgns, 'circle') ; // the visual element or item associated with this d
    node.svg.onclick = nodeModule.click ;
    node.svg.viz     = viz ; 
    node.svg.d       = node ;

    viz.g.appendChild(node.svg) ;

  },

  render: function node_render( circ ) {
    if ( circ === undefined ) circ = this ;
    // console.log('node render', 'circ', circ, 'circ.viz', circ.viz) ;
    circ.svg.setAttribute( 'cx',   circ.x      ) ;
    circ.svg.setAttribute( 'cy',   circ.y      ) ;
    circ.svg.setAttribute( 'fill', circ.color  ) ;
    circ.svg.setAttribute( 'r',    circ.radius ) ;
  },

  click: function node_click( event, circ ) {

    if ( circ === undefined) circ = this ;

    // console.log('node click', 'circ', circ, 'circ.viz', circ.viz) ;
    
    var tx   = nodeModule.transition.x ( circ.viz.config.width  * (Math.random() - 0.5) ) ; // x transition object
    var ty   = nodeModule.transition.y ( circ.viz.config.height * (Math.random() - 0.5) ) ; // y transition object
    var tr   = nodeModule.transition.r ( 1 + (4 * Math.random())        ) ; // radius transition object
    var tc   = nodeModule.transition.c ( document.random_color()                 ) ; // transient color transition object
    var tc2  = nodeModule.transition.c ( circ.d.config.color              ) ; // final color transition object (return back to starting color)

    tc.child = tc2 ; // ** example of the itemflow transition-chaining syntax

    // console.log('click', 'this', this) ;

    circ.d.add_transition([tx, ty, tr, tc]) ; // set the transitions for this item, also cancels all existing transitions for this item (side-effect)

  },

  transition: {
    x: $Z.helper.transition.linear_transition_func ( 'x',      document.dur ), // function accepting an x end-value and returning a transition object
    y: $Z.helper.transition.linear_transition_func ( 'y',      document.dur ), // function accepting a y end-value and returning a transition object
    r: $Z.helper.transition.linear_transition_func ( 'radius', document.dur ), // function accepting a y end-value and returning a transition object
    c: $Z.helper.transition.color_transition_func  ( 'color',  document.dur ), // function accepting a color end-value and returning a transition object
  },

} ;