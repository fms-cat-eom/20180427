#define TAU 6.283185307
#define saturate(i) clamp(i,0.,1.)

precision highp float;

uniform float time;
uniform float mode;
uniform float phase;
uniform vec2 resolution;



vec4 mode1() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float sw = mod( gl_FragCoord.y, 8.0 ) < 4.0 ? 1.0 : -1.0;
  uv *= 10.0;
  uv.x += 0.6 * (
    sin( uv.y + time * TAU * sw )
    + sin( uv.y / 0.7 + 2.3 * sw + time * 2.0 * TAU * sw )
  );

  float v = smoothstep( -0.4, 0.4, sin( uv.x + uv.y ) * sin( uv.x - uv.y ) );
  return vec4( vec3( v ), 1.0 );
}

vec4 mode0() {
  vec2 p = ( gl_FragCoord.xy * 2.0 - resolution ) / resolution.y;
  float len = length( p );
  float ret = 0.0;
  if ( len < ( phase - 0.5 ) * 2.0 ) {
    return mode1();
  } else if ( len < phase * 2.0 ) {
    return vec4( vec3( 0.9 ), 1.0 );
  }
  return vec4( vec3( 0.0 ), 1.0 );
}

void main() {
  gl_FragColor = mode0();
}
