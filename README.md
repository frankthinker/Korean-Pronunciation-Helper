# 基于所有变音规则的韩语拉丁可视化

Language / 语言：**[中文](#简体中文版)** ｜ **[English](#english-version)**

## 简体中文版

一个独立的 React + Vite Web App，依据知乎专栏《韩语发音规则全解》梳理的全套音变规则，对韩语句子执行真实口语拉丁转写，并提供颜色高亮、悬浮讲解、规则筛选等交互体验。最新版本引入 **语义级音变分析**（识别依存名词、计数词、系词等语法信息来决定紧音化/ㄴ添加）以及 **微软 Edge Neural 语音朗读**：内置女声 SunHi 与男声 InJoon，可在 -80% ~ +60% 区间自由调节语速，真正做到“即点即播、无需任何繁琐配置”。

![App Preview](./preview.png)

## 启动

### macOS（推荐）

在项目根目录（`/Users/shunhu/Documents/Codes/`）运行：

```bash
bash start_korean_phonetics.sh
```

或一行执行（自动定位项目目录）：

```bash
bash /Users/shunhu/Documents/Codes/start_korean_phonetics.sh
```

启动成功后，访问 http://localhost:5175/

> **提示**：启动脚本会自动检查并安装依赖，清理端口占用，确保开发服务器正常运行。

> **macOS Safari 用户**：若希望脚本自动在 Safari 中停止页面加载，请先打开 Safari → 设置 → 高级，勾选"在菜单栏显示'开发者'菜单"，然后在菜单栏里进入"开发者"→启用"允许来自 Apple 事件的 JavaScript"（以及其它与 JavaScript 相关的允许项）。否则 Safari 会阻止 AppleScript 执行 `window.stop()`。

### Windows

```cmd
cd korean_phonetics_visualizer
npm install
npm run dev
```

启动成功后，访问 http://localhost:5175/


## 架构亮点

- `src/lib`：核心 Hangul 拆分与音变引擎（连音、同化、紧音化、送气化、腭化、缩约、滑音等），现已包含语义/语法词典与规则快照。
- `src/components`：输入面板、规则筛选、分段高亮、悬浮卡片等 UI，采用柔和韩系配色与动画。
- `src/styles/global.css`：响应式玻璃拟态视觉、移动端适配、悬浮动效。
- `tests/romanizerSnapshot.mjs`：覆盖“系词+元音开头”“依存名词”“计数单位”等语义型音变的快照回归，避免后续改动破坏规则。

## 语音朗读（Edge Neural）

- 打开页面左下角的“自然语音朗读”即可体验，无需繁琐配置。保持联网即可直接使用，不需要申请 API Key，也不必额外安装任何程序。
- 可在 SunHi（女声）和 InJoon（男声）之间切换，并通过语速滑杆把语速调到非常慢或更快，方便对齐练习节奏。
- 如果检测到离线，界面会提示“请连接互联网后再使用朗读功能”，避免误触导致卡顿。

## 最新特性

- **语义触发音变**：自动判断连体形+依存名词、ㄴ·ㅁ+计数单位、惯用汉字词等场景，避免误报/漏报紧音化与ㄴ添加。
- **Edge Neural 朗读面板**：左下角即可切换音色、语速；断网时会提示“请连接互联网后再使用朗读功能”。
- **回归快照脚本**：使用 `npm run test:romanizer` 一键比对关键句子的罗马转写与音变统计，确保迭代稳定。

## 构建

```bash
npm run build && npm run preview
```

## 快速回归测试

```bash
npm run test:romanizer
```

---

## English Version

**Korean Phonetics Visualizer** is a React + Vite web app that computes real-life Romanization for any Korean sentence. It highlights every sound change with color-coded chips, hover tooltips, and interactive filters. The latest release adds **semantic-aware phonology** (detecting dependent nouns, counters, copular endings, etc.) plus an **Edge Neural TTS panel** where you can switch between SunHi/InJoon voices and adjust the speaking rate from −80 % to +60 %—all without API keys.

![App Preview](./preview.png)

### Quick Start

```bash
git clone <repo>
cd korean_phonetics_visualizer
npm install
npm run dev
```

Visit http://localhost:5175 to use the web UI. On macOS you can also run the bundled `start_korean_phonetics.sh`, which auto-installs dependencies, restarts the Vite dev server, and opens the browser.

### Key Highlights

- `src/lib`: Hangul decomposition, rule pipeline (liaison, assimilation, tensification, aspiration, palatalization, contraction, glide, etc.), semantic lexicon, and regression snapshots.
- `src/components`: Text input, rule legend, Romanization strip, stats panel, and Edge TTS panel in a soft Korean-inspired UI.
- `scripts/start_kpv.sh`: One-touch launcher for macOS (auto port cleanup + browser open).

### Edge Neural TTS

- Built-in POST `/api/tts` proxy uses Microsoft Edge Neural voices with zero manual configuration.
- Choose SunHi (female) or InJoon (male), slide the speech rate, and enjoy instant playback.
- When the app detects offline mode, it warns you before trying to synthesize speech.

### Testing & Build

```bash
npm run build          # production build
npm run preview        # preview mode
npm run test:romanizer # semantic phonology regression snapshots
```
