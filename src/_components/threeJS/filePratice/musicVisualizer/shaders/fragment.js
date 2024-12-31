const fragmentShader = `

varying vec2 vUv;

varying float vPattern;

uniform float uAudioFrequency;
uniform float uTime;


struct Color {
    vec3 color;
    float position;
};

/* ** COLOR_RAMP macro by Arya Ross -> based on Blender's ColorRamp Node in the shading tab
Color[?] colors -> array of color stops that can have any length
float factor -> the position that you want to know the color of -> [0, 1]
vec3 finalColor -> the final color based on the factor 
*/
#define COLOR_RAMP(colors, factor, finalColor) { \
    int index = 0; \
    for(int i = 0; i < colors.length() - 1; i++){ \
       Color currentColor = colors[i]; \
       bool isInBetween = currentColor.position <= factor; \
       index = isInBetween ? i : index; \
    } \
    Color currentColor = colors[index]; \
    Color nextColor = colors[index + 1]; \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (factor - currentColor.position) / range; \
    finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
} \

void main() {
  float time = uTime * (1.0 + uAudioFrequency * 10.0);
  vec3 color;
  vec3 mainColor = mix(vec3(0.2,0.3,0.9),vec3(0.4,0.1,0.3),uAudioFrequency);

  mainColor.r *= 0.9 + sin(time) / 3.2;
  mainColor.g *= 1.1 + cos(time / 2.0) / 2.5;
  mainColor.b *= 0.8 + cos(time / 5.0) / 4.0;

  mainColor.rgb += 0.1;


  Color[4] colors = Color[](
    Color(vec3(1),0.0),
    Color(vec3(1),0.01),
    Color(mainColor,0.1),
    Color(vec3(0.01,0.05,0.2),1.0)
  );
    COLOR_RAMP(colors,vPattern,color);

  gl_FragColor = vec4(vec3(color), 1);
}
`;
export default fragmentShader;
