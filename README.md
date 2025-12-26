# 基于所有变音规则的韩语拉丁可视化

一个独立的 React + Vite Web App，依据知乎专栏《韩语发音规则全解》梳理的全套音变规则，对韩语句子执行真实口语拉丁转写，并提供颜色高亮、悬浮讲解、规则筛选等交互体验。

## 开发

```bash
cd korean_phonetics_visualizer
npm install
npm run dev
```

## 架构亮点

- `src/lib`：核心 Hangul 拆分与音变引擎（连音、同化、紧音化、送气化、腭化、缩约、滑音等）。
- `src/components`：输入面板、规则筛选、分段高亮、悬浮卡片等 UI，采用柔和韩系配色与动画。
- `src/styles/global.css`：响应式玻璃拟态视觉、移动端适配、悬浮动效。

## 构建

```bash
npm run build && npm run preview
```
