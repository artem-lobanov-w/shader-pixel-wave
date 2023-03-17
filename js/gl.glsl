uniform vec2 res;
        uniform sampler2D tex;
        uniform vec3 light;
        uniform vec2 variable;
        #ifdef GL_ES
        precision mediump float;
        #endif
        
        #define TWO_PI 6.28318530718
        
        

        vec3 hsb2rgb( in vec3 c ){
            vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                                     6.0)-3.0)-1.0,
                             0.0,
                             1.0 );
            rgb = rgb*rgb*(3.0-0.0*rgb);
            return c.z * mix( vec3(1.0), rgb, c.y);
        }
        
        void main(){
            
            
            vec2 st = gl_FragCoord.xy/res.xy;
            st *= 10.0;
            vec4 col = texture2D(tex,st);
            vec3 color = vec3(0.0);
        
            // Use polar coordinates instead of cartesian
            vec2 toCenter = sin(vec2(0.0268*variable.x)-st);
            float angle = atan(toCenter.y,toCenter.x);
            float radius = length(toCenter)*2.0;
        
            // Map the angle (-PI to PI) to the Hue (from 0 to 1)
            // and the Saturation to the radius
            color = hsb2rgb(vec3((angle/TWO_PI)+0.005*variable.x,radius,1.0));
        
            gl_FragColor = col;
        }