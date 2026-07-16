import * as THREE from "three";
import { OrbitControls } from "/vendor/three/OrbitControls.js";
import { GLTFLoader } from "/vendor/three/GLTFLoader.js";
import { DRACOLoader } from "/vendor/three/DRACOLoader.js";

const sceneProfiles = {
  zixiaoguan: {
    name: "紫霄观",
    kicker: "南宋观象现场 · 艺术复原",
    model: "/models/architecture/zixiaoguan.glb",
    description: "以宫观高台、开阔天际和木构殿堂组织观象空间。室内设置观测案、星位记录、方位盘和浑仪意象，承接“抬头辨星，俯身记录”的叙事。",
    facts: ["观象高台", "方位记录案", "浑仪意象", "星位简册"],
    accent: 0x6eaea5
  },
  jiawangfu: {
    name: "嘉王府",
    kicker: "天文图绘制现场 · 艺术复原",
    model: "/models/architecture/jiawangfu.glb",
    description: "以南宋府邸静室作为校核、归类和绘图的叙事空间。室内设置通长星图案、卷轴、书架、界尺与灯具，表现由观测入图、汇星成卷。",
    facts: ["通长绘图案", "星图卷轴", "校核书架", "灯下定稿"],
    accent: 0xc49b54
  }
};

let currentExplorer = null;

function makeMaterial(color, roughness = 0.72, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function addBox(parent, size, position, material, name = "") {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = name;
  parent.add(mesh);
  return mesh;
}

function createStarChartTexture(accent) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  context.fillStyle = "#d8caa6";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "rgba(56,45,28,.35)";
  context.lineWidth = 2;
  for (let x = 80; x < canvas.width; x += 96) {
    context.beginPath();
    context.moveTo(x, 28);
    context.lineTo(x, canvas.height - 28);
    context.stroke();
  }
  const points = [];
  for (let index = 0; index < 86; index += 1) {
    const x = 45 + ((index * 137) % 930);
    const y = 36 + ((index * 83) % 430);
    points.push([x, y]);
    context.fillStyle = index % 7 === 0 ? "#8b3a2f" : "#243e3b";
    context.beginPath();
    context.arc(x, y, index % 5 === 0 ? 5 : 3, 0, Math.PI * 2);
    context.fill();
  }
  context.strokeStyle = `#${new THREE.Color(accent).getHexString()}`;
  context.globalAlpha = 0.48;
  for (let index = 1; index < points.length; index += 3) {
    context.beginPath();
    context.moveTo(points[index - 1][0], points[index - 1][1]);
    context.lineTo(points[index][0], points[index][1]);
    context.stroke();
  }
  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function createArmillary(parent, position, accentMaterial) {
  const group = new THREE.Group();
  group.position.set(position[0], position[1], position[2]);
  [0, Math.PI / 2, Math.PI / 3].forEach((rotation, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.72 + index * 0.05, 0.025, 10, 72), accentMaterial);
    ring.rotation.y = rotation;
    ring.rotation.x = index === 2 ? Math.PI / 2.8 : 0;
    ring.castShadow = true;
    group.add(ring);
  });
  const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 12), accentMaterial);
  axis.rotation.z = Math.PI / 5;
  group.add(axis);
  group.userData.info = "浑仪意象：用于表现古代观天与辨认天球关系的器具形态。本处为叙事性艺术复原。";
  parent.add(group);
  return group;
}

