import * as THREE from "three";
import { OrbitControls } from "/vendor/three/OrbitControls.js";
import { GLTFLoader } from "/vendor/three/GLTFLoader.js";
import { DRACOLoader } from "/vendor/three/DRACOLoader.js";

const imageList = (slug, files) => files.map((file) => `/content/travel/${slug}/${file}`);

const stationProfiles = [
  {
    slug: "jiange-cypress", name: "剑阁柏", aliases: ["剑阁柏"], type: "cypress", accent: 0xb98b50,
    subtitle: "孤柏、古道与剑门山势的三层空间",
    summary: "先辨树干似松、枝叶似柏的形态，再沿石板古道观察古树与交通遗产的共生关系。",
    focus: ["树干与树皮沟壑", "根系和石板路", "保护碑与环境尺度"],
    boundary: "植物特征与保护信息按站内资料呈现；民间称谓作为地方记忆，不与植物学结论混写。",
    models: [{ url: "/models/travel/jiangge-cypress.glb", position: [0, 0, 0], height: 13 }],
    images: imageList("jiange-cypress", ["01.webp", "02.webp", "03.webp"])
  },
  {
    slug: "couple-cypress", name: "夫妻柏", aliases: ["夫妻柏"], type: "couple", accent: 0xc77a62,
    subtitle: "双干相依的古柏叙事场",
    summary: "用双主体构图表现两株古柏的距离、冠幅交叠和共同生长环境，避免只看单棵树的局部。",
    focus: ["双树间距", "树冠交叠", "祈愿习俗痕迹"],
    boundary: "爱情传说属于民间叙事；树体形态和现场环境可由实拍资料对照。",
    images: imageList("couple-cypress", ["01.webp", "02.webp", "03.webp"])
  },
  {
    slug: "marshal-cypress", name: "帅大柏", aliases: ["帅大柏"], type: "cypress", accent: 0x9a7650,
    subtitle: "巨柏尺度与古道险势",
    summary: "从人物尺度、树干围度和坡道路面三项关系，感受古柏并非孤立陈列，而是蜀道空间的一部分。",
    focus: ["胸径尺度", "树根抓地", "坡道高差"],
    boundary: "树龄及测量信息以站内引用资料为准；名称来源的不同说法保留并列。",
    models: [{ url: "/models/travel/marshal-cypress.glb", position: [0, 0, 0], height: 13 }],
    images: imageList("marshal-cypress", ["01.webp", "02.webp"])
  },
  {
    slug: "adou-cypress", name: "阿斗柏", aliases: ["阿斗柏"], type: "cypress", accent: 0x8e9f65,
    subtitle: "古柏形态与三国地方记忆",
    summary: "以偏冠、盘根和古道路肩形成不对称构图，让树名背后的地方记忆落回可观察的现场。",
    focus: ["偏冠形态", "盘根细节", "道路位置"],
    boundary: "人物关联按地方传说呈现，不将口述故事直接写成确定史实。",
    images: imageList("adou-cypress", ["01.webp"])
  },
  {
    slug: "huangzhong-cypress", name: "黄忠柏", aliases: ["黄忠柏"], type: "cypress", accent: 0xa77b46,
    subtitle: "雄健树势与驿道节点",
    summary: "通过高耸主干、收束树冠和道路转折营造力量感，并以实拍图核对树体真实形态。",
    focus: ["主干走势", "冠幅层次", "路口关系"],
    boundary: "三国人物命名属于文化记忆层，现场观察与人物故事分栏阅读。",
    images: imageList("huangzhong-cypress", ["01.webp"])
  },
  {
    slug: "weiyan-cypress", name: "魏延柏", aliases: ["魏延柏"], type: "cypress", accent: 0x8a6848,
    subtitle: "斜干、险坡与古道转折",
    summary: "突出斜向树干和陡坡路径的张力，使视线沿古柏指向剑门山谷深处。",
    focus: ["斜干受力", "坡面落差", "远山视线"],
    boundary: "人物典故作为站点叙事线索，树木保护与地貌信息按现有资料表达。",
    images: imageList("weiyan-cypress", ["01.webp"])
  },
  {
    slug: "longzhong-cypress", name: "隆中对柏", aliases: ["隆中对柏"], type: "couple", accent: 0x6f8f68,
    subtitle: "双柏对望的空间隐喻",
    summary: "让两株古柏隔道相望，中间留出行旅视线，形成“对话”而非单体陈列。",
    focus: ["双柏对景", "古道中轴", "树冠天际线"],
    boundary: "名称所含历史联想属于文化阐释，场景不复原未经证实的具体事件。",
    images: imageList("longzhong-cypress", ["01.webp"])
  },
  {
    slug: "libi", name: "李璧柏与李璧祠", aliases: ["李璧柏与李璧祠", "李璧柏", "李璧祠"], type: "shrine", accent: 0xa06547,
    subtitle: "古柏、祠堂与护道记忆",
    summary: "把古柏放回祠堂院落与蜀道路口，观察纪念建筑、树木和地方治理记忆之间的关系。",
    focus: ["古柏与祠门", "院落层次", "碑刻位置"],
    boundary: "建筑内部为依据站内文献线索的艺术化空间组织，不等同于精确考古复原。",
    models: [
      { url: "/models/travel/libi-cypress.glb", position: [-3.2, 0, 1.2], height: 11 },
      { url: "/models/travel/libi-shrine.glb", position: [3.2, 0, 1.4], height: 7 }
    ],
    images: imageList("libi", ["01.webp", "02.webp", "03.webp"])
  },
  {
    slug: "hanbrick-cypress", name: "汉砖柏", aliases: ["汉砖柏"], type: "cypress", accent: 0xa8563b,
    subtitle: "古柏根系与汉砖遗存对照",
    summary: "近景呈现砖石纹理，中景保留盘根，远景接入古道，避免历史信息只停留在文字标签。",
    focus: ["砖石纹理", "根系包裹", "遗存边界"],
    boundary: "砖石年代与用途按站内资料表述；场景中的排列方式用于空间说明。",
    images: imageList("hanbrick-cypress", ["01.webp", "02.webp"])
  },
  {
    slug: "dragon-claw-cypress", name: "龙爪柏", aliases: ["龙爪柏"], type: "roots", accent: 0x8a7a4e,
    subtitle: "裸露根系形成的地表雕塑",
    summary: "放大观察根系如何跨越坡石、抓住土层，再退远查看它与整棵古柏的受力关系。",
    focus: ["根系分叉", "岩土接触", "树身重心"],
    boundary: "“龙爪”为形态比喻；模型强调可观察结构，不新增神异解释。",
    images: imageList("dragon-claw-cypress", ["01.webp", "image2-v2.webp"])
  },
  {
    slug: "divine-bird-cypress", name: "神鸟柏", aliases: ["神鸟柏"], type: "bird", accent: 0x7d9569,
    subtitle: "枝干剪影与神鸟意象",
    summary: "利用侧光凸显枝干轮廓，从指定视角寻找“神鸟”剪影，再切换自由视角理解其自然形态。",
    focus: ["枝干剪影", "侧光方向", "自然形态对照"],
    boundary: "神鸟形象是观看联想，不作为树木形成原因的科学解释。",
    images: imageList("divine-bird-cypress", ["01.webp", "image2-v2.webp"])
  },
  {
    slug: "zhangfei", name: "张飞柏、张飞井与张飞像", aliases: ["张飞柏、张飞井、张飞像", "张飞柏与张飞井", "张飞柏", "张飞井", "张飞像"], type: "zhangfei", accent: 0x9f4936,
    subtitle: "古柏、古井与人物地标的复合场景",
    summary: "将古柏、井台、人物像分置于驿道节点，形成可步入、可环看的三国文化小场景。",
    focus: ["古柏与井台", "人物像视线", "驿道节点"],
    boundary: "张飞植柏等故事按地方文献与民间传说的不同层级呈现，不混作唯一结论。",
    models: [
      { url: "/models/travel/zhangfei-cypress.glb", position: [-3.2, 0, 0.5], height: 11 },
      { url: "/models/travel/zhangfei-well.glb", position: [3.6, 0, -1.8], height: 3.4 },
      { url: "/models/travel/zhangfei-statue.glb", position: [3.3, 0, 3.4], height: 5.6 }
    ],
    images: imageList("zhangfei", ["01.webp", "02.webp", "03.webp", "04.webp", "05.webp"])
  },
  {
    slug: "father-son-cypress", name: "父子柏", aliases: ["父子柏"], type: "couple", accent: 0x7d8959,
    subtitle: "一高一低的古柏亲缘意象",
    summary: "以不同高度和冠幅的双柏构成前后关系，同时保留各自独立的根系和生长空间。",
    focus: ["高差比例", "根系独立性", "冠幅呼应"],
    boundary: "“父子”是地方命名和形态联想，模型不推断植物遗传关系。",
    images: imageList("father-son-cypress", ["01.webp", "image2-v2.webp"])
  },
  {
    slug: "brotherhood-cypress", name: "结义柏", aliases: ["结义柏"], type: "grove", accent: 0x7b8a55,
    subtitle: "多株古柏围合的同行空间",
    summary: "三株古柏围合出可停留的路边空间，用视线互相穿插表现“结义”的文化意象。",
    focus: ["多树围合", "林下停留", "道路穿行"],
    boundary: "结义叙事属于三国文化投射，树体数量与现场形态以实拍图为对照。",
    images: imageList("brotherhood-cypress", ["01.webp"])
  },
  {
    slug: "huangshang-tomb", name: "黄裳墓", aliases: ["黄裳墓"], type: "tomb", accent: 0x8d7354,
    subtitle: "墓冢、碑刻与黄裳行迹的静谧节点",
    summary: "场景以墓冢、碑刻、松柏和远山构成克制的纪念空间，承接黄裳走向剑阁的历史链条。",
    focus: ["墓冢形制", "碑刻位置", "行旅方向"],
    boundary: "墓址、人物行迹与文献关系以项目现有资料为依据；缺少证据的部分标明为艺术化表达。",
    images: imageList("huangshang-tomb", ["01.webp", "02.webp", "03.webp"])
  },
  {
    slug: "cuiyun-tower", name: "翠云楼", aliases: ["翠云楼"], type: "tower", accent: 0xb5623f,
    subtitle: "楼阁、古道与翠云廊的立体门户",
    summary: "通过台基、楼阁、林冠和山谷四层景深，把翠云楼从单个模型还原为蜀道入口地标。",
    focus: ["楼阁台基", "屋顶轮廓", "古道轴线"],
    boundary: "建筑模型用于旅游展示与空间理解，细部不等同于测绘级复原。",
    models: [{ url: "/models/travel/cuiyun-tower.glb", position: [0, 0, 1.5], height: 9 }],
    images: imageList("cuiyun-tower", ["01.webp"])
  },
  {
    slug: "white-dragon-temple", name: "白龙寺", aliases: ["白龙寺"], type: "temple", accent: 0xa2573f,
    subtitle: "山门、院落与古道香火",
    summary: "从山门进入前院，再以主殿和侧柏收束视线，表现寺院与行旅道路的空间关系。",
    focus: ["山门层次", "院落中轴", "寺路相接"],
    boundary: "缺少精确测绘的构件按传统川北建筑语汇进行艺术化补建，并明确标注非考古复原。",
    images: imageList("white-dragon-temple", ["01.webp"])
  },
  {
    slug: "shizi-post", name: "石子铺", aliases: ["石子铺"], type: "post", accent: 0xb37b4e,
    subtitle: "蜀道驿铺的临路生活切片",
    summary: "用铺面、檐廊、石板路和歇脚区构成可读的道路服务节点，补足原模型缺少的人间尺度。",
    focus: ["临路铺面", "檐下歇脚", "石板铺装"],
    boundary: "驿铺陈设为依据站点性质的情境化表达，不宣称复原某一确定年代的原貌。",
    images: imageList("shizi-post", ["01.webp"])
  },
  {
    slug: "kangtian-post", name: "康天铺", aliases: ["康天铺"], type: "post", accent: 0xa87345,
    subtitle: "山路转折处的驿铺节点",
    summary: "把驿铺嵌入坡道弯折，并加入货架、灯笼与拴马桩的尺度提示，呈现古道日常。",
    focus: ["坡道转折", "驿铺开间", "行旅设施"],
    boundary: "具体陈设为旅游叙事所需的艺术化补充，历史信息仍以右侧原始资料为准。",
    images: imageList("kangtian-post", ["01.webp"])
  },
  {
    slug: "liuchigou-post", name: "柳池沟驿遗址", aliases: ["柳池沟驿遗址", "柳池沟驿"], type: "ruin", accent: 0x8d7351,
    subtitle: "遗址边界与山沟驿路",
    summary: "以残墙、基址、旧路和沟谷水线组织场景，让遗址的范围和交通位置一眼可辨。",
    focus: ["残墙基址", "旧路走向", "沟谷地形"],
    boundary: "模型只做遗址范围和空间关系说明，不补造没有文献或测绘支持的完整建筑。",
    images: imageList("liuchigou-post", ["01.webp", "02.webp"])
  }
];

