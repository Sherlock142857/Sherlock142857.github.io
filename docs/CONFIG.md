# Configuration System

本项目使用统一的配置系统管理所有设计令牌、断点和常量值。

## 架构

```
src/config/
├── index.ts              # 统一导出入口
├── breakpoints.ts        # 响应式断点定义
└── designTokens.ts       # 设计令牌（颜色、间距、动画等）
```

## 使用方法

### 在 TypeScript/JavaScript 中

```typescript
import { BREAKPOINTS, SPACING, ANIMATION, COLORS } from '@/config';

// 使用断点
if (window.innerWidth < BREAKPOINTS.MOBILE) {
  // 移动端逻辑
}

// 使用辅助函数
import { isMobileViewport } from '@/config';
if (isMobileViewport()) {
  // 移动端逻辑
}

// 使用设计令牌
const duration = ANIMATION.carouselDuration;
const spacing = SPACING.lg;
```

### 在 CSS 中

CSS 变量定义在 `src/styles/variables.css` 中，与 TypeScript 配置保持同步：

```css
.my-component {
  padding: var(--space-lg);
  color: var(--color-ink);
  transition: transform var(--dur-carousel) var(--ease-out);
}

@media (max-width: 760px) {
  /* 移动端样式 */
}
```

## 设计令牌类别

### 1. 断点 (Breakpoints)

| 常量 | 值 | 说明 |
|------|-----|------|
| `BREAKPOINTS.MOBILE` | 760px | 移动端断点 |
| `BREAKPOINTS.TABLET` | 860px | 平板断点 |
| `BREAKPOINTS.MAX_CONTENT_WIDTH` | 1920px | 最大内容宽度 |

### 2. 间距 (Spacing)

基于 4px (0.25rem) 基础单位的几何级数：

| 令牌 | 值 | 像素 |
|------|-----|------|
| `SPACING['2xs']` | 0.25rem | 4px |
| `SPACING.xs` | 0.5rem | 8px |
| `SPACING.sm` | 0.75rem | 12px |
| `SPACING.md` | 1rem | 16px |
| `SPACING.lg` | 1.5rem | 24px |
| `SPACING.xl` | 2.5rem | 40px |
| `SPACING['2xl']` | 4rem | 64px |
| `SPACING['3xl']` | 6rem | 96px |

### 3. 颜色 (Colors)

强烈的黑白灰色阶层次：

| 令牌 | 值 | 用途 |
|------|-----|------|
| `COLORS.bg` | #f4f4f1 | 页面背景 |
| `COLORS.ink` | #0a0a0a | 主要文本 |
| `COLORS.inkSoft` | #6d6d68 | 次要文本 |
| `COLORS.inkFaint` | #a9a9a3 | 三级文本 |

### 4. 动画 (Animation)

| 令牌 | 值（秒） | 用途 |
|------|---------|------|
| `ANIMATION.carouselDuration` | 0.45 | 轮播滑动时长 |
| `ANIMATION.transitionMerge` | 0.35 | 页面转场：合并阶段 |
| `ANIMATION.transitionRotate` | 0.35 | 页面转场：旋转阶段 |

### 5. 缓动函数 (Easing)

| 令牌 | 值 | 用途 |
|------|-----|------|
| `EASING.out` | cubic-bezier(0.22, 1, 0.36, 1) | 减速曲线 |
| `EASING.in` | cubic-bezier(0.55, 0.06, 0.68, 0.19) | 加速曲线 |
| `EASING.inOut` | cubic-bezier(0.65, 0, 0.35, 1) | 平滑加减速 |

### 6. 几何 (Geometry)

菱形/括号视觉系统的配置：

| 令牌 | 值 | 说明 |
|------|-----|------|
| `GEOMETRY.diamondRatio` | 0.55 | 菱形半对角线占图片高度比例 |
| `GEOMETRY.gapRatio` | 1.1 | 首页括号间距比例 |
| `GEOMETRY.framePadding` | 40px | 详情页边框距离视口边缘 |
| `GEOMETRY.frameScale` | 1.4 | 边框括号相对菱形的放大倍数 |

### 7. 轮播几何 (Carousel)

| 令牌 | 值 | 说明 |
|------|-----|------|
| `CAROUSEL.slotHeight` | 17rem | 插槽高度（桌面） |
| `CAROUSEL.imageWidth` | 14rem | 图片宽度（桌面） |
| `CAROUSEL.widthRatio` | 2.475 | 列宽度比例 |
| `CAROUSEL.heightRatio` | 1.21 | 固定括号高度比例 |

## 同步规则

**重要：** TypeScript 配置 (`designTokens.ts`) 是权威来源，CSS 变量必须与之保持同步。

更新流程：
1. 修改 `src/config/designTokens.ts` 中的值
2. 同步更新 `src/styles/variables.css` 中的对应 CSS 变量
3. 运行 `npm run typecheck` 验证类型
4. 运行 `npm run build` 验证构建

## 性能配置 (Performance)

| 令牌 | 值 | 说明 |
|------|-----|------|
| `PERFORMANCE.resizeThrottleMs` | 100ms | ResizeObserver 节流延迟 |
| `PERFORMANCE.galleryScrollDuration` | 26s | 画廊自动滚动时长 |

## 迁移指南

### 从硬编码值迁移

**之前：**
```typescript
if (window.innerWidth < 760) { /* ... */ }
const gap = 40;
setTimeout(measure, 100);
```

**之后：**
```typescript
import { isMobileViewport } from '@/config';
import { GEOMETRY, PERFORMANCE } from '@/config';

if (isMobileViewport()) { /* ... */ }
const gap = GEOMETRY.framePadding;
setTimeout(measure, PERFORMANCE.resizeThrottleMs);
```

### 从旧的动画文件迁移

**之前：**
```typescript
import { EASE_OUT, CAROUSEL } from '../animations/timing';
```

**之后：**
```typescript
import { EASING, ANIMATION } from '@/config';

// 旧的动画文件现在重新导出配置值以保持兼容性
// 但新代码应该直接从 @/config 导入
```

## 扩展配置

添加新的设计令牌：

1. 在 `src/config/designTokens.ts` 中添加新常量组
2. 如果需要在 CSS 中使用，在 `src/styles/variables.css` 中添加对应变量
3. 在本文档中添加说明
4. 导出到 `src/config/index.ts`

示例：

```typescript
// src/config/designTokens.ts
export const SHADOWS = {
  small: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
  large: '0 8px 16px rgba(0, 0, 0, 0.2)',
} as const;
```

```css
/* src/styles/variables.css */
:root {
  --shadow-small: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-large: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```