function createInterior(scene, profile, interactiveObjects) {
  const interior = new THREE.Group();
  interior.name = "reconstructed-interior";
  scene.add(interior);

  const darkWood = makeMaterial(0x3c2117, 0.82);
  const redWood = makeMaterial(0x6f2c24, 0.76);
  const stone = makeMaterial(0x66615a, 0.94);
  const paper = makeMaterial(0xd8caa6, 0.9);
  const gold = makeMaterial(0xb99551, 0.36, 0.42);
  const ink = makeMaterial(0x11191a, 0.5);
  const accent = makeMaterial(profile.accent, 0.38, 0.24);

  addBox(interior, [12, 0.45, 10], [0, 0.12, 0], stone, "夯土与石质台基");
  addBox(interior, [10.6, 0.12, 8.8], [0, 0.4, -0.2], darkWood, "室内木地坪");
  addBox(interior, [2.05, 0.025, 8.2], [0, 0.47, -0.2], makeMaterial(0x7c2e28, 0.92), "中轴地毯");

  [-4.3, -2.2, 2.2, 4.3].forEach((x) => {
    [-3.5, 0, 3.5].forEach((z) => {
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 4.3, 20), redWood);
      column.position.set(x, 2.58, z);
      column.castShadow = true;
      column.userData.info = "木构柱网：参照宋代木构建筑的开间与柱网逻辑进行概念化复原。";
      interior.add(column);
      interactiveObjects.push(column);
    });
  });

  addBox(interior, [9.3, 0.18, 0.22], [0, 4.45, 3.5], darkWood, "前檐横梁");
  addBox(interior, [9.3, 0.18, 0.22], [0, 4.45, 0], darkWood, "中部横梁");
  addBox(interior, [9.3, 0.18, 0.22], [0, 4.45, -3.5], darkWood, "后部横梁");

  const chartTexture = createStarChartTexture(profile.accent);
  const chartMaterial = new THREE.MeshStandardMaterial({ map: chartTexture, roughness: 0.92 });

  if (profile === sceneProfiles.zixiaoguan) {
    const platform = addBox(interior, [5.4, 0.32, 3.7], [0, 0.62, -2.4], darkWood, "观象台");
    platform.userData.info = "观象高台：以开阔天际和稳定记录位置为设计目的的艺术复原空间。";
    interactiveObjects.push(platform);
    createArmillary(interior, [0, 2.1, -2.45], gold).traverse((object) => interactiveObjects.push(object));
    const chart = addBox(interior, [3.4, 0.05, 1.65], [-2.55, 1.32, 0.6], chartMaterial, "星位记录案");
    chart.rotation.x = -0.08;
    chart.userData.info = "星位记录案：呈现辨认方位、记录星位并整理观测结果的过程。";
    interactiveObjects.push(chart);
    addBox(interior, [3.7, 0.18, 1.85], [-2.55, 1.08, 0.6], darkWood);
    addBox(interior, [0.8, 0.16, 0.58], [2.5, 1.12, 0.6], paper, "星位简册").userData.info = "星位简册：用于表现多次观测的记录与校核，不对应某件确切传世实物。";
    const directionDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.08, 48), new THREE.MeshStandardMaterial({ map: chartTexture, roughness: 0.88 }));
    directionDisc.position.set(2.55, 0.57, -1.1);
    directionDisc.userData.info = "方位盘：把方向、星位和观测顺序可视化的艺术复原道具。";
    interior.add(directionDisc);
    interactiveObjects.push(directionDisc);
  } else {
    const table = addBox(interior, [6.2, 0.25, 2.25], [0, 1.18, -0.65], darkWood, "通长绘图案");
    table.userData.info = "通长绘图案：用于展开、校对和绘制天文图卷的核心工作台。";
    interactiveObjects.push(table);
    const scroll = addBox(interior, [5.55, 0.045, 1.72], [0, 1.34, -0.65], chartMaterial, "星图卷轴");
    scroll.userData.info = "星图卷轴：表现由观测、校核到绘图成卷的知识整理过程。";
    interactiveObjects.push(scroll);
    [-2.75, 2.75].forEach((x) => {
      const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 1.8, 18), gold);
      roller.rotation.x = Math.PI / 2;
      roller.position.set(x, 1.4, -0.65);
      interior.add(roller);
    });
    [-3.75, 3.75].forEach((x) => {
      const shelf = new THREE.Group();
      shelf.position.set(x, 0.55, -2.55);
      for (let level = 0; level < 4; level += 1) addBox(shelf, [1.25, 0.12, 0.55], [0, level * 0.72, 0], darkWood);
      for (let level = 0; level < 3; level += 1) {
        for (let book = 0; book < 5; book += 1) addBox(shelf, [0.12, 0.48, 0.38], [-0.42 + book * 0.21, 0.36 + level * 0.72, 0], paper);
      }
      shelf.userData.info = "校核书架：用于表现历代天文材料、讲授文本与绘图资料的对读。";
      interior.add(shelf);
      interactiveObjects.push(shelf);
    });
    const inkstone = addBox(interior, [0.48, 0.1, 0.32], [2.1, 1.46, 0.4], ink, "砚台");
    inkstone.userData.info = "砚台与界尺：突出天文图绘制、定线和校核的手工过程。";
    interactiveObjects.push(inkstone);
    createArmillary(interior, [-3.25, 1.65, 1.85], accent).traverse((object) => interactiveObjects.push(object));
  }

  [-3.3, 3.3].forEach((x) => {
    const lamp = new THREE.PointLight(0xe6b968, 4.2, 7.5, 2.1);
    lamp.position.set(x, 2.25, 1.3);
    interior.add(lamp);
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.21, 0.55, 12), paper);
    lantern.position.copy(lamp.position);
    lantern.userData.info = "室内灯具：以柔和暖光营造夜间记录和绘图的氛围。";
    interior.add(lantern);
    interactiveObjects.push(lantern);
  });

  return interior;
}

