const fragmentShader = `
  uniform float uTime;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    gl_FragColor = vec4(vec3(vDisplacement) + vec3(0.9,0.1,0.2), 1.0); 
  }
`;
export default fragmentShader;
