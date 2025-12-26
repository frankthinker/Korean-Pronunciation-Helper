# 基于所有变音规则的韩语拉丁可视化

一个独立的 React + Vite Web App，依据知乎专栏《韩语发音规则全解》梳理的全套音变规则，对韩语句子执行真实口语拉丁转写，并提供颜色高亮、悬浮讲解、规则筛选等交互体验。

## 快速启动

### macOS

在项目根目录（`/Users/shunhu/Documents/Codes/`）运行：

```bash
bash start_korean_phonetics.sh
```

或一行执行（自动定位项目目录）：

```bash
bash /Users/shunhu/Documents/Codes/start_korean_phonetics.sh
```

启动成功后，访问 http://localhost:5175/

### Windows

```cmd
cd korean_phonetics_visualizer
npm install
npm run dev
```

启动成功后，访问 http://localhost:5175/

> **提示**：启动脚本会自动检查并安装依赖，清理端口占用，确保开发服务器正常运行。

## 开发

手动启动：

```bash
cd korean_phonetics_visualizer
npm install
npm run dev
```

> **macOS Safari 用户提示**：若希望脚本自动在 Safari 中停止页面加载，请先打开 Safari → 设置 → 高级，勾选"在菜单栏显示'开发者'菜单"，然后在菜单栏里进入"开发者"→启用"允许来自 Apple 事件的 JavaScript"（以及其它与 JavaScript 相关的允许项）。否则 Safari 会阻止 AppleScript 执行 `window.stop()`。

## 架构亮点

- `src/lib`：核心 Hangul 拆分与音变引擎（连音、同化、紧音化、送气化、腭化、缩约、滑音等）。
- `src/components`：输入面板、规则筛选、分段高亮、悬浮卡片等 UI，采用柔和韩系配色与动画。
- `src/styles/global.css`：响应式玻璃拟态视觉、移动端适配、悬浮动效。

## 构建

```bash
npm run build && npm run preview
```