const stationBySlug = new Map(stationProfiles.map((profile) => [profile.slug, profile]));
let currentExplorer = null;

function makeMaterial(color, roughness = 0.82, metalness = 0.02) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function addMesh(parent, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], name = "") {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createCypress({ height = 10, lean = 0, canopy = 1, roots = false, seed = 7 } = {}) {
  const random = seededRandom(seed);
  const group = new THREE.Group();
  group.userData.label = "古柏主体：可拖动环看树干、根系和树冠层次";
  const bark = makeMaterial(0x4e3325, 1);
  const barkLight = makeMaterial(0x6c4932, 0.96);
  const leaf = makeMaterial(0x244d3b, 0.94);
  const leafLight = makeMaterial(0x3d674b, 0.9);
  const segments = 7;
  for (let index = 0; index < segments; index += 1) {
    const segmentHeight = height / segments * 1.06;
    const y = index * height / segments + segmentHeight / 2;
    const radiusBottom = 0.82 * (1 - index / (segments + 2)) + 0.12;
    const radiusTop = Math.max(0.12, radiusBottom * 0.76);
    const x = lean * Math.pow(index / segments, 1.4) + (random() - 0.5) * 0.08;
    const trunk = addMesh(group, new THREE.CylinderGeometry(radiusTop, radiusBottom, segmentHeight, 10, 2), index % 2 ? barkLight : bark, [x, y, 0], [0, 0, -lean * 0.018], "古柏树干");
    trunk.rotation.y = random() * 0.3;
  }
  for (let index = 0; index < 19; index += 1) {
    const level = 0.38 + random() * 0.57;
    const angle = index * 2.399;
    const radius = (0.7 + random() * 1.25) * canopy * (0.55 + level * 0.5);
    const x = lean * Math.pow(level, 1.4) + Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = height * level + random() * 1.2;
    addMesh(group, new THREE.IcosahedronGeometry((0.68 + random() * 0.76) * canopy, 1), index % 3 ? leaf : leafLight, [x, y, z], [random() * 0.3, random() * 0.5, random() * 0.3], "古柏树冠");
  }
  const rootCount = roots ? 10 : 6;
  for (let index = 0; index < rootCount; index += 1) {
    const angle = index / rootCount * Math.PI * 2;
    const length = (roots ? 3.2 : 2.1) * (0.75 + random() * 0.45);
    const root = addMesh(group, new THREE.CylinderGeometry(0.1, 0.34, length, 7), bark, [Math.cos(angle) * length * 0.42, 0.18, Math.sin(angle) * length * 0.42], [Math.sin(angle) * 0.16, 0, angle - Math.PI / 2], "古柏根系");
    root.rotation.z = angle - Math.PI / 2;
  }
  return group;
}

function createStoneRoad(scene) {
  const road = new THREE.Group();
  road.userData.label = "蜀道环境：石板尺度、弯折和坡度共同形成场景纵深";
  const stoneA = makeMaterial(0x756f60, 0.98);
  const stoneB = makeMaterial(0x928771, 0.96);
  for (let index = 0; index < 34; index += 1) {
    const z = -17 + index * 1.05;
    const x = Math.sin(index * 0.27) * 1.25;
    const y = Math.max(0.02, (index - 18) * 0.025);
    addMesh(road, new THREE.BoxGeometry(2.9 + (index % 3) * 0.18, 0.16, 0.88), index % 2 ? stoneA : stoneB, [x, y, z], [0, Math.sin(index * 0.27) * 0.08, (index - 18) * 0.001], "古道石板");
  }
  scene.add(road);
}

function createLandscape(scene, accent) {
  const earth = makeMaterial(0x3b4937, 1);
  const earthLight = makeMaterial(0x53604a, 1);
  addMesh(scene, new THREE.PlaneGeometry(80, 80, 1, 1), earth, [0, -0.14, 0], [-Math.PI / 2, 0, 0], "山地基面");
  const random = seededRandom(accent);
  for (let index = 0; index < 18; index += 1) {
    const side = index % 2 ? 1 : -1;
    const x = side * (9 + random() * 18);
    const z = -15 - random() * 23;
    const radius = 4 + random() * 7;
    addMesh(scene, new THREE.ConeGeometry(radius, 8 + random() * 13, 7), index % 3 ? earth : earthLight, [x, 2.6 + random() * 2, z], [0, random() * Math.PI, 0], "远山");
  }
  createStoneRoad(scene);
}

function createRoof(parent, position, width, depth, accentMaterial) {
  const roof = addMesh(parent, new THREE.CylinderGeometry(0.18, 0.18, width + 1, 4), accentMaterial, [position[0], position[1], position[2]], [0, 0, Math.PI / 2], "屋顶");
  roof.scale.z = depth * 2.25;
  return roof;
}

function createHall({ width = 7, depth = 4.5, height = 3.8, open = false } = {}) {
  const group = new THREE.Group();
  group.userData.label = "建筑主体：台基、柱网、檐廊与道路中轴形成完整空间";
  const wood = makeMaterial(0x6e2e24, 0.82);
  const wall = makeMaterial(0xb6a481, 0.96);
  const tile = makeMaterial(0x263734, 0.84);
  const stone = makeMaterial(0x807762, 1);
  addMesh(group, new THREE.BoxGeometry(width + 1.2, 0.45, depth + 1), stone, [0, 0.22, 0], [0, 0, 0], "建筑台基");
  addMesh(group, new THREE.BoxGeometry(width, height - 0.8, 0.26), wall, [0, height / 2, -depth / 2 + 0.35], [0, 0, 0], "后墙");
  addMesh(group, new THREE.BoxGeometry(0.25, height - 0.7, depth), wall, [-width / 2 + 0.1, height / 2, 0], [0, 0, 0], "侧墙");
  addMesh(group, new THREE.BoxGeometry(0.25, height - 0.7, depth), wall, [width / 2 - 0.1, height / 2, 0], [0, 0, 0], "侧墙");
  for (let index = 0; index < 5; index += 1) {
    const x = -width / 2 + index * width / 4;
    addMesh(group, new THREE.CylinderGeometry(0.15, 0.18, height, 10), wood, [x, height / 2 + 0.42, depth / 2 - 0.35], [0, 0, 0], "木柱");
  }
  if (!open) addMesh(group, new THREE.BoxGeometry(width * 0.55, height * 0.64, 0.18), wood, [0, height * 0.38, depth / 2 - 0.25], [0, 0, 0], "建筑门扇");
  createRoof(group, [0, height + 0.55, 0], width, depth, tile);
  return group;
}

function createPostScene(scene, ruin = false) {
  const group = new THREE.Group();
  group.position.set(0.6, 0, 3.2);
  if (ruin) {
    const stone = makeMaterial(0x867965, 1);
    addMesh(group, new THREE.BoxGeometry(7, 0.35, 5), stone, [0, 0.18, 0], [0, 0, 0], "驿站基址");
    addMesh(group, new THREE.BoxGeometry(5.8, 1.2, 0.45), stone, [0, 0.62, 2], [0.04, 0.03, 0], "遗址残墙");
    addMesh(group, new THREE.BoxGeometry(0.45, 1.7, 3.8), stone, [-2.7, 0.85, 0], [0, 0.05, 0.03], "遗址残墙");
  } else {
    group.add(createHall({ width: 6.5, depth: 4.2, height: 3.3, open: true }));
    const wood = makeMaterial(0x6c412a, 0.9);
    const fabric = makeMaterial(0x8e6847, 1);
    const lantern = new THREE.MeshStandardMaterial({ color: 0x9e392b, emissive: 0x5b160f, emissiveIntensity: 1.25, roughness: 0.72 });
    addMesh(group, new THREE.BoxGeometry(3.5, 0.75, 0.8), wood, [0.5, 0.95, 0.8], [0, 0, 0], "驿铺柜台");
    addMesh(group, new THREE.BoxGeometry(5, 0.14, 0.45), wood, [0, 1.25, -1.65], [0, 0, 0], "货架");
    addMesh(group, new THREE.BoxGeometry(5, 0.14, 0.45), wood, [0, 2.15, -1.65], [0, 0, 0], "货架");
    for (let index = 0; index < 5; index += 1) {
      addMesh(group, new THREE.BoxGeometry(0.12, 2.2, 0.34), wood, [-2 + index, 1.55, -1.6], [0, 0, 0], "货架立柱");
      addMesh(group, new THREE.SphereGeometry(0.28 + (index % 2) * 0.07, 10, 8), fabric, [-1.8 + index * 0.85, 1.48 + (index % 2) * 0.55, -1.22], [0, 0, 0], "行旅货包");
    }
    addMesh(group, new THREE.BoxGeometry(2.3, 0.22, 0.62), wood, [-1.65, 0.52, 2.55], [0, 0, 0], "檐下长凳");
    [-2.4, 2.4].forEach((x) => {
      addMesh(group, new THREE.CylinderGeometry(0.28, 0.34, 0.62, 10), lantern, [x, 2.55, 2.08], [0, 0, 0], "驿铺灯笼");
      const light = new THREE.PointLight(0xd88345, 0.9, 4.5);
      light.position.set(x, 2.5, 2.15);
      group.add(light);
    });
    for (let index = 0; index < 3; index += 1) {
      addMesh(group, new THREE.CylinderGeometry(0.07, 0.07, 1.6, 8), wood, [-2.8 + index * 2.8, 0.8, -3.2], [0, 0, 0], "拴马桩");
    }
  }
  group.userData.label = ruin ? "驿站遗址：残墙只表达遗址边界，不补造完整原貌" : "驿铺场景：檐下空间、柜台和歇脚设施补充行旅尺度";
  scene.add(group);
}

function createTombScene(scene) {
  const group = new THREE.Group();
  group.position.set(1.4, 0, 1);
  const earth = makeMaterial(0x566147, 1);
  const stone = makeMaterial(0x817b6c, 0.96);
  addMesh(group, new THREE.SphereGeometry(3.4, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), earth, [0, 0, 2], [0, 0, 0], "黄裳墓冢");
  addMesh(group, new THREE.BoxGeometry(1.15, 3.6, 0.45), stone, [0, 1.8, -0.2], [0, 0, 0], "纪念碑刻");
  addMesh(group, new THREE.BoxGeometry(1.75, 0.3, 0.85), stone, [0, 0.15, -0.2], [0, 0, 0], "碑座");
  const left = createCypress({ height: 7, canopy: 0.72, seed: 17 }); left.position.set(-4, 0, 2); group.add(left);
  const right = createCypress({ height: 7.5, canopy: 0.72, seed: 23 }); right.position.set(4, 0, 2.5); group.add(right);
  group.userData.label = "纪念空间：墓冢、碑刻和松柏共同构成安静的行旅节点";
  scene.add(group);
}

function createProceduralCenter(scene, profile) {
  if (profile.type === "post") return createPostScene(scene, false);
  if (profile.type === "ruin") return createPostScene(scene, true);
  if (profile.type === "tomb") return createTombScene(scene);
  if (profile.type === "temple") {
    const gate = createHall({ width: 6, depth: 3.4, height: 3.6, open: true }); gate.position.set(0, 0, -2); scene.add(gate);
    const hall = createHall({ width: 8.5, depth: 5.2, height: 4.5 }); hall.position.set(0, 0, 5); scene.add(hall);
    return;
  }
  if (profile.type === "shrine" || profile.type === "tower" || profile.type === "zhangfei" || profile.models) return;
  const configs = profile.type === "couple"
    ? [{ x: -2.2, z: 0, height: 10.8, lean: 0.7, seed: 11 }, { x: 2.2, z: 1, height: profile.slug === "father-son-cypress" ? 7.8 : 10.2, lean: -0.55, seed: 19 }]
    : profile.type === "grove"
      ? [{ x: -3, z: 1, height: 10, seed: 7 }, { x: 0, z: 2.3, height: 11, seed: 13 }, { x: 3, z: 0, height: 9.5, seed: 29 }]
      : [{ x: 0, z: 1.1, height: 11.8, lean: profile.slug === "weiyan-cypress" ? 1.8 : 0.35, roots: profile.type === "roots", seed: profile.slug.length * 17 }];
  configs.forEach((config) => {
    const tree = createCypress(config);
    tree.position.set(config.x, 0, config.z);
    scene.add(tree);
  });
  if (profile.type === "bird") {
    const branchMaterial = makeMaterial(0x4b3023, 1);
    const branch = addMesh(scene, new THREE.CylinderGeometry(0.12, 0.27, 4.8, 8), branchMaterial, [1.5, 7.7, 0], [0, 0, -1.05], "神鸟形枝干");
    branch.userData.label = "神鸟剪影：请从正面侧光视角观察枝干组合";
  }
}

function addBackgroundCypresses(scene, seed) {
  const random = seededRandom(seed);
  for (let index = 0; index < 10; index += 1) {
    const tree = createCypress({ height: 4.5 + random() * 3, canopy: 0.52, seed: seed + index * 5 });
    const side = index % 2 ? 1 : -1;
    tree.position.set(side * (6.2 + random() * 5), 0, -13 + index * 1.9 + random());
    tree.rotation.y = random() * Math.PI;
    scene.add(tree);
  }
}

function normalizeModel(model, targetHeight, position) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  if (!Number.isFinite(size.y) || size.y <= 0) throw new Error("模型尺寸无效");
  const scale = targetHeight / size.y;
  model.scale.setScalar(scale);
  const scaledBox = new THREE.Box3().setFromObject(model);
  const center = scaledBox.getCenter(new THREE.Vector3());
  model.position.set(position[0] - center.x, position[1] - scaledBox.min.y, position[2] - center.z);
  model.traverse((object) => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
    object.material = object.material?.clone?.() || object.material;
    if (object.material) {
      object.material.roughness = Math.max(0.58, object.material.roughness ?? 0.75);
      object.material.needsUpdate = true;
    }
  });
  model.userData.label = "站点真实模型：已放入古道、山势和植被组成的完整环境中";
  return model;
}

