# Wagon Wheel Picker

A playful, interactive radial selection component for React. Perfect for kids' apps, game UIs, and fun, lighthearted interfaces. Display options in a circular wagon wheel layout with bouncy animations and delightful hover effects.

![npm version](https://img.shields.io/npm/v/react-wagon-wheel-picker)
![npm downloads](https://img.shields.io/npm/dm/react-wagon-wheel-picker)
![license](https://img.shields.io/npm/l/react-wagon-wheel-picker)

**[View Live Demo](https://reedblack.github.io/wagon-wheel-picker/)**

## ✨ Features

- **Playful radial layout** - Options arranged in a fun, circular wagon wheel pattern
- **Bouncy animations** - Springy, playful transitions powered by Framer Motion
- **Customizable** - Themeable colors, sizing, and behavior
- **Framework flexible** - Works with Next.js Image or standard img tags
- **Responsive** - Auto-detects mobile or accepts manual size control
- **TypeScript support** - Full type definitions included

## Perfect For

- Kids' apps and educational games
- Food and recipe apps (like [Taco Ninja](https://taco-ninja.vercel.app/))
- Playful e-commerce product pickers
- Character or avatar selectors
- Game lobbies and casual game UIs
- Any interface that benefits from a fun, whimsical touch

## 📦 Installation

```bash
npm install react-wagon-wheel-picker framer-motion
```

> **Note**: Framer Motion is required for the bouncy, playful animations that make this component fun!

## 🚀 Quick Start

### Basic Usage

```jsx
import { WagonWheelPicker } from 'react-wagon-wheel-picker';

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
import { WagonWheelPicker } from 'react-wagon-wheel-picker';

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

## Interactive Examples

**[View Live Storybook Demo](https://reedblack.github.io/wagon-wheel-picker/)**

Or explore locally:

```bash
npm run storybook
```

The interactive playground includes:
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
  selectedBackground: '#e3f2fd',       // Selected wedge fill color
  wedgeBackground: '#ffffff',          // Unselected wedge fill color
  selectedBorder: '#2196f3',           // Selected wedge border color
  wedgeBorder: '#cccccc',              // Unselected wedge border color
  centerBackground: '#fafafa',         // Center circle fill color
  centerText: '#333333',               // Center text color
  centerBorder: '#e0e0e0',             // Center circle border color
  focusRingColor: '#2196f3',           // Keyboard focus ring color
  hoverBackground: '#f0f8ff',          // Hover state for unselected wedges (optional)
  selectedHoverBackground: '#d0e8f8',  // Hover state for selected wedge (optional)
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

**Tip:** Set `innerPercent={0}` to create a pie slice picker instead of a wagon wheel!

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
  selectedBackground?: string;       // Selected wedge fill color
  wedgeBackground?: string;          // Unselected wedge fill color
  selectedBorder?: string;           // Selected wedge border color
  wedgeBorder?: string;              // Unselected wedge border color
  centerBackground?: string;         // Center circle fill color
  centerText?: string;               // Center text color
  centerBorder?: string;             // Center circle border color
  focusRingColor?: string;           // Keyboard focus ring color
  hoverBackground?: string;          // Hover state for unselected wedges (defaults to wedgeBackground)
  selectedHoverBackground?: string;  // Hover state for selected wedge (defaults to selectedBackground)
}
```

## 🔧 Advanced Usage

### Utility Functions

The package also exports geometry utility functions:

```jsx
import { polarToCartesian, degToRad, generateWedgePath } from 'react-wagon-wheel-picker';

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

Created for [Taco Ninja](https://taco-ninja.vercel.app/) - a playful recipe randomizer app. The wagon wheel pattern proved so fun and engaging, it deserved to be its own package!
