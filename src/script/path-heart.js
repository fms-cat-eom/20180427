import MathCat from './libs/mathcat';
const glslify = require( 'glslify' );

// ------

let pathPostfx = ( glCatPath, width, height, auto, step ) => {
  let glCat = glCatPath.glCat;
  let gl = glCat.gl;

  // ------

  let texture = glCat.createTexture();
  glCat.textureFilter( texture, gl.NEAREST );
  
  let image = new Image();
  image.onload = () => {
    glCat.setTexture( texture, image );
    step();
  };
  image.src = 'images/heart.png';

  // ------

  let vboQuad = glCat.createVertexbuffer( [ -1, -1, 1, -1, -1, 1, 1, 1 ] );

  // ------

  glCatPath.add( {
    heart: {
      width: width / 4,
      height: height / 4,
      vert: glslify( './shader/quad.vert' ),
      frag: glslify( './shader/heart.frag' ),
      blend: [ gl.ONE, gl.ONE ],
      clear: [ 0.0, 0.0, 0.0, 0.0 ],
      framebuffer: true,
      float: true,
      init: true,
      func: ( path, params ) => {
        if ( path.init ) {
          glCat.textureFilter( path.framebuffer.texture, gl.NEAREST );
          path.init = false;
        }

        glCat.attribute( "p", vboQuad, 2 );

        glCat.uniform1f( "hidden", auto( "heart/hidden" ) );
        glCat.uniform1f( "glitch", auto( "heart/glitch" ) );

        glCat.uniformTexture( "samplerInput", params.input, 0 );
        glCat.uniformTexture( "samplerHeart", texture, 1 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
      }
    },
  } );
};

module.exports = pathPostfx;