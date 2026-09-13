"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "./MotionProvider";

/** A low-resolution, grayscale light field. No geometry, textures, or ray marching. */
export default function LandingShader() {
  const canvas = useRef(null);
  const { paused, reduced, introDone } = useMotionPreference();
  useEffect(() => {
    if (paused || reduced || !introDone) return;
    const element = canvas.current;
    const gl = element.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    const shaders = [];
    function compile(type, source) {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    }
    const vertex = compile(
      gl.VERTEX_SHADER,
      "attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}",
    );
    const fragment = compile(
      gl.FRAGMENT_SHADER,
      `precision mediump float;
      varying vec2 uv; uniform float time; uniform float aspect;
      void main(){
        vec2 p=vec2(uv.x*aspect,uv.y);
        float a=sin(p.x*3.1+p.y*2.7+time*.12);
        float b=sin(p.y*5.2-p.x*1.8+time*.09+a*.8);
        float veil=smoothstep(-1.1,1.3,a*.5+b*.45);
        float light=.99-veil*.105;
        gl_FragColor=vec4(vec3(light),1.);
      }`,
    );
    if (!vertex || !fragment) {
      shaders.forEach((s) => gl.deleteShader(s));
      return;
    }
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shaders.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, "time"),
      aspect = gl.getUniformLocation(program, "aspect");
    const low = (navigator.hardwareConcurrency || 8) <= 4;
    let frame = 0,
      last = 0,
      elapsed = 0,
      visible = true,
      lost = false;
    const cap = low ? 320 : 480,
      interval = 1000 / (low ? 15 : 20);
    function resize() {
      const r = element.getBoundingClientRect();
      const scale = cap / Math.max(1, r.width, r.height);
      element.width = Math.max(1, Math.round(r.width * scale));
      element.height = Math.max(1, Math.round(r.height * scale));
      gl.viewport(0, 0, element.width, element.height);
      gl.clearColor(0.96, 0.96, 0.96, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(aspect, r.width / Math.max(1, r.height));
    }
    function draw(now) {
      frame = 0;
      if (!visible || document.hidden || lost) return;
      if (now - last >= interval) {
        elapsed += Math.min(now - last, 100);
        last = now;
        gl.uniform1f(time, elapsed / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      frame = requestAnimationFrame(draw);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      const scene = element.closest(".story-scene");
      visible =
        element.getBoundingClientRect().bottom > 0 &&
        Number(scene?.dataset.progress || 0) < 0.9;
      if (visible && !document.hidden && !lost) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    const onResize = () => {
      resize();
      sync();
    };
    const onLoss = (e) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
    };
    element.addEventListener("webglcontextlost", onLoss);
    addEventListener("resize", onResize);
    addEventListener("scroll", sync, { passive: true });
    document.addEventListener("visibilitychange", sync);
    resize();
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("resize", onResize);
      removeEventListener("scroll", sync);
      document.removeEventListener("visibilitychange", sync);
      element.removeEventListener("webglcontextlost", onLoss);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((s) => gl.deleteShader(s));
    };
  }, [paused, reduced, introDone]);
  return <canvas ref={canvas} className="landing-shader" aria-hidden="true" />;
}
