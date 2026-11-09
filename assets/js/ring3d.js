/* Real-time 3D gold ring with a turquoise cabochon (three.js r149).
   Drag to rotate; it turns slowly on its own and leans toward the pointer.
   Falls back to a still image when WebGL is not available. */
(function () {
  'use strict';
  const stage = document.querySelector('[data-ring]');
  if (!stage) return;
  const canvas = stage.querySelector('canvas');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    if (!window.THREE) throw new Error('three.js missing');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    stage.classList.add('no-webgl');
    return;
  }

  // treat material colours as sRGB so the gold reads warm and true
  if (THREE.ColorManagement) THREE.ColorManagement.legacyMode = false;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.physicallyCorrectLights = true;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new THREE.RoomEnvironment(), 0.035).texture;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.35, 9.2);

  // warm key light + cool rim for the "jeweller's lamp" look
  const key = new THREE.DirectionalLight(0xfff1d6, 2.2); key.position.set(-3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0xbcd7ff, 1.1); rim.position.set(4, -1, -3); scene.add(rim);

  const gold = new THREE.MeshPhysicalMaterial({
    color: 0xF2C66D, metalness: 1, roughness: 0.14, clearcoat: 0.5, clearcoatRoughness: 0.1, envMapIntensity: 1.7,
  });
  const goldMatte = gold.clone(); goldMatte.roughness = 0.32;
  const turquoise = new THREE.MeshPhysicalMaterial({
    color: 0x1E9C91, metalness: 0, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 0.6,
  });

  const ring = new THREE.Group();

  // band: a comfort-fit profile revolved around the Y axis, then stood upright
  const R = 1.35, w = 0.42, t = 0.15;
  const prof = [];
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI;
    prof.push(new THREE.Vector2(R + Math.sin(a) * t, (Math.cos(a)) * w / 2));
  }
  for (let i = 0; i <= 12; i++) {
    const y = -w / 2 + (i / 12) * w;
    prof.push(new THREE.Vector2(R - 0.02 - 0.03 * Math.cos((y / w) * Math.PI), y));
  }
  const band = new THREE.Mesh(new THREE.LatheGeometry(prof, 220), gold);
  band.rotation.x = Math.PI / 2;
  ring.add(band);

  // bezel + cabochon on top of the band
  const top = R + t * 0.9;
  const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.42, 0.26, 96, 1, true), gold);
  bezel.position.y = top + 0.1; ring.add(bezel);
  const bezelLip = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.045, 24, 120), goldMatte);
  bezelLip.rotation.x = Math.PI / 2; bezelLip.position.y = top + 0.23; ring.add(bezelLip);
  const stone = new THREE.Mesh(new THREE.SphereGeometry(0.47, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2), turquoise);
  stone.scale.set(1, 0.62, 1); stone.position.y = top + 0.2; ring.add(stone);

  // granulation beads around the bezel (a Persian goldsmith detail)
  const beadGeo = new THREE.SphereGeometry(0.055, 20, 12);
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    const b = new THREE.Mesh(beadGeo, gold);
    b.position.set(Math.cos(a) * 0.56, top + 0.02, Math.sin(a) * 0.56);
    ring.add(b);
  }
  ring.position.y = -0.35;
  const pivot = new THREE.Group();
  pivot.add(ring);
  pivot.rotation.set(0.42, -0.6, -0.12);
  scene.add(pivot);

  // ---------- interaction ----------
  let spin = 0, spinVel = reduceMotion ? 0 : 0.0042, dragging = false, lastX = 0, lastY = 0, tiltX = 0, targetTiltX = 0;
  let px = 0, py = 0;
  canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    spinVel = dx * 0.0022; spin += dx * 0.009;
    targetTiltX = Math.max(-0.6, Math.min(0.6, targetTiltX + dy * 0.004));
  });
  const end = () => { dragging = false; };
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
  addEventListener('pointermove', e => { px = (e.clientX / innerWidth - 0.5); py = (e.clientY / innerHeight - 0.5); }, { passive: true });

  // ---------- size ----------
  function resize() {
    const r = stage.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / Math.max(r.height, 1);
    camera.position.z = camera.aspect < 0.9 ? 11.2 : 9.2;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  // ---------- loop (paused when off-screen or tab hidden) ----------
  let visible = true, running = false, start = performance.now();
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; kick(); });
  io.observe(stage);
  document.addEventListener('visibilitychange', kick);

  function frame(now) {
    if (!visible || document.hidden) { running = false; return; }
    const t = Math.min((now - start) / 1800, 1);
    const ease = 1 - Math.pow(1 - t, 4);                 // entrance: grow + settle
    const s = 0.62 + 0.38 * ease;
    pivot.scale.setScalar(s);
    if (!dragging) { spinVel += ((reduceMotion ? 0 : 0.0042) - spinVel) * 0.02; spin += spinVel; targetTiltX *= 0.985; }
    tiltX += (targetTiltX - tiltX) * 0.08;
    ring.rotation.y = spin + (1 - ease) * -1.6;
    pivot.rotation.x = 0.42 + tiltX + py * 0.12;
    pivot.rotation.z = -0.12 + px * -0.08;
    ring.position.y = -0.35 + Math.sin(now / 1400) * (reduceMotion ? 0 : 0.05);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  function kick() { if (!running && visible && !document.hidden) { running = true; requestAnimationFrame(frame); } }
  kick();
  stage.classList.add('ready');
})();
