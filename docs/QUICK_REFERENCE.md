# 快速参考指南

## 常用导入

```typescript
// 断点检查
import { isMobileViewport, isTabletViewport, BREAKPOINTS } from '@/config';

// 设计令牌
import { SPACING, COLORS, ANIMATION, EASING, GEOMETRY } from '@/config';

// 类型和类型守卫
import type { Field, Detail, ImageRef } from '@/types/content';
import { isDetailTextGallery, isDetailTextImage } from '@/types/content';
```

## 常见场景

### 1. 添加响应式逻辑

```typescript
import { isMobileViewport } from '@/config';

// 在事件处理中
const handleScroll = (event: WheelEvent) => {
  if (isMobileViewport()) {
    // 移动端逻辑
    return;
  }
  // 桌面端逻辑
};

// 在渲染中
const itemsToShow = isMobileViewport() ? 3 : 5;
```

### 2. 使用设计令牌

```typescript
import { SPACING, ANIMATION, GEOMETRY } from '@/config';

// 间距
const padding = SPACING.lg; // '1.5rem'

// 动画时长
const duration = ANIMATION.carouselDuration; // 0.45 秒

// 几何参数
const gap = GEOMETRY.gapRatio; // 1.1
```

### 3. 类型守卫使用

```typescript
import { isDetailTextGallery } from '@/types/content';
import type { Detail } from '@/types/content';

function renderDetail(detail: Detail) {
  if (isDetailTextGallery(detail)) {
    // TypeScript 现在知道 detail.images 存在
    return detail.images.map(img => <img src={img.src} alt={img.alt} />);
  }
}
```

### 4. 在 CSS 中使用变量

```css
.my-component {
  /* 间距 */
  padding: var(--space-lg);
  margin-bottom: var(--space-2xl);
  
  /* 颜色 */
  background: var(--color-bg);
  color: var(--color-ink);
  
  /* 动画 */
  transition: transform var(--dur-carousel) var(--ease-out);
}

/* 响应式 */
@media (max-width: 760px) {
  .my-component {
    padding: var(--space-md);
  }
}
```

## 配置值速查

### 断点
| 名称 | 值 | 用途 |
|------|-----|------|
| `BREAKPOINTS.MOBILE` | 760px | 移动端布局切换 |
| `BREAKPOINTS.TABLET` | 860px | 平板布局切换 |

### 间距（最常用）
| 令牌 | 值 | 像素 |
|------|-----|------|
| `SPACING.sm` | 0.75rem | 12px |
| `SPACING.md` | 1rem | 16px |
| `SPACING.lg` | 1.5rem | 24px |
| `SPACING.xl` | 2.5rem | 40px |

### 动画时长
| 令牌 | 值 | 用途 |
|------|-----|------|
| `ANIMATION.carouselDuration` | 0.45s | 轮播滑动 |

### 缓动函数
| 令牌 | 用途 |
|------|------|
| `EASING.out` | 退出动画 |
| `EASING.inOut` | 平滑过渡 |

## 添加新字段（Field）

1. 在 `public/assets/fields/` 中添加缩略图
2. 在 `src/data/fields.ts` 中添加数据：

```typescript
{
  id: "my-new-field",
  title: "My New Field",
  image: "assets/fields/my-new-field.jpg",
  imageAlt: "Description of the image",
  metadata: {
    lines: ["Category", "Value", "Year", "2026"],
  },
  detail: {
    template: "text", // 或 "text-image" 或 "text-gallery"
    title: "My New Field",
    subtitle: "Optional subtitle",
    sections: [
      {
        heading: "Section 1",
        paragraphs: ["Paragraph 1", "Paragraph 2"],
      },
    ],
    // 如果是 text-image:
    // image: { src: "assets/detail/image.jpg", alt: "Description" },
    // 如果是 text-gallery:
    // images: [
    //   { src: "assets/detail/img1.jpg", alt: "Desc 1" },
    //   { src: "assets/detail/img2.jpg", alt: "Desc 2" },
    // ],
  },
}
```

## 修改设计令牌

1. 编辑 `src/config/designTokens.ts`
2. 同步更新 `src/styles/variables.css`（如果在 CSS 中使用）
3. 运行 `npm run typecheck` 验证
4. 运行 `npm run build` 测试构建

## 开发命令

```bash
# 开发服务器
npm run dev

# 类型检查
npm run typecheck

# 代码检查
npm run lint

# 自动修复代码风格
npm run lint:fix

# 格式化代码
npm run format

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 文件位置速查

| 内容 | 位置 |
|------|------|
| 配置系统 | `src/config/` |
| 类型定义 | `src/types/content.ts` |
| 字段数据 | `src/data/fields.ts` |
| 网站信息 | `src/data/site.ts` |
| CSS 变量 | `src/styles/variables.css` |
| 组件 | `src/components/` |
| Hooks | `src/hooks/` |
| 动画 | `src/animations/` |
| 图片资源 | `public/assets/` |

## 故障排查

### 类型错误
```bash
npm run typecheck
```
查看详细错误信息

### 构建失败
```bash
npm run build
```
检查控制台输出

### 样式问题
检查：
1. CSS 变量是否正确使用（`var(--variable-name)`）
2. 断点是否与配置一致（760px, 860px）
3. 浏览器开发工具中计算的样式

### 导入路径问题
目前使用相对路径。如果需要设置路径别名：
1. 修改 `vite.config.ts` 添加 alias
2. 修改 `tsconfig.json` 添加 paths
