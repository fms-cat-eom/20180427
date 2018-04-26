#define HEART_RESO vec2( 16.0 )

#define TAU 6.283185307

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform float hidden;
uniform float glitch;
uniform sampler2D samplerInput;
uniform sampler2D samplerHeart;

float dither( vec2 pix ) {
  vec2 p = mod( floor( pix ), 2.0 );
  return (
    p == vec2( 0.0, 0.0 ) ? 0.00 :
    p == vec2( 1.0, 1.0 ) ? 0.25 :
    p == vec2( 0.0, 1.0 ) ? 0.50 :
                            0.75
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;

  vec2 uvh = ( uv - 0.5 ) / HEART_RESO / 2.0 * resolution + 0.5;
  uvh.y = 1.0 - uvh.y + ( 1.1 * sin( TAU * time ) + 0.5 ) / HEART_RESO.y;
  float ptn = dither( gl_FragCoord.xy ) + dither( gl_FragCoord.xy / 2.0 ) / 4.0;
  uvh.x += ptn < hidden ? 1E9 : 0.0;
  float dice = 2.0 * ( fract( sin( time * 129.28 + uvh.y * 76.53 ) * 58.261 ) - 0.5 );
  uvh.x += pow( dice, 1.0 / glitch ) * sign( dice );
  vec4 texHeart = texture2D( samplerHeart, uvh );

  if ( texHeart.w == 1.0 ) {
    gl_FragColor = texHeart;
  } else {
    vec4 texInput = texture2D( samplerInput, uv );
    vec4 texHeartShadow = texture2D( samplerHeart, uvh - 1.0 / HEART_RESO );

    float v = texInput.x / ( 1.0 + texHeartShadow.w );

    gl_FragColor = vec4( 0.5 * (
      v < 0.20 ? vec3( 0.0, 0.0, 0.0 ) :
      v < 0.51 ? vec3( 0.2, 0.0, 0.5 ) :
      v < 0.85 ? vec3( 1.0, 0.0, 0.0 ) :
      v < 1.00 ? vec3( 1.0, 1.0, 1.0 ) :
                vec3( 0.0, 0.0, 0.0 )
    ), 1.0 );
  }

  gl_FragColor.xyz *= mod( gl_FragCoord.y, 2.0 ) < 1.0 ? 1.0 : 0.8;
}