function createDoors(scene, interactiveObjects) {
  const group = new THREE.Group();
  group.position.set(0, 0.45, 4.46);
  scene.add(group);
  const doorMaterial = makeMaterial(0x6d2b23, 0.76);
  const gold = makeMaterial(0xc4a15a, 0.35, 0.52);
  const frame = makeMaterial(0x2c1b15, 0.82);
  addBox(group, [3.65, 0.26, 0.28], [0, 3.25, 0], frame);
  addBox(group, [0.28, 3.35, 0.28], [-1.82, 1.67, 0], frame);
  addBox(group, [0.28, 3.35, 0.28], [1.82, 1.67, 0], frame);

  function makeDoor(side) {
    const pivot = new THREE.Group();
    pivot.position.set(side * 1.7, 0, 0);
    const panel = addBox(pivot, [1.62, 3.05, 0.18], [-side * 0.81, 1.58, 0], doorMaterial, side < 0 ? "左门扇" : "右门扇");
    for (let row = 0; row < 3; row += 1) {
      for (let column = 0; column < 2; column += 1) {
        addBox(panel, [0.55, 0.66, 0.035], [-0.3 + column * 0.6, -0.77 + row * 0.78, 0.105], frame);
      }
    }
    const stud = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), gold);
    stud.position.set(-side * 0.48, 0, 0.14);
    panel.add(stud);
    panel.userData.isDoor = true;
    panel.userData.info = "点击门扇进入室内。门与室内为项目叙事所需的交互式艺术复原。";
    group.add(pivot);
    interactiveObjects.push(panel);
    return pivot;
  }

  return { group, left: makeDoor(-1), right: makeDoor(1), progress: 0, target: 0 };
}

async function loadArchitectureModel(scene, profile) {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  const result = await loader.loadAsync(profile.model);
  const model = result.scene;
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const scale = 11.5 / Math.max(size.x, size.z, size.y * 1.35, 0.001);
  model.position.sub(center);
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);
  const normalized = new THREE.Box3().setFromObject(model);
  model.position.y -= normalized.min.y - 0.42;
  model.rotation.y = Math.PI;
  model.name = "original-architecture-model";
  model.traverse((object) => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
    object.material = object.material.clone();
    object.material.transparent = true;
  });
  scene.add(model);
  return model;
}

