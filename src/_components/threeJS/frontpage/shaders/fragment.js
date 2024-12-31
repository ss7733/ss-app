const fragmentShader = `
  // Uniforms for the material properties
  uniform vec3 uBaseColor;  // Base color of the material
  uniform float uMetalness; // Metallic property (0 = dielectric, 1 = metal)
  uniform float uRoughness; // Surface roughness (0 = smooth, 1 = rough)

  // Uniforms for lighting
  uniform vec3 uLightPosition;  // Position of the light source
  uniform vec3 uLightColor;     // Color of the light source
  uniform float uLightIntensity; // Intensity of the light
  uniform float uLightRange;     // Maximum range of the light
  uniform vec3 uAmbientColor;   // Ambient light color
  uniform vec3 uCameraPosition; // Position of the camera

  // Varying data from vertex shader
  varying vec3 vNormal;     // Surface normal
  varying vec3 vPosition;   // Fragment position

  void main() {
      // Normalize the interpolated normal
      vec3 N = normalize(vNormal);

      // Compute view and light direction vectors
      vec3 V = normalize(uCameraPosition - vPosition); // View direction
      vec3 L = normalize(uLightPosition - vPosition);  // Light direction

      // Compute the distance from the light source to the fragment
      float distance = length(uLightPosition - vPosition);

      // Calculate attenuation based on light range
      float attenuation = clamp(1.0 - (distance / uLightRange), 0.0, 1.0);

      // Scale light intensity by attenuation
      float lightFactor = uLightIntensity * attenuation;

      // Base diffuse color, scaled by light factor
      vec3 diffuse = uBaseColor * max(dot(N, L), 0.0) * uLightColor * lightFactor;

      // Specular reflection (using the Cook-Torrance BRDF approximation)
      vec3 H = normalize(V + L);
      float roughnessSquared = uRoughness * uRoughness;
      float NdotH = max(dot(N, H), 0.0);
      float specular = pow(NdotH, 1.0 / roughnessSquared) * lightFactor;

      // Combine diffuse and specular lighting
      vec3 lighting = mix(diffuse, vec3(specular), uMetalness);

      // Add ambient lighting
      vec3 ambient = uBaseColor * uAmbientColor;

      // Final color combines ambient, diffuse, and specular components
      vec3 color = lighting + ambient;

      // Output the final color
      gl_FragColor = vec4(color, 1.0);
  }
`;
export default fragmentShader;
