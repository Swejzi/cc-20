"use client";
import { useEffect, useRef } from "react";

// --- Interfaces and Types ---

interface Pointer {
    id: number;
    texcoordX: number;
    texcoordY: number;
    prevTexcoordX: number;
    prevTexcoordY: number;
    deltaX: number;
    deltaY: number;
    down: boolean;
    moved: boolean;
    color: RGBColor | [number, number, number]; // Use RGBColor object or initial array
}

interface RGBColor {
    r: number;
    g: number;
    b: number;
}

interface WebGLFormat {
    internalFormat: number;
    format: number;
}

interface WebGLExtensions {
    formatRGBA: WebGLFormat | null;
    formatRG: WebGLFormat | null;
    formatR: WebGLFormat | null;
    halfFloatTexType: number | null;
    supportLinearFiltering: OES_texture_float_linear | null;
}

interface WebGLContextResult {
    gl: WebGL2RenderingContext | WebGLRenderingContext;
    ext: WebGLExtensions;
}

interface FBO {
    texture: WebGLTexture;
    fbo: WebGLFramebuffer | null;
    width: number;
    height: number;
    texelSizeX: number;
    texelSizeY: number;
    attach(id: number): number;
}

interface DoubleFBO {
    width: number;
    height: number;
    texelSizeX: number;
    texelSizeY: number;
    read: FBO;
    write: FBO;
    swap(): void;
}

type UniformLocations = { [key: string]: WebGLUniformLocation | null };

// --- Component Definition ---

