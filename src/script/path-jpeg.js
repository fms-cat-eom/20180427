import MathCat from './libs/mathcat';
const glslify = require( 'glslify' );

// ------

module.exports = ( glCatPath, width, height, auto ) => {
  let glCat = glCatPath.glCat;
  let gl = glCat.gl;

  // ------

  let vboQuad = glCat.createVertexbuffer( [ -1, -1, 1, -1, -1, 1, 1, 1 ] );

  // ------

  glCatPath.add( {
    jpegCosine: {
      width: width,
      height: height,
      vert: glslify( './shader/quad.vert' ),
      frag: glslify( './shader/jpeg-cosine.frag' ),
      blend: [ gl.ONE, gl.ONE ],
      clear: [ 0.0, 0.0, 0.0, 0.0 ],
      framebuffer: true,
      float: true,
      tempFb: glCat.createFloatFramebuffer( width, height ),
      func: ( path, params ) => {
        glCat.attribute( "p", vboQuad, 2 );
        glCat.uniform1i( "blockSize", parseInt( auto( 'jpeg/blockSize' ) ) );

        glCat.uniform1f( "quantize", auto( "jpeg/quantize" ) );
        glCat.uniform1f( "quantizeF", auto( "jpeg/quantizeF" ) );
        glCat.uniform1f( "highFreqMultiplier", 0.0 );
        
        gl.bindFramebuffer( gl.FRAMEBUFFER, path.tempFb.framebuffer );
        glCat.clear( ...path.clear );
        glCat.uniform1i( "isVert", false );
        glCat.uniformTexture( "sampler0", params.input, 0 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
        
        gl.bindFramebuffer( gl.FRAMEBUFFER, params.framebuffer );
        glCat.uniform1i( "isVert", true );
        glCat.uniformTexture( "sampler0", path.tempFb.texture, 0 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
      }
    },

    jpegRender: {
      width: width,
      height: height,
      vert: glslify( './shader/quad.vert' ),
      frag: glslify( './shader/jpeg-render.frag' ),
      blend: [ gl.ONE, gl.ONE ],
      clear: [ 0.0, 0.0, 0.0, 0.0 ],
      framebuffer: true,
      float: true,
      tempFb: glCat.createFloatFramebuffer( width, height ),
      func: ( path, params ) => {
        glCat.attribute( "p", vboQuad, 2 );
        glCat.uniform1i( "blockSize", parseInt( auto( 'jpeg/blockSize' ) ) );

        gl.bindFramebuffer( gl.FRAMEBUFFER, path.tempFb.framebuffer );
        glCat.clear( ...path.clear );
        glCat.uniform1i( "isVert", false );
        glCat.uniformTexture( "sampler0", params.input, 0 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
        
        gl.bindFramebuffer( gl.FRAMEBUFFER, params.framebuffer );
        glCat.uniform1i( "isVert", true );
        glCat.uniformTexture( "sampler0", path.tempFb.texture, 0 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
      }
    },
  } );
};