async function loadModels(scene, profile, updateStatus) {
  if (!profile.models?.length) return [];
  const draco = new DRACOLoader();
  draco.setDecoderPath("/draco/");
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  const loaded = [];
  for (let index = 0; index < profile.models.length; index += 1) {
    const item = profile.models[index];
    try {
      const progressValue = 60 + (index / profile.models.length) * 26;
      updateStatus(`正在装载主体模型 ${index + 1}/${profile.models.length}`, progressValue);
      const result = await loader.loadAsync(item.url);
      const model = normalizeModel(result.scene, item.height, item.position);
      scene.add(model);
      loaded.push(model);
      updateStatus(`主体模型 ${index + 1}/${profile.models.length} 已就位`, progressValue + 8 / profile.models.length);
    } catch (error) {
      console.warn(`[站点场景] ${profile.name} 模型加载失败，已保留程序化环境。`, error);
    }
  }
  draco.dispose();
  return loaded;
}

function profileFromText(text) {
  if (!text) return null;
  for (const profile of stationProfiles) {
    if (profile.aliases.some((alias) => text.includes(alias))) return profile;
  }
  return null;
}

function stationSummaryMarkup(profile) {
  const gallery = profile.images.map((src, index) => `
    <button class="station-real-thumb" type="button" data-station-open="${profile.slug}" data-photo-index="${index}" aria-label="查看${profile.name}实拍图${index + 1}">
      <img src="${src}" alt="${profile.name}实拍资料 ${index + 1}" loading="lazy">
    </button>`).join("");
  return `
    <section class="station-depth-summary" data-station-summary="${profile.slug}">
      <div class="station-depth-heading">
        <span>SCENE DEPTH · 场景深度升级</span>
        <b>${profile.subtitle}</b>
      </div>
      <p>${profile.summary}</p>
      <ul>${profile.focus.map((item) => `<li>${item}</li>`).join("")}</ul>
      <div class="station-boundary"><i>史实边界</i><span>${profile.boundary}</span></div>
      <button class="station-immersive-button" type="button" data-station-open="${profile.slug}">
        <span>进入完整 3D 场景</span><small>拖动环看 · 滚轮远近 · 实拍对照</small>
      </button>
      <div class="station-real-block">
        <div><b>真实影像</b><small>项目本地资料 · 点击放大对照</small></div>
        <div class="station-real-gallery">${gallery}</div>
      </div>
    </section>`;
}