function SplashCursor({
  // Add whatever props you like for customization
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512, // Note: CAPTURE_RESOLUTION is defined but not used in the provided code
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.3, g: 0, b: 0.5 }, // Purple background color
  TRANSPARENT = false // Set to false to ensure background color is visible
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Type the ref

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Pointer Initialization ---
    function createPointer(): Pointer {
        return {
            id: -1,
            texcoordX: 0, texcoordY: 0,
            prevTexcoordX: 0, prevTexcoordY: 0,
            deltaX: 0, deltaY: 0,
            down: false, moved: false,
            color: [0, 0, 0], // Initial color as array
        };
    }
    let pointers: Pointer[] = [createPointer()];

    // --- Config Object (already typed by inference) ---
    let config = {
      SIM_RESOLUTION, DYE_RESOLUTION, CAPTURE_RESOLUTION, DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS,
      SPLAT_FORCE, SHADING, COLOR_UPDATE_SPEED, PAUSED: false, BACK_COLOR, TRANSPARENT,
    };

    // --- WebGL Context Setup ---
    let gl: WebGL2RenderingContext | WebGLRenderingContext;
    let ext: WebGLExtensions;

    try {
        const contextResult = getWebGLContext(canvas);
        gl = contextResult.gl;
        ext = contextResult.ext;
    } catch (error) {
        console.error("Failed to initialize WebGL:", error);
        // Handle the error appropriately, maybe show a message to the user
        return; // Stop execution if WebGL setup fails
    }


    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256; // Lower resolution if linear filtering is not supported
      config.SHADING = false; // Disable shading if linear filtering is not supported
    }

    // --- WebGL Context Retrieval Function ---
    // --- WebGL Context Retrieval Function ---
    function getWebGLContext(canvas: HTMLCanvasElement): WebGLContextResult {
        const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

        let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
        let isWebGL2 = false;

        // Try WebGL2 first
        const gl2Context = canvas.getContext("webgl2", params);
        if (gl2Context instanceof WebGL2RenderingContext) {
            gl = gl2Context;
            isWebGL2 = true;
        } else {
            // Fallback to WebGL1 or experimental-webgl
            const gl1Context = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);
            if (gl1Context instanceof WebGLRenderingContext) {
                gl = gl1Context;
                isWebGL2 = false; // Explicitly set to false for WebGL1
            } else if (gl1Context instanceof WebGL2RenderingContext) {
                 // Handle the case where experimental-webgl might return a WebGL2 context
                 gl = gl1Context;
                 isWebGL2 = true;
            }
        }

        // If no WebGL context was obtained after trying both, throw an error
        if (!gl) {
            throw new Error("WebGL not supported or context could not be created.");
        }

        let halfFloatExt: OES_texture_half_float | null = null;
        let supportLinearFiltering: OES_texture_float_linear | null = null;

        if (isWebGL2) {
          const gl2 = gl as WebGL2RenderingContext; // Use the correctly typed gl
          gl2.getExtension("EXT_color_buffer_float");
          supportLinearFiltering = gl2.getExtension("OES_texture_float_linear");
        } else {
          const gl1 = gl as WebGLRenderingContext; // Use the correctly typed gl
          halfFloatExt = gl1.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl1.getExtension("OES_texture_half_float_linear");
      }

      // Set clear color based on TRANSPARENT prop
      gl.clearColor(0.0, 0.0, 0.0, TRANSPARENT ? 0.0 : 1.0);


      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
          : halfFloatExt?.HALF_FLOAT_OES ?? null;

        let formatRGBA: WebGLFormat | null = null;
        let formatRG: WebGLFormat | null = null;
        let formatR: WebGLFormat | null = null;

        if (isWebGL2) {
          const gl2 = gl as WebGL2RenderingContext;
          formatRGBA = getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, halfFloatTexType);
          formatRG = getSupportedFormat(gl2, gl2.RG16F, gl2.RG, halfFloatTexType);
          formatR = getSupportedFormat(gl2, gl2.R16F, gl2.RED, halfFloatTexType);
        } else {
          const gl1 = gl as WebGLRenderingContext;
          formatRGBA = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType);
          formatRG = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType); // Fallback
          formatR = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType); // Fallback
        }

         // Construct the extensions object safely
         const extensions: WebGLExtensions = {
             formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering,
         };

        return { gl, ext: extensions };
      }

    // --- Texture Format Support Check Functions ---
    function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number | null): WebGLFormat | null {
       if (type === null) return null;

      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if (gl instanceof WebGLRenderingContext) {
             if (internalFormat !== gl.RGBA) {
                 console.warn(`WebGL1: Format ${internalFormat} not supported, falling back to RGBA.`);
                 return getSupportedFormat(gl, gl.RGBA, gl.RGBA, type);
             } else { return null; }
        } else {
            const gl2 = gl as WebGL2RenderingContext;
            switch (internalFormat) {
                case gl2.R16F:
                    console.warn("WebGL2: R16F not supported, falling back to RG16F.");
                    return getSupportedFormat(gl2, gl2.RG16F, gl2.RG, type);
                case gl2.RG16F:
                    console.warn("WebGL2: RG16F not supported, falling back to RGBA16F.");
                    return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);
                default: return null;
            }
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number): boolean {
      let texture = gl.createTexture();
      if (!texture) return false;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      let fbo = gl.createFramebuffer();
      if (!fbo) { gl.deleteTexture(texture); return false; }
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.deleteFramebuffer(fbo);
      gl.deleteTexture(texture);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    // --- Material and Program Classes ---
    class Material {
        private vertexShader: WebGLShader;
        private fragmentShaderSource: string;
        private programs: { [key: number]: WebGLProgram };
        private activeProgram: WebGLProgram | null;
        uniforms: UniformLocations;

        constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
            this.vertexShader = vertexShader;
            this.fragmentShaderSource = fragmentShaderSource;
            this.programs = {};
            this.activeProgram = null;
            this.uniforms = {};
        }

        setKeywords(keywords: string[]) {
            let hash = 0;
            for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
            let program = this.programs[hash];
            if (program == null) {
                const fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
                if (!fragmentShader) return;
                const newProgram = createProgram(this.vertexShader, fragmentShader);
                if (!newProgram) { gl.deleteShader(fragmentShader); return; }
                program = newProgram;
                this.programs[hash] = program;
            }
            if (program === this.activeProgram) return;
            const newUniforms = getUniforms(program);
            if (!newUniforms) return;
            this.uniforms = newUniforms;
            this.activeProgram = program;
        }

        bind() {
            if (!this.activeProgram) return;
            gl.useProgram(this.activeProgram);
        }
    }

    class Program {
        program: WebGLProgram | null;
        uniforms: UniformLocations;

        constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
            this.program = createProgram(vertexShader, fragmentShader);
            this.uniforms = this.program ? (getUniforms(this.program) ?? {}) : {};
        }

        bind() {
            if (!this.program) return;
            gl.useProgram(this.program);
        }
    }

    // --- Shader and Program Utility Functions ---
    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program linking failed:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    function getUniforms(program: WebGLProgram): UniformLocations | null {
      const uniforms: UniformLocations = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      if (uniformCount === null) return null;
      for (let i = 0; i < uniformCount; i++) {
        const uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) continue;
        uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);
      }
      return uniforms;
    }

    function compileShader(type: number, source: string, keywords?: string[]): WebGLShader | null {
      const finalSource = addKeywords(source, keywords);
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, finalSource);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`Shader compilation failed (${type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment'}):`, gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function addKeywords(source: string, keywords?: string[]): string {
      if (!keywords || keywords.length === 0) return source;
      let keywordsString = "";
      keywords.forEach((keyword: string) => { keywordsString += `#define ${keyword}\n`; });
      return keywordsString + source;
    }

    // --- Shader Compilation ---
    const baseVertexShaderSource = `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
        uniform vec2 texelSize;
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }`;
    const copyShaderSource = `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; uniform sampler2D uTexture;
        void main () { gl_FragColor = texture2D(uTexture, vUv); }`;
    const clearShaderSource = `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
        void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`;
    const displayShaderSource = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uTexture; uniform sampler2D uDithering; uniform vec2 ditherScale; uniform vec2 texelSize;
      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0.0));
          return max(1.055 * pow(color, vec3(1.0/2.4)) - 0.055, vec3(0.0));
      }
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb; vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb; vec3 bc = texture2D(uTexture, vB).rgb;
              float dx = length(rc) - length(lc); float dy = length(tc) - length(bc);
              vec3 n = normalize(vec3(dx, dy, length(texelSize) * 2.0));
              vec3 l = normalize(vec3(0.0, 0.0, 1.0));
              float diffuse = clamp(dot(n, l) * 0.5 + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif
          float a = max(c.r, max(c.g, c.b)); // Restore original alpha calculation
          gl_FragColor = vec4(c, a);
      }`;
    const splatShaderSource = `
        precision highp float; precision highp sampler2D;
        varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio;
        uniform vec3 color; uniform vec2 point; uniform float radius;
        void main () {
            vec2 p = vUv - point.xy; p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }`;
    const advectionShaderSource = `
        precision highp float; precision highp sampler2D;
        varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource;
        uniform vec2 texelSize; uniform vec2 dyeTexelSize; uniform float dt; uniform float dissipation;
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5; vec2 iuv = floor(st); vec2 fuv = fract(st);
            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize); vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize); vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }
        void main () {
            vec2 coord; vec4 result;
            #ifdef MANUAL_FILTERING
                vec2 velocity = bilerp(uVelocity, vUv, texelSize).xy;
                coord = vUv - dt * velocity * texelSize;
                result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                coord = vUv - dt * velocity * texelSize;
                result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }`;
    const divergenceShaderSource = `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).x; float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y; float B = texture2D(uVelocity, vB).y;
            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; } if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; } if (vB.y < 0.0) { B = -C.y; }
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }`;
    const curlShaderSource = `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - (T - B);
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }`;
    const vorticityShaderSource = `
        precision highp float; precision highp sampler2D;
        varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
        uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
        void main () {
            float L = texture2D(uCurl, vL).x; float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x; float B = texture2D(uCurl, vB).x; float C = texture2D(uCurl, vUv).x;
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= (length(force) + 0.0001);
            force *= curl * C; force.y *= -1.0;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, vec2(-1000.0)), vec2(1000.0));
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }`;
    const pressureShaderSource = `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
        uniform sampler2D uPressure; uniform sampler2D uDivergence;
        void main () {
            float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }`;
    const gradientSubtractShaderSource = `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
        uniform sampler2D uPressure; uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            vec2 gradient = 0.5 * vec2(R - L, T - B);
            velocity.xy -= gradient;
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }`;

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, baseVertexShaderSource);
    const copyShader = compileShader(gl.FRAGMENT_SHADER, copyShaderSource);
    const clearShader = compileShader(gl.FRAGMENT_SHADER, clearShaderSource);
    const splatShader = compileShader(gl.FRAGMENT_SHADER, splatShaderSource);
    const advectionShader = compileShader(gl.FRAGMENT_SHADER, advectionShaderSource, ext.supportLinearFiltering ? undefined : ["MANUAL_FILTERING"]);
    const divergenceShader = compileShader(gl.FRAGMENT_SHADER, divergenceShaderSource);
    const curlShader = compileShader(gl.FRAGMENT_SHADER, curlShaderSource);
    const vorticityShader = compileShader(gl.FRAGMENT_SHADER, vorticityShaderSource);
    const pressureShader = compileShader(gl.FRAGMENT_SHADER, pressureShaderSource);
    const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, gradientSubtractShaderSource);

    // Check if all shaders compiled successfully
    if (!baseVertexShader || !copyShader || !clearShader || !splatShader || !advectionShader || !divergenceShader || !curlShader || !vorticityShader || !pressureShader || !gradientSubtractShader) {
        console.error("One or more shaders failed to compile. Aborting initialization.");
        // Potentially clean up successfully compiled shaders here
        return;
    }

    // --- Program and Material Instantiation ---
    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader); // Corrected typo
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    // Check if all programs were created successfully
    if (!copyProgram.program || !clearProgram.program || !splatProgram.program || !advectionProgram.program || !divergenceProgram.program || !curlProgram.program || !vorticityProgram.program || !pressureProgram.program || !gradienSubtractProgram.program) {
        console.error("One or more programs failed to link. Aborting initialization.");
        // Potentially clean up successfully created programs and shaders
        return;
    }


    // --- Blit Utility ---
    const blit = (() => {
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      const indexBuffer = gl.createBuffer(); // Renamed for clarity
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      // Get attribute location (safer than assuming 0)
      // Note: This requires a program to be bound, which might not be ideal here.
      // Assuming location 0 for simplicity, but dynamic lookup is better.
      const positionAttributeLocation = 0; // gl.getAttribLocation(copyProgram.program!, 'aPosition');
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(positionAttributeLocation);

      return (target: FBO | DoubleFBO | null, clear = false) => {
        let targetFbo: WebGLFramebuffer | null = null;
        let targetWidth: number = gl.drawingBufferWidth;
        let targetHeight: number = gl.drawingBufferHeight;

        if (target) {
            // Check if it's a DoubleFBO or single FBO
            if ('read' in target) { // DoubleFBO
                targetFbo = target.write.fbo; // Target the write buffer
            } else { // Single FBO
                targetFbo = target.fbo;
            }
            targetWidth = target.width;
            targetHeight = target.height;
        }

        gl.viewport(0, 0, targetWidth, targetHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, targetFbo);

        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    // --- Framebuffer Variables ---
    let dye: DoubleFBO | null = null;
    let velocity: DoubleFBO | null = null;
    let divergence: FBO | null = null;
    let curl: FBO | null = null;
    let pressure: DoubleFBO | null = null;


    // --- Framebuffer Initialization and Resizing ---
    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;

      if (!texType || !rgba || !rg || !r) {
          console.error("Missing required texture formats or types. Cannot initialize FBOs.");
          return; // Stop if formats are missing
      }

      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);

      dye = createOrResizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      velocity = createOrResizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      divergence = createOrResizeFBO(divergence, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createOrResizeFBO(curl, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createOrResizeDoubleFBO(pressure, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

       // Check if all FBOs were created/resized successfully
       if (!dye || !velocity || !divergence || !curl || !pressure) {
           console.error("Failed to initialize one or more Framebuffer Objects.");
           // Consider cleanup of partially created FBOs
       }
    }

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO | null {
      gl.activeTexture(gl.TEXTURE0); // Work on texture unit 0
      let texture = gl.createTexture();
      if (!texture) { console.error("Failed to create texture"); return null; }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      let fbo = gl.createFramebuffer();
      if (!fbo) { console.error("Failed to create FBO"); gl.deleteTexture(texture); return null; }
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (status !== gl.FRAMEBUFFER_COMPLETE) {
          console.error("FBO incomplete status:", status);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.deleteFramebuffer(fbo);
          gl.deleteTexture(texture);
          return null;
      }

      // Unbind FBO after setup
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return {
        texture, fbo, width: w, height: h,
        texelSizeX: 1.0 / w, texelSizeY: 1.0 / h,
        attach(id: number): number {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, this.texture); // Use 'this.texture'
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO | null {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      if (!fbo1 || !fbo2) {
          // Cleanup partially created FBOs
          if (fbo1) { if (fbo1.fbo) gl.deleteFramebuffer(fbo1.fbo); gl.deleteTexture(fbo1.texture); }
          if (fbo2) { if (fbo2.fbo) gl.deleteFramebuffer(fbo2.fbo); gl.deleteTexture(fbo2.texture); }
          return null;
      }

      // Store FBOs in an object to help with type inference in methods
      const fboPair = {
          _fbo1: fbo1,
          _fbo2: fbo2,
      };

      return {
        width: w, height: h,
        texelSizeX: fboPair._fbo1.texelSizeX, texelSizeY: fboPair._fbo1.texelSizeY,
        get read(): FBO { return fboPair._fbo1; },
        set read(value: FBO) { fboPair._fbo1 = value; },
        get write(): FBO { return fboPair._fbo2; },
        set write(value: FBO) { fboPair._fbo2 = value; },
        swap() {
            const temp = fboPair._fbo1;
            fboPair._fbo1 = fboPair._fbo2;
            fboPair._fbo2 = temp;
        },
      };
    }

     // Helper functions to create or resize FBOs
     function createOrResizeFBO(fbo: FBO | null, w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO | null {
         if (!fbo || fbo.width !== w || fbo.height !== h) {
             const newFBO = createFBO(w, h, internalFormat, format, type, param);
             if (fbo) { // Delete old resources if resizing
                 if (fbo.fbo) gl.deleteFramebuffer(fbo.fbo);
                 gl.deleteTexture(fbo.texture);
             }
             return newFBO;
         }
         return fbo;
     }

     function createOrResizeDoubleFBO(doubleFBO: DoubleFBO | null, w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO | null {
         if (!doubleFBO || doubleFBO.width !== w || doubleFBO.height !== h) {
             const newDoubleFBO = createDoubleFBO(w, h, internalFormat, format, type, param);
             if (doubleFBO) { // Delete old resources if resizing
                 if (doubleFBO.read.fbo) gl.deleteFramebuffer(doubleFBO.read.fbo);
                 gl.deleteTexture(doubleFBO.read.texture);
                 if (doubleFBO.write.fbo) gl.deleteFramebuffer(doubleFBO.write.fbo);
                 gl.deleteTexture(doubleFBO.write.texture);
             }
             return newDoubleFBO;
         }
         return doubleFBO;
     }


    // --- Update and Render Loop ---
    function updateKeywords() {
      if (!displayMaterial) return; // Guard against null material
      let displayKeywords = [];
      if (config.SHADING) displayKeywords.push("SHADING");
      displayMaterial.setKeywords(displayKeywords);
    }

    updateKeywords();
    // Ensure canvas is sized correctly before initializing FBOs and splatting
    if (resizeCanvas()) { // Returns true if resized
        console.log("Canvas resized on initial setup.");
    }
    initFramebuffers(); // Initial FBO setup

    // Add a larger and brighter initial splat in the center
    if (dye && velocity && splatProgram?.program && canvas) { // Ensure resources are ready
        const initialColor = { r: 0.5, g: 0.2, b: 1.0 }; // Bright purple
        // Use a larger radius for the initial splat, e.g., 5 times the normal radius
        const initialRadius = correctRadius(config.SPLAT_RADIUS / 100.0) * 5.0;
        splatProgram.bind(); // Bind the splat program
        gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0)); // Target dye texture
        gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
        gl.uniform2f(splatProgram.uniforms.point, 0.5, 0.5); // Center point
        gl.uniform3f(splatProgram.uniforms.color, initialColor.r, initialColor.g, initialColor.b); // Splat color
        gl.uniform1f(splatProgram.uniforms.radius, initialRadius); // Use larger radius
        blit(dye.write); // Draw to write buffer
        dye.swap(); // Swap buffers
    }

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;
    let animationFrameId: number | null = null; // To store the requestAnimationFrame ID

    function updateFrame() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) {
          initFramebuffers(); // Reinitialize FBOs if canvas resized
      }
       // Only proceed if FBOs are initialized
       if (dye && velocity && divergence && curl && pressure) {
           updateColors(dt);
           applyInputs();
           step(dt);
           render(null); // Render to canvas
       } else {
           console.warn("Skipping frame: FBOs not ready.");
       }
      animationFrameId = requestAnimationFrame(updateFrame);
    }

    function calcDeltaTime(): number {
      let now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666); // Clamp dt
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas(): boolean {
      if (!canvas) return false; // Guard against null canvas
      let width = scaleByPixelRatio(canvas.clientWidth);
      let height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt: number) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p: Pointer) => { p.color = generateColor(); });
      }
    }

    function applyInputs() {
      pointers.forEach((p: Pointer) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);

          // Occasionally add an extra splat with a small offset for more fluid effect
          if (Math.random() < 0.3) {
            const offsetX = p.texcoordX + (Math.random() * 0.02 - 0.01);
            const offsetY = p.texcoordY + (Math.random() * 0.02 - 0.01);
            const smallDx = (Math.random() * 0.002 - 0.001) * config.SPLAT_FORCE;
            const smallDy = (Math.random() * 0.002 - 0.001) * config.SPLAT_FORCE;
            const color = generateColor();
            splat(offsetX, offsetY, smallDx, smallDy, color);
          }
        }
      });
    }

    function step(dt: number) {
        // Guard against uninitialized resources
        if (!gl || !ext || !velocity || !curl || !divergence || !pressure || !dye ||
            !curlProgram?.program || !vorticityProgram?.program || !divergenceProgram?.program ||
            !clearProgram?.program || !pressureProgram?.program || !gradienSubtractProgram?.program ||
            !advectionProgram?.program) {
            console.error("Skipping simulation step due to missing resources.");
            return;
        }

      gl.disable(gl.BLEND);

      // Curl
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      // Vorticity
      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // Divergence
      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // Clear pressure
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      // Pressure iterations
      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // Gradient Subtract
      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // Advection (Velocity)
      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      }
      let velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId); // Advect velocity with itself
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // Advection (Dye)
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      }
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0)); // Use updated velocity
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }

    function render(target: FBO | DoubleFBO | null) {
      if (!gl || !dye || !displayMaterial) return; // Guard
      // Restore original render logic
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target: FBO | DoubleFBO | null) {
      if (!gl || !dye || !displayMaterial) return; // Guard
      let width = target ? target.width : gl.drawingBufferWidth;
      let height = target ? target.height : gl.drawingBufferHeight;
      displayMaterial.bind();
      if (config.SHADING) {
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
      }
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    }

    // --- Interaction Functions ---
    function splatPointer(pointer: Pointer) {
      if (!velocity || !dye) return; // Guard

      // Amplify the effect by increasing the force
      let dx = pointer.deltaX * config.SPLAT_FORCE * 1.5;
      let dy = pointer.deltaY * config.SPLAT_FORCE * 1.5;

      // Ensure color is RGB object
      const colorToSplat = Array.isArray(pointer.color) ? { r: pointer.color[0], g: pointer.color[1], b: pointer.color[2] } : pointer.color;

      // Add a small random variation to the color to make it more interesting
      colorToSplat.r += (Math.random() * 0.1 - 0.05);
      colorToSplat.g += (Math.random() * 0.1 - 0.05);
      colorToSplat.b += (Math.random() * 0.1 - 0.05);

      // Use the standard radius for interaction splats
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, colorToSplat);
    }

    function clickSplat(pointer: Pointer) {
        if (!velocity || !dye) return; // Guard
      const color = generateColor();
      // Intensify color for click but keep purple dominant
      color.r *= 5.0; color.g *= 3.0; color.b *= 15.0;
      let dx = 1000 * (Math.random() - 0.5); // Increase force for click splat
      let dy = 1000 * (Math.random() - 0.5);
       // Use the standard radius for interaction splats
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: RGBColor) {
      if (!splatProgram?.program || !velocity || !dye || !canvas) return; // Guard

      splatProgram.bind();
      // Splat velocity
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0); // Splat force/direction
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      // Splat dye
      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b); // Splat color
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius: number): number {
      if (!canvas) return radius;
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    // --- Pointer Update Functions ---
    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
      if (!canvas) return;
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false; // Reset moved state on down
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
      if (!canvas) return;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);

      // Always set moved to true to create fluid effects on all mouse movements
      // Add a small random movement if there's no actual movement to ensure visual effect
      if (Math.abs(pointer.deltaX) === 0 && Math.abs(pointer.deltaY) === 0) {
        pointer.deltaX = (Math.random() * 0.001 - 0.0005);
        pointer.deltaY = (Math.random() * 0.001 - 0.0005);
      }
      pointer.moved = true;
      // Keep existing color on move
    }

    function updatePointerUpData(pointer: Pointer) {
      pointer.down = false;
    }

    // --- Coordinate Correction ---
    function correctDeltaX(delta: number): number {
      if (!canvas) return delta;
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number): number {
      if (!canvas) return delta;
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    // --- Color Generation ---
    function generateColor(): RGBColor {
      // Randomly choose between purple and lime colors
      if (Math.random() < 0.5) {
        // Generate colors in the purple spectrum (hue range 0.7-0.85)
        let hue = 0.7 + Math.random() * 0.15; // Purple hue range
        let c = HSVtoRGB(hue, 0.8, 1.0);
        // Adjust brightness but keep the purple more vibrant
        c.r *= 0.5; c.g *= 0.3; c.b *= 0.8;
        return c;
      } else {
        // Generate colors in the lime spectrum (hue range 0.2-0.35)
        let hue = 0.2 + Math.random() * 0.15; // Lime hue range
        let c = HSVtoRGB(hue, 0.9, 1.0);
        // Adjust brightness to make lime more vibrant
        c.r *= 0.6; c.g *= 0.9; c.b *= 0.2;
        return c;
      }
    }

    function HSVtoRGB(h: number, s: number, v: number): RGBColor {
      let r = 0, g = 0, b = 0, i: number, f: number, p: number, q: number, t: number;
      i = Math.floor(h * 6); f = h * 6 - i;
      p = v * (1 - s); q = v * (1 - f * s); t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return { r, g, b };
    }

    // --- Utility Functions ---
    function wrap(value: number, min: number, max: number): number {
      const range = max - min;
      if (range === 0) return min;
      return ((value - min) % range) + min;
    }

    function getResolution(resolution: number): { width: number; height: number } {
       if (!gl) return { width: resolution, height: resolution };
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      return (gl.drawingBufferWidth > gl.drawingBufferHeight) ? { width: max, height: min } : { width: min, height: max };
    }

    function scaleByPixelRatio(input: number): number {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function hashCode(s: string): number {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i); hash |= 0;
      }
      return hash;
    }

    // --- Event Listeners ---
    const handleMouseDown = (e: MouseEvent) => {
      let pointer = pointers.find(p => !p.down); // Find first available pointer
      if (!pointer) pointer = pointers[0]; // Fallback to first if all are down (shouldn't happen with single pointer)
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY); // Use -1 for mouse ID
      clickSplat(pointer);
    };

    const handleFirstMouseMove = (e: MouseEvent) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      if (!animationFrameId) { // Start animation loop on first move if not already started
          animationFrameId = requestAnimationFrame(updateFrame);
      }
      updatePointerMoveData(pointer, posX, posY);
      document.body.removeEventListener("mousemove", handleFirstMouseMove); // Remove this listener after first move
    };

    const handleMouseMove = (e: MouseEvent) => {
      let pointer = pointers[0]; // Assume single pointer for mouse
      // Remove the check for pointer.down to track all mouse movements
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerMoveData(pointer, posX, posY);
    };

    const handleTouchStart = (e: TouchEvent) => {
       e.preventDefault(); // Prevent default touch actions like scrolling
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
          let pointer = pointers.find(p => p.id === touches[i].identifier);
          if (!pointer) { // If no pointer exists for this touch, find an inactive one
              pointer = pointers.find(p => !p.down && p.id === -1); // Find inactive pointer
              if (!pointer && pointers.length < 5) { // Optionally create new pointer if limit not reached
                  pointer = createPointer();
                  pointers.push(pointer);
              } else if (!pointer) {
                  pointer = pointers[0]; // Fallback if no inactive pointer and limit reached
              }
          }
          if (pointer) {
              let posX = scaleByPixelRatio(touches[i].clientX);
              let posY = scaleByPixelRatio(touches[i].clientY);
              updatePointerDownData(pointer, touches[i].identifier, posX, posY);
              clickSplat(pointer); // Splat on touch start
          }
      }
       if (!animationFrameId) { // Start animation loop on first touch if not already started
           animationFrameId = requestAnimationFrame(updateFrame);
       }
    };

    const handleTouchMove = (e: TouchEvent) => {
       e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
          let pointer = pointers.find(p => p.id === touches[i].identifier);
          if (pointer) {
              let posX = scaleByPixelRatio(touches[i].clientX);
              let posY = scaleByPixelRatio(touches[i].clientY);
              updatePointerMoveData(pointer, posX, posY);
          } else {
              // If no pointer exists for this touch, create one
              pointer = createPointer();
              pointers.push(pointer);
              let posX = scaleByPixelRatio(touches[i].clientX);
              let posY = scaleByPixelRatio(touches[i].clientY);
              updatePointerDownData(pointer, touches[i].identifier, posX, posY);
          }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
       e.preventDefault();
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
          let pointer = pointers.find(p => p.id === touches[i].identifier);
          if (pointer) {
              updatePointerUpData(pointer);
              // Optional: Reset pointer ID to -1 to mark as inactive
              // pointer.id = -1;
          }
      }
    };

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    // Use mousemove on window to capture movement outside canvas if mouse is down
    window.addEventListener("mousemove", handleMouseMove);
    // Use mouseup on window to capture release outside canvas
    window.addEventListener("mouseup", () => { pointers.forEach(updatePointerUpData); });

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd); // Listen on window for touchend outside canvas

    // Start animation loop immediately or wait for first interaction
    animationFrameId = requestAnimationFrame(updateFrame);

     // Cleanup function
     return () => {
         if (animationFrameId) {
             cancelAnimationFrame(animationFrameId);
             animationFrameId = null;
         }
         // Remove event listeners
         canvas.removeEventListener("mousedown", handleMouseDown);
         window.removeEventListener("mousemove", handleMouseMove);
         window.removeEventListener("mouseup", () => { pointers.forEach(updatePointerUpData); }); // Need a way to remove this specific listener if needed
         document.body.removeEventListener("mousemove", handleFirstMouseMove); // Ensure this is removed
         canvas.removeEventListener("touchstart", handleTouchStart);
         canvas.removeEventListener("touchmove", handleTouchMove);
         window.removeEventListener("touchend", handleTouchEnd);

         // --- WebGL Resource Cleanup ---
         // Delete programs
         if (gl) {
             if (copyProgram?.program) gl.deleteProgram(copyProgram.program);
             if (clearProgram?.program) gl.deleteProgram(clearProgram.program);
             if (splatProgram?.program) gl.deleteProgram(splatProgram.program);
             if (advectionProgram?.program) gl.deleteProgram(advectionProgram.program);
             if (divergenceProgram?.program) gl.deleteProgram(divergenceProgram.program);
             if (curlProgram?.program) gl.deleteProgram(curlProgram.program);
             if (vorticityProgram?.program) gl.deleteProgram(vorticityProgram.program);
             if (pressureProgram?.program) gl.deleteProgram(pressureProgram.program);
             if (gradienSubtractProgram?.program) gl.deleteProgram(gradienSubtractProgram.program);
             // Delete shaders (assuming they are not reused)
             if (baseVertexShader) gl.deleteShader(baseVertexShader);
             if (copyShader) gl.deleteShader(copyShader);
             if (clearShader) gl.deleteShader(clearShader);
             if (splatShader) gl.deleteShader(splatShader);
             if (advectionShader) gl.deleteShader(advectionShader);
             if (divergenceShader) gl.deleteShader(divergenceShader);
             if (curlShader) gl.deleteShader(curlShader);
             if (vorticityShader) gl.deleteShader(vorticityShader);
             if (pressureShader) gl.deleteShader(pressureShader);
             if (gradientSubtractShader) gl.deleteShader(gradientSubtractShader);
             // Delete FBOs and Textures
             const cleanupFBO = (fbo: FBO | null) => {
                 if (fbo) {
                     if (fbo.fbo) gl.deleteFramebuffer(fbo.fbo);
                     gl.deleteTexture(fbo.texture);
                 }
             };
             const cleanupDoubleFBO = (dfbo: DoubleFBO | null) => {
                 if (dfbo) {
                     cleanupFBO(dfbo.read);
                     cleanupFBO(dfbo.write);
                 }
             };
             cleanupDoubleFBO(dye);
             cleanupDoubleFBO(velocity);
             cleanupFBO(divergence);
             cleanupFBO(curl);
             cleanupDoubleFBO(pressure);
             // Delete buffers used by blit
             // Need to store references to these buffers outside the blit IIFE to delete them here
             // e.g., gl.deleteBuffer(vertexBuffer); gl.deleteBuffer(indexBuffer);
         }
     };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ /* Dependencies */ ]); // Keep dependencies array empty if props are not used inside, or add them if they are

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-auto">
      <canvas
        ref={canvasRef}
        id="fluid"
        className="w-screen h-screen"
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
        onClick={(e) => {
          // Force a splat on click
          const canvas = canvasRef.current;
          if (canvas) {
            // We don't need to calculate normalized coordinates here
            // as we're using the raw mouse event

            // Create a synthetic mouse event to trigger the fluid simulation
            // This will indirectly trigger the fluid simulation through the event handlers
            const mouseEvent = new MouseEvent('mousedown', {
              clientX: e.clientX,
              clientY: e.clientY,
              bubbles: true,
              cancelable: true,
              view: window
            });
            canvas.dispatchEvent(mouseEvent);

            // Also dispatch a mousemove event to create more fluid motion
            setTimeout(() => {
              const moveEvent = new MouseEvent('mousemove', {
                clientX: e.clientX + (Math.random() * 10 - 5),
                clientY: e.clientY + (Math.random() * 10 - 5),
                bubbles: true,
                cancelable: true,
                view: window
              });
              canvas.dispatchEvent(moveEvent);
            }, 10);
          }
        }}
      />
    </div>
  );
}

export { SplashCursor };
