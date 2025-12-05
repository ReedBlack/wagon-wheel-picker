# Wagon Wheel Picker

A playful, interactive radial selection component for React. Perfect for kids' apps, game UIs, and fun, lighthearted interfaces. Display options in a circular wagon wheel layout with bouncy animations and delightful hover effects.

![npm version](https://img.shields.io/npm/v/@reedblack/wagon-wheel-picker)
![npm downloads](https://img.shields.io/npm/dm/@reedblack/wagon-wheel-picker)
![license](https://img.shields.io/npm/l/@reedblack/wagon-wheel-picker)

## ✨ Features

- **Playful radial layout** - Options arranged in a fun, circular wagon wheel pattern
- **Bouncy animations** - Optional Framer Motion integration for springy, playful transitions
- **Fully customizable** - Themeable colors, sizing, and behavior
- **Framework flexible** - Works with Next.js Image or standard img tags
- **Responsive** - Auto-detects mobile or accepts manual size control
- **TypeScript support** - Full type definitions included
- **Lightweight** - Minimal dependencies, Framer Motion is optional

## 🎮 Perfect For

- Kids' apps and educational games
- Food and recipe apps (like [Taco Ninja](https://taconinja.app))
- Playful e-commerce product pickers
- Character or avatar selectors
- Game lobbies and casual game UIs
- Any interface that benefits from a fun, whimsical touch

## 📦 Installation

```bash
npm install @reedblack/wagon-wheel-picker
```

### Optional: Enhanced Animations

For smooth animations with Framer Motion (recommended):

```bash
npm install framer-motion
```

If you don't install Framer Motion, the component will gracefully fall back to CSS transitions.

## 🚀 Quick Start

### Basic Usage

```jsx
import { WagonWheelPicker } from '@reedblack/wagon-wheel-picker';

function MyComponent() {
  const [selected, setSelected] = useState('option1');

  const options = [
    { key: 'option1', label: 'Option 1', image: '/images/option1.png' },
    { key: 'option2', label: 'Option 2', image: '/images/option2.png' },
    { key: 'option3', label: 'Option 3', image: '/images/option3.png' },
  ];

  return (
    <WagonWheelPicker
      options={options}
      value={selected}
      onClick={setSelected}
    />
  );
}
```

### With Next.js Image Component

```jsx
import Image from 'next/image';
import { WagonWheelPicker } from '@reedblack/wagon-wheel-picker';

function MyComponent() {
  return (
    <WagonWheelPicker
      options={options}
      value={selected}
      onClick={setSelected}
      ImageComponent={Image}
    />
  );
}
```

### Object Format (Alternative)

```jsx
const options = {
  beef: { label: 'Beef', image: '/beef.png' },
  chicken: { label: 'Chicken', image: '/chicken.png' },
  pork: { label: 'Pork', image: '/pork.png' },
};

<WagonWheelPicker options={options} value="beef" onClick={handleClick} />
```

### Simple String Format

```jsx
const options = {
  option1: '/images/option1.png',
  option2: '/images/option2.png',
  option3: '/images/option3.png',
};

<WagonWheelPicker options={options} value="option1" onClick={handleClick} />
```

## 🎭 Interactive Examples

Explore live examples and experiment with all customization options in Storybook:

```bash
npm run storybook
```

This opens an interactive playground at `http://localhost:6006` with:
- **15+ example stories** showcasing different use cases
- **Live controls** to experiment with props and themes
- **Multiple themes** (dark, colorful, pastel)
- **Different sizes** and option counts
- **Mobile vs Desktop** comparison
- **Documentation** for all props and features

To build a static Storybook:

```bash
npm run build-storybook
```

## 🎨 Customization

### Custom Theme

```jsx
const customTheme = {
  tertiaryBackground: '#e3f2fd',  // Selected option background
  surfaceBackground: '#ffffff',    // Unselected option background
  tertiary: '#2196f3',             // Selected option border
  border: '#cccccc',               // Unselected option border
  background: '#fafafa',           // Center circle background
  text: '#333333',                 // Center text color
  divider: '#e0e0e0',              // Center circle border
};

<WagonWheelPicker
  options={options}
  theme={customTheme}
/>
```

### Custom Sizing

```jsx
<WagonWheelPicker
  options={options}
  size={500}              // Custom size in pixels
  innerPercent={0.35}     // Inner radius (35% of total)
  outerPercent={0.95}     // Outer radius (95% of total)
/>
```

### Custom Center Text

```jsx
<WagonWheelPicker
  options={options}
  centerText={['PICK', 'YOUR', 'FLAVOR']}
  fontFamily="'Arial', sans-serif"
/>
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Array \| Object` | **required** | Options to display (min 3, max 8 recommended) |
| `value` | `string` | `undefined` | Currently selected option key |
| `onClick` | `function` | `undefined` | Callback when option is clicked: `(key: string) => void` |
| `theme` | `object` | Default theme | Theme object for colors |
| `size` | `number` | `420` / `320` | Size in pixels (desktop/mobile) |
| `isMobile` | `boolean` | Auto-detected | Force mobile sizing |
| `innerPercent` | `number` | `0.4` | Inner radius (0-1) |
| `outerPercent` | `number` | `0.9` | Outer radius (0-1) |
| `ImageComponent` | `Component` | `img` | Custom image component |
| `centerText` | `string[]` | `['SELECT', 'YOUR', 'OPTION']` | Center text lines |
| `fontFamily` | `string` | `'serif'` | Font for center text |
| `fallbackImage` | `string` | `'/fallback.png'` | Image when none provided |

### Option Format

**Array format:**
```typescript
{
  key: string;      // Required: unique identifier
  label?: string;   // Optional: display label
  image?: string;   // Optional: image URL
}
```

**Object format:**
```typescript
{
  [key: string]: {
    label?: string;
    image?: string;
  } | string  // or just image URL
}
```

### Theme Format

```typescript
{
  tertiaryBackground?: string;  // Selected option fill
  surfaceBackground?: string;   // Unselected option fill
  tertiary?: string;            // Selected option border
  border?: string;              // Unselected option border
  background?: string;          // Center circle fill
  text?: string;                // Center text color
  divider?: string;             // Center circle border
}
```

## 🔧 Advanced Usage

### Utility Functions

The package also exports geometry utility functions:

```jsx
import { polarToCartesian, degToRad, generateWedgePath } from '@reedblack/wagon-wheel-picker';

// Convert polar to cartesian coordinates
const { x, y } = polarToCartesian(100, 45, 200, 200);

// Convert degrees to radians
const radians = degToRad(90);

// Generate SVG path for a wedge
const path = generateWedgePath(200, 200, 150, 50, 0, 60);
```

## 🎯 Best Practices

- **3-8 options**: The component works best with 3-8 options. Fewer than 3 or more than 8 may look cramped or sparse.
- **Square images**: Use square images for best results in the circular layout.
- **Consistent sizing**: Keep image dimensions consistent across all options.
- **High contrast**: Ensure good contrast between theme colors for accessibility.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Reed Black

## 🐛 Issues

Found a bug? [Open an issue](https://github.com/reedblack/wagon-wheel-picker/issues)

## 💡 Inspiration

Created for [Taco Ninja](https://taconinja.app) - a playful recipe randomizer app. The wagon wheel pattern proved so fun and engaging, it deserved to be its own package!
