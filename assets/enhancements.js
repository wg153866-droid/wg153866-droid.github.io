(function () {
  "use strict";

  const PRELUDE_DURATION = 7400;
  const voiceManifestUrl = "/audio/voice-manifest.json";
  const astronomyPages = [
    { label: "创制背景", icon: "观", name: "观象", fact: "1190年", note: "观测 · 整理 · 绘图" },
    { label: "八幅图卡", icon: "垣", name: "图说", fact: "三垣四象", note: "二十八宿 · 天区秩序" },
    { label: "交互星图", icon: "穹", name: "星穹", fact: "黄道 · 赤道", note: "银河 · 星官图层" },
    { label: "石碑与当代价值", icon: "石", name: "流传", fact: "1247年刻石", note: "约1400余颗恒星" }
  ];

  const cardStories = {
    "紫微垣": {
      nodes: ["北天辨极", "历代星官定名", "黄裳绘入天文图", "1247年勒石流传"],
      story: "艺术演绎：黄裳在夜色中先辨北天中央，再把紫微垣作为整幅星图的秩序起点。这里不是“发现一颗新星”，而是把前代观测与自己的校理组织成可讲授的图。"
    },
    "太微垣": {
      nodes: ["观察中天星区", "以朝廷职官命名", "嘉王府讲授", "石刻与拓片保存"],
      story: "艺术演绎：面对嘉王，黄裳借太微垣讲解天上朝廷。星官名称把人间制度投向天空，也让抽象方位变成可以记忆、可以讨论的知识。"
    },
    "天市垣": {
      nodes: ["辨认东南天区", "市肆经验入星空", "三垣相互对照", "数字图层重现"],
      story: "艺术演绎：黄裳从市垣、列肆等名称谈起，让学习者发现，古人的星空不只有宫廷，也容纳贸易与日常生活。"
    },
    "东方苍龙": {
      nodes: ["春夜观东方", "角亢氐房心尾箕", "七宿连成苍龙", "方位与季节相连"],
      story: "艺术演绎：春夜里，黄裳沿角、亢、氐、房、心、尾、箕依次指认，让零散星点在讲述中形成东方苍龙。"
    },
    "北方玄武": {
      nodes: ["冬夜观北方", "斗牛女虚危室壁", "七宿组成玄武", "四象体系定向"],
      story: "艺术演绎：黄裳提醒学习者，玄武不是一颗星，而是北方七宿在长期观测和文化想象中形成的组合。"
    },
    "西方白虎": {
      nodes: ["秋夜观西方", "奎娄胃昴毕觜参", "七宿连缀成形", "对照星图定位"],
      story: "艺术演绎：黄裳以七宿次序校对西方天区，先讲位置，再讲白虎意象，避免让传说遮住真实的星位关系。"
    },
    "南方朱雀": {
      nodes: ["夏夜观南方", "井鬼柳星张翼轸", "七宿组成朱雀", "历法与方位并读"],
      story: "艺术演绎：从井宿到轸宿，黄裳用一条连续的观察路径串起南方七宿，让季节、方向和图像共同帮助记忆。"
    },
    "黄道与银河": {
      nodes: ["记录日行路径", "辨认银河星带", "黄道银河分别绘制", "现代图层叠加比较"],
      story: "艺术演绎：黄裳把黄道与银河分开讲解——一条关联太阳周年视运动，一条是横贯夜空的明亮星带；叠图比较，才不会混为一谈。"
    }
  };

  const travelStops = [
    "剑阁柏", "夫妻柏", "帅大柏", "阿斗柏", "黄忠柏", "魏延柏", "隆中对柏", "李璧柏与李璧祠",
    "汉砖柏", "龙爪柏", "神鸟柏", "张飞像与张飞井", "父子柏", "结义柏", "黄裳墓", "翠云楼",
    "白龙寺", "石子铺", "康天铺", "柳池沟驿遗址"
  ];

  const travelDialogues = {
    "剑阁柏": "今人先看树干、树冠和青石古道的关系。我行蜀道时它或已成荫，但“少年曾在树下观星”属于本项目的艺术想象，不作确定史实。",
    "夫妻柏": "先看两干合生、枝条交错的自然形态，再读夫妻相守的地方寓意；一边是树，一边是人赋予它的温情。",
    "帅大柏": "请退后几步，用人物与护栏作尺度参照，再从根部望到树冠，才能感到“翠云如廊”的气势。",
    "阿斗柏": "歪斜扭曲是可见树形，与刘禅相连的讲述属于地方传说。把树体观察和人物故事分开，反而更有意思。",
    "黄忠柏": "树名寄托了老当益壮的想象，但人物与此树是否直接相关仍需证据；不妨先读树形，再读三国记忆。",
    "魏延柏": "古柏和将军名号在地方记忆里相遇。先看树在古道旁的位置，再理解人们为何把勇猛形象寄托于它。",
    "隆中对柏": "两株相向而生，像一说一听，这是由树形生出的文化联想。它提醒今人：好故事也应标明它属于哪类资料。",
    "李璧柏与李璧祠": "古柏、祠宇和碑记共同指向修路植柏的公共工程。李璧生活在我之后数百年，这是一段跨时代的地方纪念。",
    "汉砖柏": "请低头看根系与砖石怎样相接。自然生长和道路遗存出现在同一处，比单看一个年代数字更能说明问题。",
    "龙爪柏": "“龙爪”是形态联想，不是植物分类。先顺着裸露根系的方向观察，再看它如何抓住坡地与古道。",
    "神鸟柏": "换到侧面，树干与枝组会像展开的羽翼。神鸟之名来自观看方式，地方想象让自然轮廓有了故事。",
    "张飞像与张飞井": "人物造型属于艺术演绎，植柏与井台故事按地方传说呈现。今人可以亲近故事，同时保留辨别来源的习惯。",
    "父子柏": "一大一小相邻而生，于是有了父子相护的温情解释。先确认真实空间关系，再体会后人赋予的伦理寓意。",
    "结义柏": "三股枝势让人联想到桃园结义。这里讲的是树形如何承载三国文化，而不是把树名当成正史证据。",
    "黄裳墓": "请把人物生平、墓址沿革与现场遗存三条线分开核对。墓址资料仍待进一步考证，谨慎并不会削弱敬意。",
    "翠云楼": "登高后先找古道走向，再找依路延伸的柏树带，最后看远山；这一回望，才是路线真正的收束。",
    "白龙寺": "寺院说明古道不仅运送人员与物资，也连接信仰、聚落和日常生活。先看建筑与道路的位置关系。",
    "石子铺": "铺舍是古代行程的节拍器：歇脚、补给、交换消息。古蜀道的历史不只在雄关，也在这些日常节点。",
    "康天铺": "把它与石子铺对照，可理解铺舍如何服务不同行程。可见遗址、文献和复原想象需要分别标注。",
    "柳池沟驿遗址": "驿站承担人员、公文与物资的传递。今人阅读时，应区分现场遗存、地方记载与数字复原。"
  };

  const hotspotPrefixes = {
    "剑阁柏": "VO-TRAVEL-01",
    "帅大柏": "VO-TRAVEL-03",
    "李璧柏与李璧祠": "VO-TRAVEL-08",
    "张飞像与张飞井": "VO-TRAVEL-12",
    "翠云楼": "VO-TRAVEL-16"
  };

  function safeStorageGet(key) {
    try { return window.localStorage.getItem(key); } catch (error) { return null; }
  }

  function safeStorageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (error) { /* 隐私模式下不影响本次浏览。 */ }
  }

  let voiceEntries = new Map();
  let currentVoiceId = "";
  let currentEntry = null;
  let subtitleCues = [];
  let voiceMasterOn = safeStorageGet("xingtu-voice-enabled") !== "false";
  let subtitleOn = true;
  let enhanceQueued = false;
  let backgroundMusicOn = safeStorageGet("xingtu-background-music") !== "false";
  let voiceHideTimer = 0;
  let journeyCaptionShown = false;
  let allowLegacySoundToggle = false;
  let undoNavigation = null;

  const audio = new Audio();
  audio.preload = "metadata";
  audio.playbackRate = 0.93;
  audio.preservesPitch = true;
  let voiceAudioContext = null;
  let voiceAudioSource = null;
  const backgroundMusic = new Audio("/audio/background/zuiyu-changwan.ogg");
  backgroundMusic.preload = "auto";
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.135;

  function ensureSoftVoiceAudio() {
    if (voiceAudioSource) {
      if (voiceAudioContext && voiceAudioContext.state === "suspended") {
        voiceAudioContext.resume().catch(function () { /* 等待下一次用户点击。 */ });
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      audio.volume = 0.86;
      return;
    }

    try {
      voiceAudioContext = new AudioContextClass();
      voiceAudioSource = voiceAudioContext.createMediaElementSource(audio);

      const warmth = voiceAudioContext.createBiquadFilter();
      warmth.type = "lowshelf";
      warmth.frequency.value = 180;
      warmth.gain.value = 2.4;

      const presence = voiceAudioContext.createBiquadFilter();
      presence.type = "peaking";
      presence.frequency.value = 3100;
      presence.Q.value = 0.9;
      presence.gain.value = -2.2;

      const softness = voiceAudioContext.createBiquadFilter();
      softness.type = "highshelf";
      softness.frequency.value = 5600;
      softness.gain.value = -3.1;

      const compressor = voiceAudioContext.createDynamicsCompressor();
      compressor.threshold.value = -22;
      compressor.knee.value = 22;
      compressor.ratio.value = 1.65;
      compressor.attack.value = 0.026;
      compressor.release.value = 0.38;

      const output = voiceAudioContext.createGain();
      output.gain.value = 0.9;

      const storySpace = voiceAudioContext.createConvolver();
      const storySpaceDuration = 0.34;
      const storySpaceLength = Math.floor(voiceAudioContext.sampleRate * storySpaceDuration);
      const storySpaceBuffer = voiceAudioContext.createBuffer(2, storySpaceLength, voiceAudioContext.sampleRate);
      for (let channel = 0; channel < storySpaceBuffer.numberOfChannels; channel += 1) {
        const samples = storySpaceBuffer.getChannelData(channel);
        for (let index = 0; index < storySpaceLength; index += 1) {
          const decay = Math.pow(1 - index / storySpaceLength, 3.4);
          samples[index] = (Math.random() * 2 - 1) * decay;
        }
      }
      storySpace.buffer = storySpaceBuffer;

      const storySpaceTone = voiceAudioContext.createBiquadFilter();
      storySpaceTone.type = "lowpass";
      storySpaceTone.frequency.value = 3600;

      const storySpaceGain = voiceAudioContext.createGain();
      storySpaceGain.gain.value = 0.035;

      voiceAudioSource
        .connect(warmth)
        .connect(presence)
        .connect(softness)
        .connect(compressor);
      compressor.connect(output).connect(voiceAudioContext.destination);
      compressor
        .connect(storySpace)
        .connect(storySpaceTone)
        .connect(storySpaceGain)
        .connect(voiceAudioContext.destination);

      if (voiceAudioContext.state === "suspended") {
        voiceAudioContext.resume().catch(function () { /* 等待下一次用户点击。 */ });
      }
    } catch (error) {
      audio.volume = 0.86;
    }
  }

  const manifestReady = fetch(voiceManifestUrl)
    .then(function (response) {
      if (!response.ok) throw new Error("配音清单读取失败");
      return response.json();
    })
    .then(function (entries) {
      if (!Array.isArray(entries)) throw new Error("配音清单格式不正确");
      entries.forEach(function (entry) {
        if (entry && entry.id && entry.audio_name && entry.category) voiceEntries.set(entry.id, entry);
      });
      return voiceEntries;
    })
    .catch(function (error) {
      showVoiceError(error.message || "配音资源暂时不可用");
      return voiceEntries;
    });

  function setupPrelude() {
    const prelude = document.getElementById("premium-prelude");
    const progress = document.getElementById("prelude-progress");
    const percent = document.getElementById("prelude-percent");
    const status = document.getElementById("prelude-status");
    const stages = Array.from(prelude?.querySelectorAll(".prelude-stages span") || []);
    if (!prelude || !progress || !percent || !status) return;

    const startTime = Date.now();
    let completed = false;
    function update() {
      const ratio = Math.min(1, (Date.now() - startTime) / PRELUDE_DURATION);
      const value = Math.round(ratio * 100);
      progress.style.width = value + "%";
      percent.textContent = value + "%";
      prelude.style.setProperty("--prelude-progress", value + "%");
      const activeStage = Math.min(stages.length - 1, Math.floor(value / 26));
      stages.forEach(function (stage, index) {
        stage.classList.toggle("is-active", index <= activeStage);
        stage.classList.toggle("is-current", index === activeStage);
      });
      if (value < 30) status.textContent = "黄裳正沿柏影古道前行";
      else if (value < 68) status.textContent = "穿过千年古柏 · 关楼渐近";
      else if (value < 100) status.textContent = "抵近剑阁 · 镜头缓缓抬升";
      else status.textContent = "已抵剑阁关楼下 · 仰望";

      if (ratio < 1) {
        window.requestAnimationFrame(update);
      } else if (!completed) {
        completed = true;
        prelude.classList.add("is-reached");
        window.setTimeout(function () {
          prelude.classList.add("is-finished");
          window.setTimeout(function () { prelude.remove(); }, 1200);
        }, 950);
      }
    }
    window.requestAnimationFrame(update);
  }

  function startBackgroundMusic() {
    if (!backgroundMusicOn) return;
    backgroundMusic.play().then(function () {
      document.body.classList.remove("music-awaiting-gesture");
      updateMediaControlDock();
    }).catch(function () {
      document.body.classList.add("music-awaiting-gesture");
    });
  }

  function setBackgroundMusic(enabled) {
    backgroundMusicOn = Boolean(enabled);
    safeStorageSet("xingtu-background-music", String(backgroundMusicOn));
    if (backgroundMusicOn) startBackgroundMusic();
    else backgroundMusic.pause();
    updateMediaControlDock();
  }

  function duckBackgroundMusic(ducked) {
    backgroundMusic.volume = ducked ? 0.032 : 0.135;
  }

  function disableLegacySoundEffects() {
    const soundButton = Array.from(document.querySelectorAll(".global-actions button")).find(function (button) {
      return /开启声音|关闭声音/.test(button.textContent.trim());
    });
    if (!soundButton) return;
    if (soundButton.textContent.trim() === "关闭声音") {
      allowLegacySoundToggle = true;
      soundButton.click();
      allowLegacySoundToggle = false;
    }
    soundButton.classList.add("legacy-sound-control");
    soundButton.setAttribute("aria-hidden", "true");
    soundButton.tabIndex = -1;
  }

  function createVoiceConsole() {
    if (document.querySelector(".voice-console")) return;
    const consoleElement = document.createElement("section");
    consoleElement.className = "voice-console";
    consoleElement.setAttribute("aria-label", "黄裳V3配音播放器");
    consoleElement.innerHTML = [
      '<div class="voice-main">',
      '<button class="voice-toggle" type="button" aria-label="播放或暂停当前黄裳讲解">▶</button>',
      '<div class="voice-copy"><small>黄裳 · V3 柔声讲解</small><strong>选择页面或景点开始讲解</strong></div>',
      '<span class="voice-time">00:00 / 00:00</span>',
      '</div>',
      '<div class="voice-progress" role="slider" tabindex="0" aria-label="配音播放进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>',
      '<p class="voice-subtitle">讲解会在你点击页面、图卡或景点后播放</p>'
    ].join("");
    document.body.appendChild(consoleElement);

    consoleElement.querySelector(".voice-toggle").addEventListener("click", function () {
      if (!currentEntry) return;
      voiceMasterOn = true;
      safeStorageSet("xingtu-voice-enabled", "true");
      if (audio.paused) {
        ensureSoftVoiceAudio();
        audio.play().catch(function () { showVoiceError("请再次点击播放按钮"); });
      }
      else audio.pause();
    });

    const progress = consoleElement.querySelector(".voice-progress");
    progress.addEventListener("click", function (event) {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      const box = progress.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width));
      audio.currentTime = ratio * audio.duration;
    });
    progress.addEventListener("keydown", function (event) {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + (event.key === "ArrowRight" ? 5 : -5)));
      }
    });
  }

  function createMediaControlDock() {
    if (document.querySelector(".media-control-dock")) return;
    const dock = document.createElement("nav");
    dock.className = "media-control-dock";
    dock.setAttribute("aria-label", "声音与全站讲解控制");
    dock.innerHTML = [
      '<button type="button" class="voice-reopen-button" aria-label="打开或隐藏全站讲解"><b>讲</b><span>讲解</span></button>',
      '<button type="button" class="music-toggle-button" aria-label="开启或关闭古琴背景音乐"><b>乐</b><span>琴音</span></button>'
    ].join("");
    document.body.appendChild(dock);
    dock.querySelector(".voice-reopen-button").addEventListener("click", function () {
      const consoleElement = document.querySelector(".voice-console");
      if (!consoleElement) return;
      window.clearTimeout(voiceHideTimer);
      consoleElement.classList.toggle("is-visible");
    });
    dock.querySelector(".music-toggle-button").addEventListener("click", function () {
      setBackgroundMusic(!backgroundMusicOn);
    });
    updateMediaControlDock();
  }

  function updateMediaControlDock() {
    const musicButton = document.querySelector(".music-toggle-button");
    const voiceButton = document.querySelector(".voice-reopen-button");
    if (musicButton) {
      musicButton.classList.toggle("active", backgroundMusicOn && !backgroundMusic.paused);
      musicButton.classList.toggle("awaiting", backgroundMusicOn && backgroundMusic.paused);
      musicButton.querySelector("span").textContent = backgroundMusicOn ? "琴音" : "静音";
    }
    if (voiceButton) voiceButton.classList.toggle("active", Boolean(currentEntry && !audio.paused));
  }

  function scheduleVoiceConsoleHide(delay) {
    window.clearTimeout(voiceHideTimer);
    voiceHideTimer = window.setTimeout(function () {
      const consoleElement = document.querySelector(".voice-console");
      if (consoleElement) consoleElement.classList.remove("is-visible");
    }, delay || 1400);
  }

  function injectJourneyIntroCaption() {
    if (journeyCaptionShown || !document.body) return;
    const heading = Array.from(document.querySelectorAll("h1, h2, h3, strong")).find(function (node) {
      return /今日[，。,.]?从何处启程/.test(node.textContent.replace(/\s+/g, ""));
    });
    if (!heading) return;
    journeyCaptionShown = true;
    const caption = document.createElement("div");
    caption.className = "journey-intro-caption";
    caption.innerHTML = "<small>黄裳 · 行旅引</small><p>星河在上，蜀道在前。选择一卷，从此处启程。</p>";
    document.body.appendChild(caption);
    window.requestAnimationFrame(function () { caption.classList.add("is-visible"); });
    window.setTimeout(function () {
      caption.classList.remove("is-visible");
      window.setTimeout(function () { caption.remove(); }, 800);
    }, 5200);
  }

  function findButtonByText(pattern, scope) {
    return Array.from((scope || document).querySelectorAll("button")).find(function (button) {
      return pattern.test(button.textContent.replace(/\s+/g, "").trim()) && !button.disabled && !button.closest(".page-nav-dock, .media-control-dock");
    });
  }

  function clickWithUndo(button, undoResolver) {
    if (!button) return false;
    button.click();
    undoNavigation = typeof undoResolver === "function" ? undoResolver : null;
    updatePageNavDock();
    return true;
  }

  function navigateUp() {
    const modalClose = findButtonByText(/关闭|返回图卡|返回地图|返回导览图|×/, document.querySelector('[role="dialog"]') || document);
    if (modalClose) return clickWithUndo(modalClose, null);
    const back = findButtonByText(/返回主界面|返回首页|返回地图|上一层|返回/);
    if (back) return clickWithUndo(back, null);
    const brand = document.querySelector("button.brand, .brand button, button[aria-label*='主页']");
    return clickWithUndo(brand, null);
  }

  function navigateNext() {
    const detailNext = findButtonByText(/下一站|下一张|下一页/, document.querySelector(".travel-detail-nav, .card-detail-nav") || document);
    if (detailNext) return clickWithUndo(detailNext, function () { return findButtonByText(/上一站|上一张|上一页/)?.click(); });

    const pageButtons = Array.from(document.querySelectorAll(".page-pagination button"));
    const activeIndex = pageButtons.findIndex(function (button) { return button.classList.contains("active") || button.getAttribute("aria-current") === "page"; });
    if (pageButtons.length && activeIndex >= 0 && activeIndex < pageButtons.length - 1) {
      const previousIndex = activeIndex;
      return clickWithUndo(pageButtons[activeIndex + 1], function () {
        const buttons = document.querySelectorAll(".page-pagination button");
        if (buttons[previousIndex]) buttons[previousIndex].click();
      });
    }

    const mapNodes = Array.from(document.querySelectorAll(".map-node"));
    if (mapNodes.length) {
      const activeNode = mapNodes.findIndex(function (node) { return node.classList.contains("active") || node.getAttribute("aria-current") === "true"; });
      const nextIndex = Math.min(mapNodes.length - 1, Math.max(0, activeNode + 1));
      const previousIndex = activeNode;
      return clickWithUndo(mapNodes[nextIndex], function () {
        const nodes = document.querySelectorAll(".map-node");
        if (previousIndex >= 0 && nodes[previousIndex]) nodes[previousIndex].click();
        else findButtonByText(/返回地图|返回导览图/)?.click();
      });
    }

    const portal = document.querySelector("button.astronomy-portal, button.travel-portal");
    return clickWithUndo(portal, function () { findButtonByText(/返回主界面|返回首页/)?.click(); });
  }

  function createPageNavDock() {
    if (document.querySelector(".page-nav-dock")) return;
    const dock = document.createElement("nav");
    dock.className = "page-nav-dock";
    dock.setAttribute("aria-label", "页面层级导航");
    dock.innerHTML = '<button type="button" data-action="up"><i>↖</i><span>上一级</span></button><button type="button" data-action="next"><i>→</i><span>下一级</span></button><button type="button" data-action="undo"><i>↶</i><span>撤销</span></button>';
    document.body.appendChild(dock);
    dock.addEventListener("click", function (event) {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.action === "up") navigateUp();
      else if (button.dataset.action === "next") navigateNext();
      else if (button.dataset.action === "undo" && undoNavigation) {
        const action = undoNavigation;
        undoNavigation = null;
        action();
        updatePageNavDock();
      }
    });
    updatePageNavDock();
  }

  function updatePageNavDock() {
    const dock = document.querySelector(".page-nav-dock");
    if (!dock) return;
    const openingVisible = Boolean(document.querySelector(".opening-screen"));
    dock.classList.toggle("is-hidden", openingVisible || Boolean(document.querySelector(".architecture-explorer")));
    const undoButton = dock.querySelector('[data-action="undo"]');
    if (undoButton) undoButton.disabled = !undoNavigation;
  }

  function voiceFileUrl(entry, extension) {
    const filename = extension === "srt" ? entry.audio_name.replace(/\.mp3$/i, ".srt") : entry.audio_name;
    return "/audio/" + encodeURIComponent(entry.category) + "/" + encodeURIComponent(filename);
  }

  function parseSrt(text) {
    if (typeof text !== "string") return [];
    return text.replace(/^\uFEFF/, "").trim().split(/\r?\n\r?\n+/).map(function (block) {
      const lines = block.split(/\r?\n/);
      const timeLineIndex = lines.findIndex(function (line) { return line.includes("-->"); });
      if (timeLineIndex < 0) return null;
      const times = lines[timeLineIndex].split("-->");
      if (times.length !== 2) return null;
      return {
        start: parseSrtTime(times[0]),
        end: parseSrtTime(times[1]),
        text: lines.slice(timeLineIndex + 1).join(" ").trim()
      };
    }).filter(function (cue) {
      return cue && Number.isFinite(cue.start) && Number.isFinite(cue.end) && cue.end > cue.start;
    });
  }

  function parseSrtTime(value) {
    const parts = String(value).trim().replace(",", ".").split(":");
    if (parts.length !== 3) return NaN;
    return Number(parts[0]) * 3600 + Number(parts[1]) * 60 + Number(parts[2]);
  }

  async function playVoice(id) {
    if (!id || typeof id !== "string") return;
    await manifestReady;
    const entry = voiceEntries.get(id);
    if (!entry) {
      showVoiceError("未找到讲解资源：" + id);
      return;
    }

    disableLegacySoundEffects();
    voiceMasterOn = true;
    safeStorageSet("xingtu-voice-enabled", "true");
    window.clearTimeout(voiceHideTimer);

    if (currentVoiceId === id && audio.src) {
      if (audio.paused) {
        ensureSoftVoiceAudio();
        audio.play().catch(function () { showVoiceError("请点击播放器继续讲解"); });
      }
      else audio.pause();
      return;
    }

    audio.pause();
    currentVoiceId = id;
    currentEntry = entry;
    subtitleCues = [];
    audio.src = voiceFileUrl(entry, "mp3");
    updateVoiceConsole("loading");

    fetch(voiceFileUrl(entry, "srt"))
      .then(function (response) { return response.ok ? response.text() : ""; })
      .then(function (text) { subtitleCues = parseSrt(text); updateVoiceConsole(); })
      .catch(function () { subtitleCues = []; });

    audio.load();
    if (voiceMasterOn) {
      ensureSoftVoiceAudio();
      audio.play().catch(function () { showVoiceError("浏览器已拦截自动播放，请点击圆形播放按钮"); });
    }
  }

  function stopVoice() {
    audio.pause();
    audio.currentTime = 0;
    updateVoiceConsole();
    scheduleVoiceConsoleHide(500);
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    return String(minute).padStart(2, "0") + ":" + String(second).padStart(2, "0");
  }

  function currentCueText() {
    if (!subtitleOn) return "字幕已关闭，声音播放不受影响";
    const cue = subtitleCues.find(function (item) { return audio.currentTime >= item.start && audio.currentTime < item.end; });
    return cue ? cue.text : (currentEntry ? currentEntry.script : "");
  }

  function updateVoiceConsole(state) {
    const consoleElement = document.querySelector(".voice-console");
    if (!consoleElement) return;
    const title = consoleElement.querySelector(".voice-copy strong");
    const toggle = consoleElement.querySelector(".voice-toggle");
    const time = consoleElement.querySelector(".voice-time");
    const bar = consoleElement.querySelector(".voice-progress span");
    const progress = consoleElement.querySelector(".voice-progress");
    const subtitle = consoleElement.querySelector(".voice-subtitle");
    if (!currentEntry) return;

    consoleElement.classList.add("is-visible");
    consoleElement.classList.remove("is-error");
    document.body.classList.add("voice-active");
    title.textContent = state === "loading" ? "正在载入：" + currentEntry.title : currentEntry.title;
    toggle.textContent = audio.paused ? "▶" : "Ⅱ";
    const ratio = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.currentTime / audio.duration : 0;
    bar.style.width = Math.max(0, Math.min(100, ratio * 100)) + "%";
    progress.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
    time.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
    subtitle.textContent = currentCueText() || "讲解已结束";
    consoleElement.classList.toggle("has-subtitle", Boolean(subtitleCues.length && subtitleOn));
  }

  function showVoiceError(message) {
    createVoiceConsole();
    const consoleElement = document.querySelector(".voice-console");
    if (!consoleElement) return;
    consoleElement.classList.add("is-visible", "is-error");
    consoleElement.querySelector(".voice-copy strong").textContent = message || "配音播放失败";
    consoleElement.querySelector(".voice-subtitle").textContent = "请确认离线包中的 audio 文件夹完整，再重新启动展示。";
  }

  audio.addEventListener("play", function () {
    ensureSoftVoiceAudio();
    window.clearTimeout(voiceHideTimer);
    duckBackgroundMusic(true);
    updateVoiceConsole();
    updateMediaControlDock();
  });
  audio.addEventListener("pause", function () {
    duckBackgroundMusic(false);
    updateVoiceConsole();
    updateMediaControlDock();
  });
  audio.addEventListener("timeupdate", function () { updateVoiceConsole(); });
  audio.addEventListener("loadedmetadata", function () { updateVoiceConsole(); });
  audio.addEventListener("ended", function () {
    duckBackgroundMusic(false);
    updateVoiceConsole();
    updateMediaControlDock();
    scheduleVoiceConsoleHide(1500);
  });
  audio.addEventListener("error", function () { showVoiceError("当前配音文件读取失败"); });
  backgroundMusic.addEventListener("play", updateMediaControlDock);
  backgroundMusic.addEventListener("pause", updateMediaControlDock);

  function setSubtitleStateFromPage() {
    const subtitleButton = Array.from(document.querySelectorAll(".global-actions button")).find(function (button) {
      return button.textContent.trim() === "字幕";
    });
    subtitleOn = !subtitleButton || subtitleButton.classList.contains("active");
    updateVoiceConsole();
  }

  function getAstronomyPageIndex() {
    const screen = document.querySelector(".astronomy-screen");
    if (!screen) return -1;
    const match = screen.className.match(/astronomy-page-(\d)/);
    return match ? Number(match[1]) : 0;
  }

  function injectAstronomyRail() {
    const screen = document.querySelector(".astronomy-screen");
    let rail = document.querySelector(".astro-info-rail");
    if (!screen) {
      if (rail) rail.remove();
      return;
    }
    const pageIndex = getAstronomyPageIndex();
    if (!rail) {
      rail = document.createElement("aside");
      rail.className = "astro-info-rail";
      rail.setAttribute("aria-label", "天文信息图谱");
      rail.innerHTML = '<header><small>天文信息</small></header><nav></nav><div class="astro-info-facts"><strong></strong><span></span></div>';
      const nav = rail.querySelector("nav");
      astronomyPages.forEach(function (page, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "astro-info-button";
        button.innerHTML = "<b>" + page.icon + "</b><span>" + page.name + "</span>";
        button.setAttribute("aria-label", "前往" + page.label);
        button.addEventListener("click", function () {
          const target = document.querySelector('.page-pagination button[aria-label="' + page.label + '"]');
          if (target) target.click();
        });
        nav.appendChild(button);
      });
      document.body.appendChild(rail);
    } else if (rail.parentElement !== document.body) {
      document.body.appendChild(rail);
    }
    rail.querySelectorAll(".astro-info-button").forEach(function (button, index) {
      button.classList.toggle("active", index === pageIndex);
    });
    const data = astronomyPages[Math.max(0, pageIndex)];
    rail.querySelector(".astro-info-facts strong").textContent = data.fact;
    rail.querySelector(".astro-info-facts span").textContent = data.note;
  }

  function refinePrimaryLayouts() {
    const homeHeading = document.querySelector(".home-screen .home-heading");
    if (homeHeading) {
      homeHeading.querySelectorAll(":scope > p:not(.eyebrow)").forEach(function (paragraph) {
        if (paragraph.textContent.includes("仰观星象，俯察山川")) paragraph.remove();
      });
      homeHeading.closest(".home-screen")?.classList.add("home-layout-refined");
    }
    const travelScreen = document.querySelector(".travel-screen");
    if (travelScreen) travelScreen.classList.add("travel-layout-refined");
  }

  function enrichConstellationCards() {
    document.querySelectorAll(".constellation-grid button").forEach(function (button) {
      const code = button.querySelector(":scope > span");
      if (code) button.dataset.cardCode = code.textContent.trim();
    });

    const copy = document.querySelector(".card-detail-copy");
    if (!copy) return;
    const titleElement = copy.querySelector(":scope > strong");
    const title = titleElement ? titleElement.textContent.trim() : "";
    const story = cardStories[title];
    if (!story) return;

    let chain = copy.querySelector(".history-chain");
    if (!chain) {
      chain = document.createElement("section");
      chain.className = "history-chain";
      const footer = copy.querySelector(":scope > em");
      copy.insertBefore(chain, footer || null);
    }
    if (chain.dataset.title === title) return;
    chain.dataset.title = title;
    chain.innerHTML = '<header><strong>黄裳的观星历史链条</strong><em>叙事复原 · 艺术演绎</em></header><ol>' +
      story.nodes.map(function (node) { return "<li>" + node + "</li>"; }).join("") +
      "</ol><p>" + story.story + "</p>";
  }

  function injectRouteRibbon() {
    const sidebar = document.querySelector(".travel-map-sidebar");
    if (!sidebar || sidebar.querySelector(".route-history-ribbon")) return;
    const ribbon = document.createElement("section");
    ribbon.className = "route-history-ribbon";
    ribbon.innerHTML = '<small>一条路 · 四重文化缩影</small><div><span>雄关</span><i></i><span>古柏</span><i></i><span>天文</span><i></i><span>驿路</span></div>';
    const timelineButton = sidebar.querySelector(".timeline-button");
    sidebar.insertBefore(ribbon, timelineButton || null);
  }

  function injectHomeVoiceButton() {
    const guide = document.querySelector(".home-guide-copy");
    if (!guide || guide.querySelector(".home-voice-button")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "home-voice-button";
    button.textContent = "听黄裳讲解本次旅程";
    button.addEventListener("click", function () { playVoice("VO-HOME-01"); });
    guide.appendChild(button);
  }

  function enhanceOpeningButton() {
    const button = Array.from(document.querySelectorAll("button.primary-button, .opening-screen button")).find(function (item) {
      return item.textContent.includes("开启长卷");
    });
    if (!button || button.dataset.premiumReady === "true") return;
    button.dataset.premiumReady = "true";
    button.classList.add("premium-scroll-button");
    button.innerHTML = "<small>ENTER THE SCROLL</small><strong>开启长卷</strong><span>先观天文 · 再行蜀道</span>";
  }

  function findTravelNumber(name) {
    const index = travelStops.indexOf(name);
    return index >= 0 ? index + 1 : 0;
  }

  function currentTravelName() {
    const heading = document.querySelector(".travel-detail-title h2");
    return heading ? heading.textContent.trim() : "";
  }

  function injectTravelDialogue() {
    const copy = document.querySelector(".travel-detail-copy");
    const name = currentTravelName();
    if (!copy || !name || !travelDialogues[name]) return;
    let dialogue = copy.querySelector(".journey-dialogue");
    if (!dialogue) {
      dialogue = document.createElement("section");
      dialogue.className = "journey-dialogue";
      const lead = copy.querySelector(".travel-detail-lead");
      if (lead) lead.insertAdjacentElement("afterend", dialogue);
      else copy.prepend(dialogue);
    }
    if (dialogue.dataset.name === name) return;
    dialogue.dataset.name = name;
    dialogue.classList.remove("is-open");
    dialogue.innerHTML = '<small>古今相逢 · 时空对话</small><button type="button" class="dialogue-question">今人：到这里，我应该先看什么？</button><div class="dialogue-answer"><b>黄裳答</b><p>' + travelDialogues[name] + "</p></div>";
    dialogue.querySelector(".dialogue-question").addEventListener("click", function () {
      dialogue.classList.toggle("is-open");
      const number = findTravelNumber(name);
      if (dialogue.classList.contains("is-open") && number) playVoice("VO-TRAVEL-" + String(number).padStart(2, "0"));
    });
  }

  function enhancePage() {
    enhanceQueued = false;
    disableLegacySoundEffects();
    setSubtitleStateFromPage();
    refinePrimaryLayouts();
    injectAstronomyRail();
    enrichConstellationCards();
    enhanceOpeningButton();
    injectHomeVoiceButton();
    injectJourneyIntroCaption();
    injectRouteRibbon();
    injectTravelDialogue();
    createMediaControlDock();
    createPageNavDock();
    updatePageNavDock();
  }

  function queueEnhance() {
    if (enhanceQueued) return;
    enhanceQueued = true;
    window.requestAnimationFrame(enhancePage);
  }

  function playAstronomyPageAfterRender() {
    window.setTimeout(function () {
      const page = getAstronomyPageIndex();
      if (page >= 0) playVoice("VO-ASTRO-0" + (page + 1));
    }, 80);
  }

  function handleDocumentClick(event) {
    const button = event.target.closest("button");
    if (!button) return;
    const text = button.textContent.replace(/\s+/g, " ").trim();

    if (button.closest(".page-nav-dock, .media-control-dock, .architecture-explorer")) return;

    if (button.closest(".global-actions") && (text === "开启声音" || text === "关闭声音")) {
      if (allowLegacySoundToggle) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setBackgroundMusic(!backgroundMusicOn);
      return;
    }
    if (button.closest(".global-actions") && text === "字幕") {
      window.setTimeout(setSubtitleStateFromPage, 20);
      return;
    }

    if (button.classList.contains("primary-button") && text.includes("开启长卷")) {
      playVoice("VO-OPEN-01");
      return;
    }
    if (button.classList.contains("astronomy-portal")) {
      playVoice("VO-ASTRO-TRANS-01");
      return;
    }
    if (button.classList.contains("travel-portal")) {
      playVoice("VO-TRAVEL-MAP-01");
      return;
    }
    if (text.includes("展开星图") || text.includes("跳过卷轴动画")) {
      playVoice("VO-ASTRO-01");
      return;
    }

    if (button.closest(".history-tabs")) {
      const code = button.querySelector("span");
      if (code) playVoice("VO-ASTRO-01-H" + code.textContent.trim());
      return;
    }
    if (button.closest(".constellation-grid") || button.closest(".card-detail-rail")) {
      const code = button.querySelector("span");
      if (code && /^0[1-8]$/.test(code.textContent.trim())) playVoice("VO-ASTRO-CARD-" + code.textContent.trim());
      return;
    }
    if (button.closest(".card-detail-nav")) {
      window.setTimeout(function () {
        const code = document.querySelector(".card-detail-copy > span");
        const match = code ? code.textContent.match(/0[1-8]/) : null;
        if (match) playVoice("VO-ASTRO-CARD-" + match[0]);
      }, 50);
      return;
    }
    if (button.closest(".page-pagination")) {
      playAstronomyPageAfterRender();
      return;
    }

    if (button.classList.contains("map-node")) {
      const label = button.getAttribute("aria-label") || text;
      const match = label.match(/第(\d+)站/);
      if (match) playVoice("VO-TRAVEL-" + String(Number(match[1])).padStart(2, "0"));
      return;
    }
    if (button.classList.contains("timeline-button")) {
      playVoice("VO-TIMELINE-01");
      return;
    }
    if (button.closest(".planting-list")) {
      const code = button.querySelector("span");
      if (code && /^0[1-7]$/.test(code.textContent.trim())) playVoice("VO-TIMELINE-" + code.textContent.trim());
      return;
    }
    if (button.classList.contains("travel-hotspot")) {
      const name = currentTravelName();
      const prefix = hotspotPrefixes[name];
      const match = text.match(/0?([1-3])/);
      if (prefix && match) playVoice(prefix + "-H" + String(Number(match[1])).padStart(2, "0"));
      return;
    }
    if (button.closest(".travel-detail-nav") && (text.includes("上一站") || text.includes("下一站"))) {
      window.setTimeout(function () {
        const number = findTravelNumber(currentTravelName());
        if (number) playVoice("VO-TRAVEL-" + String(number).padStart(2, "0"));
      }, 80);
      return;
    }

    if (button.closest(".global-actions") && text === "制作档案") playVoice("VO-INTERNAL-01");
    else if (button.closest(".global-actions") && text === "审核验收") playVoice("VO-INTERNAL-02");
    else if (button.classList.contains("brand") || text.includes("返回主界面")) stopVoice();
  }

  document.addEventListener("click", handleDocumentClick, true);
  document.addEventListener("DOMContentLoaded", function () {
    setupPrelude();
    createVoiceConsole();
    createMediaControlDock();
    createPageNavDock();
    startBackgroundMusic();
    document.addEventListener("pointerdown", function resumeBackgroundMusic() {
      if (backgroundMusicOn && backgroundMusic.paused) startBackgroundMusic();
    }, { once: true, capture: true });
    queueEnhance();
    const root = document.getElementById("root");
    if (root) {
      const observer = new MutationObserver(queueEnhance);
      observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    }
  });
})();
