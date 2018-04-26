import xorshift from './libs/xorshift';
import Tweak from './libs/tweak';
import GLCat from './libs/glcat';
import GLCatPath from './libs/glcat-path-gui';
import MathCat from './libs/mathcat';
const step = require( './libs/step' );
const CanvasSaver = require( './libs/canvas-saver' );

const glslify = require( 'glslify' );

// ------

xorshift( 326789157890 );

// ------

let width = canvas.width = 256;
let height = canvas.height = 256;

// ------

let canvasSaver = new CanvasSaver( canvas );

// ------

let gl = canvas.getContext( 'webgl' );
gl.lineWidth( 1 );

let glCat = new GLCat( gl );

glCat.getExtension( 'OES_texture_float', true );
glCat.getExtension( 'OES_texture_float_linear', true );
glCat.getExtension( 'EXT_frag_depth', true );
glCat.getExtension( 'ANGLE_instanced_arrays', true );

let glCatPath = new GLCatPath( glCat, {
  el: divPath,
  canvas: canvas,
  stretch: true
} );

// ------

let tweak = new Tweak( divTweak );

// ------

let totalFrame = 0;
let init = false;

let automaton = new Automaton( {
  gui: divAutomaton,
  fps: 60,
  loop: true,
  data: `
  {"v":"1.2.0","length":3,"resolution":1000,"params":{"motion/phase":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.40102150537634407,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":3,"value":1.2709475617696733,"mode":4,"params":{"rate":300,"damp":1},"mods":[false,false,false,false]}],"jpeg/blockSize":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.9354838709677421,"value":8,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.075268817204301,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.3333333333333333,"value":3.574904533779297,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.605557432795699,"value":16,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.7311827956989247,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.8175755711291663,"value":64,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":2.0129443790322576,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":2.539893169354838,"value":2.4711940316497625,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":2.999,"value":35.84285482862538,"mode":5,"params":{"gravity":210.26,"bounce":0.3},"mods":[false,false,false,false]},{"time":3,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]}],"jpeg/quantize":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":2.290322580645161,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":2.7419354838709684,"value":0.8105641237820258,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":3,"value":2.70489863419606,"mode":1,"params":{},"mods":[false,false,false,false]}],"jpeg/quantizeF":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.9907432983870966,"value":0.1995433924474792,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.1075939516129032,"value":0.04421563269793194,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.3118279569892475,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.3584229390681006,"value":0.18357487922705312,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.4265232974910396,"value":-0.004830917874396101,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.5053763440860215,"value":0.019323671497584516,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.6415770609318998,"value":0.11118612114668536,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.7916258870967736,"value":0.2049424168262012,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.9744340887096778,"value":0,"mode":4,"params":{"rate":1600,"damp":1},"mods":[{"velocity":0},false,false,false]},{"time":3,"value":0,"mode":1,"params":{},"mods":[{"velocity":0},false,false,false]}],"heart/hidden":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":2.591397849462366,"value":-0.0695216975588373,"mode":4,"params":{"rate":300,"damp":1},"mods":[false,false,false,false]},{"time":2.881720430107527,"value":1,"mode":1,"params":{},"mods":[false,{"freq":5,"amp":1,"phase":0},false,{"freq":9.48}]},{"time":3,"value":1,"mode":0,"params":{},"mods":[{"velocity":0},false,false,false]}],"heart/glitch":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.3980769230769231,"value":1.0250441459952837,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.675,"value":0,"mode":4,"params":{"rate":500,"damp":1},"mods":[{"velocity":0},false,false,false]},{"time":1.5634615384615387,"value":0.06607944551153389,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1.748076923076923,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":2.0250000000000004,"value":0.01,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":3,"value":0.8809094341653051,"mode":5,"params":{"gravity":1.5,"bounce":0.3},"mods":[false,false,false,false]}]},"gui":{"snap":{"enable":false,"bpm":120,"offset":0}}}
  `
} );
let auto = automaton.auto;

// ------

let cameraPos = [ 0.0, 0.0, 10.0 ];
let cameraTar = [ 0.0, 0.0, 0.0 ];
let cameraRoll = 0.0;
let cameraFov = 70.0;

let cameraNear = 0.1;
let cameraFar = 100.0;

let lightPos = [ 10.0, 8.0, 10.0 ];

let matP;
let matV;
let matPL;
let matVL;

let updateMatrices = () => {
  cameraPos[ 0 ] = 0.0;
  cameraPos[ 1 ] = 0.0;
  cameraPos[ 2 ] = 8.0;

  matP = MathCat.mat4Perspective( cameraFov, cameraNear, cameraFar );
  matV = MathCat.mat4LookAt( cameraPos, cameraTar, [ 0.0, 1.0, 0.0 ], cameraRoll );

  matPL = MathCat.mat4Perspective( cameraFov, cameraNear, cameraFar );
  matVL = MathCat.mat4LookAt( lightPos, cameraTar, [ 0.0, 1.0, 0.0 ], 0.0 );
};
updateMatrices();