function createExplorerShell(profile) {
  const shell = document.createElement("section");
  shell.className = "architecture-explorer";
  shell.setAttribute("role", "dialog");
  shell.setAttribute("aria-modal", "true");
  shell.setAttribute("aria-label", profile.name + "三维室内探索");
  shell.innerHTML = `
    <div class="architecture-canvas-wrap"><canvas></canvas><div class="architecture-loading"><i></i><span>正在构筑 ${profile.name}</span></div></div>
    <header class="architecture-head">
      <div><small>${profile.kicker}</small><h2>${profile.name} · 建筑内外探索</h2></div>
      <button type="button" class="architecture-close" aria-label="关闭三维探索">关闭</button>
    </header>
    <aside class="architecture-guide">
      <small>空间说明</small><p>${profile.description}</p>
      <ol>${profile.facts.map((fact) => `<li>${fact}</li>`).join("")}</ol>
      <div class="architecture-object-info">点击门扇或室内器物，可查看结构说明。</div>
    </aside>
    <div class="architecture-actions">
      <button type="button" class="architecture-door-action">开门入内</button>
      <button type="button" class="architecture-outside-action">回到门外</button>
    </div>
    <p class="architecture-help">拖动旋转 · 滚轮缩放 · 点击门扇与器物</p>`;
  document.body.appendChild(shell);
  return shell;
}