function enrichOpenStation() {
  const candidates = [...document.querySelectorAll(".travel-detail-copy")];
  if (!candidates.length) {
    document.querySelectorAll('[role="dialog"]').forEach((dialog) => {
      const heading = dialog.querySelector("h2");
      const profile = profileFromText(heading?.textContent || "");
      if (profile) candidates.push(heading.parentElement || dialog);
    });
  }
  candidates.forEach((container) => {
    const localHeading = container.querySelector("h2, h3");
    const heading = localHeading || container.closest('[role="dialog"]')?.querySelector("h2, h3");
    const profile = profileFromText(heading?.textContent || container.textContent || "");
    if (!profile) return;
    container.querySelectorAll(".station-depth-summary").forEach((summary) => {
      if (summary.dataset.stationSummary !== profile.slug) summary.remove();
    });
    if (container.querySelector(`[data-station-summary="${profile.slug}"]`)) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = stationSummaryMarkup(profile).trim();
    const summary = wrapper.firstElementChild;
    if (localHeading) localHeading.insertAdjacentElement("afterend", summary);
    else container.prepend(summary);
  });
}

function explorerMarkup(profile) {
  return `
    <div class="station-explorer" role="dialog" aria-modal="true" aria-label="${profile.name}完整3D场景" data-station-explorer="${profile.slug}">
      <div class="station-canvas" aria-label="可交互三维场景"></div>
      <div class="station-explorer-topline">
        <div><small>SHU ROAD · IMMERSIVE SITE</small><h2>${profile.name}</h2><p>${profile.subtitle}</p></div>
        <div class="station-explorer-top-actions">
          <button class="station-explorer-home" type="button" aria-label="返回主界面">返回主界面</button>
          <button class="station-explorer-close" type="button" aria-label="关闭完整3D场景">关闭 ×</button>
        </div>
      </div>
      <aside class="station-explorer-panel">
        <header><span>观察导引</span><b>${profile.summary}</b></header>
        <ol>${profile.focus.map((item, index) => `<li><i>0${index + 1}</i><span>${item}</span></li>`).join("")}</ol>
        <div class="station-explorer-boundary"><small>FACT / ART</small><p>${profile.boundary}</p></div>
        <div class="station-explorer-photos">
          <div><b>实拍对照</b><small>${profile.images.length} 张本地资料</small></div>
          <div>${profile.images.map((src, index) => `<button type="button" data-explorer-photo="${index}"><img src="${src}" alt="${profile.name}实拍资料${index + 1}"></button>`).join("")}</div>
        </div>
      </aside>
      <div class="station-view-actions">
        <button type="button" data-station-view="overview">全景</button>
        <button type="button" data-station-view="subject">近观主体</button>
        <button type="button" data-station-view="road">沿古道</button>
      </div>
      <p class="station-object-hint">拖动旋转 · 滚轮缩放 · 点击场景了解结构</p>
      <div class="station-object-info">${profile.subtitle}</div>
      <div class="station-photo-lightbox" hidden><button type="button" aria-label="关闭实拍图">返回场景 ×</button><img alt=""><p></p></div>
      <div class="station-loading" style="--station-accent:#${profile.accent.toString(16).padStart(6, "0")}">
        <div class="station-loading-mountains" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="station-loading-rings" aria-hidden="true"><i></i><i></i><i></i><b>蜀</b></div>
        <div class="station-loading-content">
          <small>SHU ROAD · DIGITAL SITE</small>
          <strong>${profile.name}</strong>
          <span class="station-loading-status">正在校验本地场景资源</span>
          <div class="station-loading-track" aria-hidden="true"><i></i></div>
          <div class="station-loading-stages" aria-hidden="true">
            <b>资源校验</b><b>环境构建</b><b>主体装载</b><b>光影完成</b>
          </div>
        </div>
        <div class="station-loading-value"><b>08</b><small>%</small></div>
      </div>
    </div>`;
}