// ------

let mouseX = 0.0;
let mouseY = 0.0;

canvas.addEventListener( 'mousemove', ( event ) => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
} );

// ------

let vboQuad = glCat.createVertexbuffer( [ -1, -1, 1, -1, -1, 1, 1, 1 ] );

// ------

let bgColor = [ 0.02, 0.02, 0.02, 1.0 ];

// ------

let fbPreBloom2 = glCat.createFloatFramebuffer( width / 2, height / 2 );
let fbPreBloom4 = glCat.createFloatFramebuffer( width / 4, height / 4 );

// ------

glCatPath.setGlobalFunc( () => {
  glCat.uniform1i( 'init', init );
  glCat.uniform1f( 'time', automaton.time );
  glCat.uniform1f( 'progress', automaton.progress );
  glCat.uniform1f( 'automatonLength', automaton.data.length );
  glCat.uniform1f( 'deltaTime', automaton.deltaTime );

  glCat.uniform1f( 'totalFrame', totalFrame );
  glCat.uniform2fv( 'mouse', [ mouseX, mouseY ] );

  glCat.uniform3fv( 'cameraPos', cameraPos );
  glCat.uniform3fv( 'cameraTar', cameraTar );
  glCat.uniform1f( 'cameraRoll', cameraRoll );
  glCat.uniform1f( 'cameraFov', cameraFov );
  glCat.uniform1f( 'cameraNear', cameraNear );
  glCat.uniform1f( 'cameraFar', cameraFar );
  glCat.uniform3fv( 'lightPos', lightPos );

  glCat.uniformMatrix4fv( 'matP', matP );
  glCat.uniformMatrix4fv( 'matV', matV );
  glCat.uniformMatrix4fv( 'matPL', matPL );
  glCat.uniformMatrix4fv( 'matVL', matVL );
  glCat.uniform4fv( 'bgColor', bgColor );
} );

glCatPath.add( {
  return: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/return.frag' ),
    blend: [ gl.ONE, gl.ZERO ],
    clear: [ 0.0, 0.0, 0.0, 1.0 ],
    func: ( path, params ) => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'sampler0', params.input, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },

  inspector: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/inspector.frag' ),
    blend: [ gl.ONE, gl.ZERO ],
    clear: [ 0.0, 0.0, 0.0, 1.0 ],
    func: ( path, params ) => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform3fv( 'circleColor', [ 1.0, 1.0, 1.0 ] );
      glCat.uniformTexture( 'sampler0', params.input, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },

  'target': {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/bg.frag' ),
    blend: [ gl.ONE, gl.ZERO ],
    clear: [ 0.0, 0.0, 0.0, 1.0 ],
    framebuffer: true,
    float: true,
    depthWrite: false,
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
} );

// ------

let updateUI = () => {
  let now = new Date();
  let deadline = new Date( 2018, 3, 27, 0, 0 );

  divCountdown.innerText = 'Deadline: ' + Math.floor( ( deadline - now ) / 1000 );
};

// ------

let update = () => {
  if ( !tweak.checkbox( 'play', { value: true } ) ) {
    setTimeout( update, 100 );
    return;
  }

  automaton.update();

  updateUI();
  updateMatrices();

  // ------

  glCatPath.begin();

  glCatPath.render( 'target' );

  glCatPath.render( 'motion', {
    target: glCatPath.fb( 'target' ),
  } );

  glCatPath.render( 'jpegCosine', {
    input: glCatPath.fb( 'target' ).texture,
  } );

  glCatPath.render( 'jpegRender', {
    input: glCatPath.fb( 'jpegCosine' ).texture,
  } );

  glCatPath.render( 'heart', {
    input: glCatPath.fb( 'jpegRender' ).texture,
  } );

  glCatPath.render( 'post', {
    target: GLCatPath.nullFb,
    input: glCatPath.fb( 'heart' ).texture,
    width: width,
    height: height,
  } );

  glCatPath.end();

  init = false;
  totalFrame ++;

  // ------

  if ( tweak.checkbox( 'save', { value: false } ) ) {
    canvasSaver.add( totalFrame );
  }

  if ( tweak.button( 'download' ) ) {
    canvasSaver.download();
  }

  requestAnimationFrame( update );
}


step( {
  0: ( step ) => {
    require( './path-heart' )( glCatPath, width, height, auto, step );
    require( './path-jpeg' )( glCatPath, width, height, auto );
    require( './path-motion' )( glCatPath, width, height, auto );
    require( './path-postfx' )( glCatPath, width, height );
  },

  1: ( step ) => {
    update();
  }
} );

// ------

window.addEventListener( 'keydown', ( _e ) => {
  if ( _e.which === 27 ) {
    tweak.checkbox( 'play', { set: false } );
  }
} );