async function openExplorer(variant) {
  const profile = sceneProfiles[variant] || sceneProfiles.zixiaoguan;
  if (currentExplorer) currentExplorer.destroy();
  const shell = createExplorerShell(profile);
  document.body.classList.add("architecture-open");
  const canvas = shell.querySelector("canvas");
  const info = shell.querySelector(".architecture-object-info");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x071315);
  scene.fog = new THREE.FogExp2(0x071315, 0.032);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  } catch (error) {
    shell.querySelector(".architecture-loading span").textContent = "当前设备无法创建三维画面，请开启浏览器硬件加速";
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 4.4, 15.5);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.minDistance = 2;
  controls.maxDistance = 25;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.set(0, 2.1, 0);

  scene.add(new THREE.HemisphereLight(0x8bb4b6, 0x1c130d, 2.4));
  const moon = new THREE.DirectionalLight(0xd8eced, 4.8);
  moon.position.set(-7, 12, 8);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -12;
  moon.shadow.camera.right = 12;
  moon.shadow.camera.top = 12;
  moon.shadow.camera.bottom = -12;
  scene.add(moon);
  const warm = new THREE.DirectionalLight(0xe2a35a, 2.7);
  warm.position.set(6, 7, -5);
  scene.add(warm);

  const interactiveObjects = [];
  const interior = createInterior(scene, profile, interactiveObjects);
  const doors = createDoors(scene, interactiveObjects);
  let model = null;
  let inside = false;
  let destroyed = false;
  let cameraTween = null;

  function resize() {
    if (destroyed) return;
    const width = shell.clientWidth;
    const height = shell.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  }

  function moveCamera(position, target, duration = 1200) {
    cameraTween = {
      started: performance.now(), duration,
      fromPosition: camera.position.clone(), toPosition: position.clone(),
      fromTarget: controls.target.clone(), toTarget: target.clone()
    };
  }

  function setInside(value) {
    inside = Boolean(value);
    doors.target = inside ? 1 : 0;
    shell.classList.toggle("is-inside", inside);
    if (model) {
      model.traverse((object) => {
        if (object.isMesh) {
          object.material.opacity = inside ? 0.12 : 0.72;
          object.material.depthWrite = !inside;
        }
      });
    }
    if (inside) {
      const insideCamera = profile === sceneProfiles.zixiaoguan
        ? new THREE.Vector3(3.4, 2.85, 3.65)
        : new THREE.Vector3(0.4, 2.8, 3.7);
      const insideTarget = profile === sceneProfiles.zixiaoguan
        ? new THREE.Vector3(-0.7, 1.35, -1.35)
        : new THREE.Vector3(0, 1.25, -1.05);
      moveCamera(insideCamera, insideTarget, 1450);
      info.textContent = "门扇已开启。你可以观察木构柱网、观测或绘图工作台，并点击器物查看说明。";
    } else {
      moveCamera(new THREE.Vector3(0, 4.4, 15.5), new THREE.Vector3(0, 2.1, 0), 1250);
      info.textContent = "已回到门外。点击双开门或“开门入内”再次进入。";
    }
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function handlePointer(event) {
    const box = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - box.left) / box.width) * 2 - 1;
    pointer.y = -((event.clientY - box.top) / box.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(interactiveObjects, true).find((item) => item.object.visible);
    if (!hit) return;
    let target = hit.object;
    while (target && !target.userData.info && target.parent) target = target.parent;
    if (target && target.userData.info) info.textContent = target.userData.info;
    if (hit.object.userData.isDoor || target?.userData.isDoor) setInside(!inside);
  }

  canvas.addEventListener("click", handlePointer);
  shell.querySelector(".architecture-door-action").addEventListener("click", () => setInside(true));
  shell.querySelector(".architecture-outside-action").addEventListener("click", () => setInside(false));

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    renderer.setAnimationLoop(null);
    controls.dispose();
    renderer.dispose();
    shell.remove();
    document.body.classList.remove("architecture-open");
    currentExplorer = null;
  }
  shell.querySelector(".architecture-close").addEventListener("click", destroy);
  shell.addEventListener("keydown", (event) => { if (event.key === "Escape") destroy(); });
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(shell);

  currentExplorer = { destroy, setInside };
  resize();
  renderer.setAnimationLoop((time) => {
    if (destroyed) return;
    const doorSpeed = 0.065;
    doors.progress += (doors.target - doors.progress) * doorSpeed;
    doors.left.rotation.y = doors.progress * 1.22;
    doors.right.rotation.y = -doors.progress * 1.22;
    if (cameraTween) {
      const ratio = Math.min(1, (time - cameraTween.started) / cameraTween.duration);
      const eased = ratio < 0.5 ? 4 * ratio * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 3) / 2;
      camera.position.lerpVectors(cameraTween.fromPosition, cameraTween.toPosition, eased);
      controls.target.lerpVectors(cameraTween.fromTarget, cameraTween.toTarget, eased);
      if (ratio >= 1) cameraTween = null;
    }
    controls.update();
    renderer.render(scene, camera);
  });

  try {
    model = await loadArchitectureModel(scene, profile);
    model.traverse((object) => {
      if (object.isMesh) object.material.opacity = 0.72;
    });
    shell.querySelector(".architecture-loading").classList.add("is-hidden");
  } catch (error) {
    shell.querySelector(".architecture-loading span").textContent = "建筑外观模型读取失败，已保留可交互室内复原";
    window.setTimeout(() => shell.querySelector(".architecture-loading").classList.add("is-hidden"), 1800);
  }
}

function injectArchitectureButtons() {
  document.querySelectorAll(".architecture-copy").forEach((caption) => {
    const text = caption.textContent || caption.closest(".history-scene")?.textContent || "";
    const variant = text.includes("嘉王府") ? "jiawangfu" : "zixiaoguan";
    const existingButton = caption.querySelector(".architecture-enter-button");
    if (existingButton) {
      existingButton.dataset.variant = variant;
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "architecture-enter-button";
    button.dataset.variant = variant;
    button.innerHTML = "<span>进入三维建筑</span><small>开门 · 查看内部结构</small>";
    button.addEventListener("click", () => openExplorer(button.dataset.variant));
    caption.appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injectArchitectureButtons();
  const root = document.getElementById("root");
  if (root) new MutationObserver(injectArchitectureButtons).observe(root, { childList: true, subtree: true });
});

window.XingtuArchitectureExplorer = { open: openExplorer };