async function openStationExplorer(profile, initialPhoto = null) {
  if (!profile) return;
  currentExplorer?.close();
  const host = document.createElement("div");
  host.innerHTML = explorerMarkup(profile).trim();
  const root = host.firstElementChild;
  document.body.appendChild(root);
  document.body.classList.add("station-explorer-open");

  const canvasHost = root.querySelector(".station-canvas");
  const loading = root.querySelector(".station-loading");
  const status = loading.querySelector(".station-loading-status");
  const loadingBar = loading.querySelector(".station-loading-track i");
  const loadingValue = loading.querySelector(".station-loading-value b");
  const loadingStages = [...loading.querySelectorAll(".station-loading-stages b")];
  const objectInfo = root.querySelector(".station-object-info");
  const lightbox = root.querySelector(".station-photo-lightbox");
  let renderer;
  let controls;
  let frameId = 0;
  let closed = false;
  let resizeObserver;
  const loadingStartedAt = performance.now();
  const setLoadingState = (value, message) => {
    const safeValue = Math.max(0, Math.min(100, Math.round(value)));
    status.textContent = message;
    loadingBar.style.width = `${safeValue}%`;
    loadingValue.textContent = String(safeValue).padStart(2, "0");
    const activeStage = Math.min(loadingStages.length - 1, Math.floor(safeValue / 25));
    loadingStages.forEach((stage, index) => {
      stage.classList.toggle("is-active", index <= activeStage);
      stage.classList.toggle("is-current", index === activeStage);
    });
  };
  setLoadingState(8, "正在校验本地场景资源");

  const close = () => {
    if (closed) return;
    closed = true;
    cancelAnimationFrame(frameId);
    resizeObserver?.disconnect();
    controls?.dispose();
    renderer?.dispose();
    root.remove();
    document.body.classList.remove("station-explorer-open");
    document.removeEventListener("keydown", onKeydown);
    currentExplorer = null;
  };
  const onKeydown = (event) => { if (event.key === "Escape") close(); };
  document.addEventListener("keydown", onKeydown);
  root.querySelector(".station-explorer-close").addEventListener("click", close);
  root.querySelector(".station-explorer-home").addEventListener("click", () => {
    const mainPageButton = [...document.querySelectorAll("button")].find((button) =>
      button !== root.querySelector(".station-explorer-home") && button.textContent?.includes("返回主界面")
    );
    close();
    if (mainPageButton) window.requestAnimationFrame(() => mainPageButton.click());
    else window.location.assign("/");
  });

  const showPhoto = (index) => {
    const safeIndex = Math.max(0, Math.min(profile.images.length - 1, Number(index) || 0));
    const image = lightbox.querySelector("img");
    image.src = profile.images[safeIndex];
    image.alt = `${profile.name}实拍资料 ${safeIndex + 1}`;
    lightbox.querySelector("p").textContent = `${profile.name} · 实拍资料 ${safeIndex + 1}/${profile.images.length}`;
    lightbox.hidden = false;
  };
  lightbox.querySelector("button").addEventListener("click", () => { lightbox.hidden = true; });
  root.querySelectorAll("[data-explorer-photo]").forEach((button) => button.addEventListener("click", () => showPhoto(button.dataset.explorerPhoto)));

  try {
    setLoadingState(18, "正在建立剑门空间坐标");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1716);
    scene.fog = new THREE.FogExp2(0x10211e, 0.022);
    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 180);
    camera.position.set(17, 10, 22);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    const deviceMemory = Number(navigator.deviceMemory || 8);
    const coreCount = Number(navigator.hardwareConcurrency || 8);
    const maxPixelRatio = deviceMemory <= 4 || coreCount <= 4 ? 1 : 1.35;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    canvasHost.appendChild(renderer.domElement);
    setLoadingState(34, "正在生成山势与古道纵深");

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 4.2, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 4.5;
    controls.maxDistance = 48;
    controls.maxPolarAngle = Math.PI * 0.49;

    scene.add(new THREE.HemisphereLight(0xb8d8cf, 0x2a2118, 1.7));
    const keyLight = new THREE.DirectionalLight(profile.accent, 4.1);
    keyLight.position.set(-10, 19, 11);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -24;
    keyLight.shadow.camera.right = 24;
    keyLight.shadow.camera.top = 24;
    keyLight.shadow.camera.bottom = -24;
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x7aaea4, 2.1);
    rimLight.position.set(12, 8, -16);
    scene.add(rimLight);

    createLandscape(scene, profile.accent);
    addBackgroundCypresses(scene, profile.slug.length * 131);
    createProceduralCenter(scene, profile);
    setLoadingState(52, "正在构建站点环境细节");
    await loadModels(scene, profile, (message, progressValue = 68) => { setLoadingState(progressValue, message); });
    if (closed) return;
    setLoadingState(91, "正在校准体积光与阴影");

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    renderer.domElement.addEventListener("pointerdown", (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(scene.children, true)[0];
      if (!hit) return;
      let target = hit.object;
      while (target && !target.userData.label && target.parent) target = target.parent;
      objectInfo.textContent = target?.userData?.label || hit.object.name || profile.subtitle;
    });

    const cameraViews = {
      overview: { position: [17, 10, 22], target: [0, 4.2, 0] },
      subject: { position: [8.5, 6.8, 11], target: [0, 4.5, 0.5] },
      road: { position: [3.2, 2.4, -13], target: [0, 2.8, 5] }
    };
    const moveCamera = (viewName) => {
      const view = cameraViews[viewName] || cameraViews.overview;
      camera.position.set(...view.position);
      controls.target.set(...view.target);
      controls.update();
    };
    root.querySelectorAll("[data-station-view]").forEach((button) => button.addEventListener("click", () => moveCamera(button.dataset.stationView)));

    const resize = () => {
      const width = Math.max(1, canvasHost.clientWidth);
      const height = Math.max(1, canvasHost.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvasHost);
    currentExplorer = { close };
    let lastRenderTime = 0;
    const renderInterval = 1000 / 30;
    const animate = (time = 0) => {
      if (closed) return;
      frameId = requestAnimationFrame(animate);
      if (document.hidden || time - lastRenderTime < renderInterval) return;
      lastRenderTime = time;
      controls.update();
      renderer.render(scene, camera);
    };
    resize();
    animate();
    setLoadingState(100, "场景装载完成 · 正在开启视野");
    const minimumLoadingTime = Math.max(0, 360 - (performance.now() - loadingStartedAt));
    await new Promise((resolve) => window.setTimeout(resolve, minimumLoadingTime));
    if (closed) return;
    loading.classList.add("is-complete");
    window.setTimeout(() => loading.classList.add("is-hidden"), 420);
    if (initialPhoto !== null) showPhoto(initialPhoto);
  } catch (error) {
    console.error("[站点场景] 初始化失败", error);
    loading.innerHTML = `<strong>三维场景暂时无法启动</strong><span>仍可使用右侧实拍资料进行浏览</span>`;
    if (initialPhoto !== null) showPhoto(initialPhoto);
  }
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-station-open]");
  if (!trigger) return;
  const profile = stationBySlug.get(trigger.dataset.stationOpen);
  if (!profile) return;
  openStationExplorer(profile, trigger.dataset.photoIndex ?? null);
});

const stationObserver = new MutationObserver(() => window.requestAnimationFrame(enrichOpenStation));
stationObserver.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("DOMContentLoaded", enrichOpenStation, { once: true });
