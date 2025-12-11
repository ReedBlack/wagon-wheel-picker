import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WagonWheelPicker } from '../components/WagonWheelPicker';
import type { WagonWheelPickerProps } from '../components/WagonWheelPicker';

/**
 * WagonWheelPicker is a playful circular option selector component that displays choices
 * in a fun wagon wheel format. Perfect for kids' apps, games, and lighthearted interfaces.
 * Works best with 3-8 options.
 */
const meta = {
  title: 'Components/WagonWheelPicker',
  component: WagonWheelPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of options or object with option keys',
      control: false, // Complex object, not practical to control
    },
    value: {
      description: 'Currently selected option key',
      control: false, // Controlled by component state
    },
    onClick: {
      description: 'Callback when an option is clicked',
      action: 'clicked',
      control: false,
    },
    size: {
      control: { type: 'range', min: 200, max: 600, step: 20 },
      description: 'Diameter of the wheel in pixels',
    },
    innerPercent: {
      control: { type: 'range', min: 0, max: 0.6, step: 0.05 },
      description: 'Inner radius as percentage (0 = pie slices, 0.4 = default wagon wheel, 0.6 = thin ring)',
    },
    outerPercent: {
      control: { type: 'range', min: 0.7, max: 1.0, step: 0.05 },
      description: 'Outer radius as percentage (0.9 = default, 1.0 = full circle)',
    },
    centerText: {
      description: 'Array of text lines to display in the center',
      control: { type: 'object' },
    },
    fontFamily: {
      description: 'Font family for center text',
      control: { type: 'text' },
    },
    ImageComponent: {
      description: 'Custom image component (e.g., Next.js Image)',
      control: false,
    },
    theme: {
      description: 'Theme object for customizing colors',
      control: false, // Complex nested object, better handled in dedicated theme stories
    },
    fallbackImage: {
      description: 'Fallback image path when option image is missing',
      control: false,
    },
  },
} satisfies Meta<typeof WagonWheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data - using real Taco Ninja images
// Use relative paths that work with the base path in production
const getImagePath = (filename: string) =>
  process.env.NODE_ENV === 'production'
    ? `./images/categoryImages/${filename}`
    : `/images/categoryImages/${filename}`;

const basicOptions = [
  { key: 'beef', label: 'Beef', image: getImagePath('BEEF.png') },
  { key: 'chicken', label: 'Chicken', image: getImagePath('CHICKEN.png') },
  { key: 'pork', label: 'Pork', image: getImagePath('PORK.png') },
  { key: 'sea', label: 'Seafood', image: getImagePath('SEA.png') },
];

const manyOptions = [
  { key: 'beef', label: 'Beef', image: getImagePath('BEEF.png') },
  { key: 'chicken', label: 'Chicken', image: getImagePath('CHICKEN.png') },
  { key: 'pork', label: 'Pork', image: getImagePath('PORK.png') },
  { key: 'sea', label: 'Seafood', image: getImagePath('SEA.png') },
  { key: 'veg', label: 'Vegetarian', image: getImagePath('VEG.png') },
  { key: 'wild', label: 'Wild Game', image: getImagePath('WILD.png') },
  { key: 'brunch', label: 'Brunch', image: getImagePath('BRUNCH.png') },
];

const textOnlyOptions = [
  { key: 'small', label: 'Small' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
  { key: 'xlarge', label: 'X-Large' },
];

// Interactive wrapper component
function InteractiveWagonWheel(props: Partial<WagonWheelPickerProps>) {
  const [selected, setSelected] = useState<string | undefined>(props.value);

  return (
    <WagonWheelPicker
      {...props}
      options={props.options || basicOptions}
      value={selected}
      onClick={setSelected}
    />
  );
}

/**
 * Basic usage with 4 options and images.
 * Click on a wedge to select it.
 */
export const Default: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} />,
  args: { options: basicOptions },
};

/**
 * Minimal example with just 3 options (minimum required).
 */
const minimalOptions = [
  { key: 'option1', label: 'Option 1', image: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=1' },
  { key: 'option2', label: 'Option 2', image: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=2' },
  { key: 'option3', label: 'Option 3', image: 'https://via.placeholder.com/150/45B7D1/FFFFFF?text=3' },
];

export const MinimalThreeOptions: Story = {
  render: () => <InteractiveWagonWheel options={minimalOptions} />,
  args: { options: minimalOptions },
};

/**
 * Maximum recommended options (8).
 * More than 8 options will trigger a console warning.
 */
export const MaximumEightOptions: Story = {
  render: () => <InteractiveWagonWheel options={manyOptions} />,
  args: { options: manyOptions },
};

/**
 * Text-only options without images.
 * The component gracefully handles missing images.
 */
export const TextOnly: Story = {
  render: () => <InteractiveWagonWheel options={textOnlyOptions} />,
  args: { options: textOnlyOptions },
};

/**
 * Custom size - make it larger (500px diameter).
 */
export const LargeSize: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} size={500} />,
  args: { options: basicOptions, size: 500 },
};

/**
 * Custom size - make it smaller (280px diameter).
 */
export const SmallSize: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} size={280} />,
  args: { options: basicOptions, size: 280 },
};

/**
 * Colorful theme with vibrant colors.
 */
const colorfulTheme = {
  selectedBackground: '#FFE66D',
  wedgeBackground: '#FFFFFF',
  selectedBorder: '#FF6B6B',
  wedgeBorder: '#4ECDC4',
  centerBackground: '#F4F4F4',
  centerText: '#2C3E50',
  centerBorder: '#95E1D3',
};

export const ColorfulTheme: Story = {
  render: () => (
    <div style={{ background: '#f0f0f0', padding: '2rem', borderRadius: '8px' }}>
      <InteractiveWagonWheel options={basicOptions} theme={colorfulTheme} />
    </div>
  ),
  args: { options: basicOptions, theme: colorfulTheme },
};

/**
 * Pie slice picker style.
 * Set innerPercent to 0 to create pie slices instead of a wagon wheel!
 */
export const PieSlicePicker: Story = {
  render: (args) => <InteractiveWagonWheel {...args} />,
  args: {
    options: basicOptions,
    innerPercent: 0,
    centerText: ['PIE', 'SLICE', 'PICKER'],
  },
};

/**
 * Pre-selected option.
 * Start with an option already selected.
 */
export const PreSelected: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} value="chicken" />,
  args: { options: basicOptions, value: 'chicken' },
};

/**
 * Playground for experimenting with all options.
 * Use the controls panel to customize the component.
 * 
 * **Recommended ranges:**
 * - `innerPercent`: 0 (pie slices) to 0.5 (thick ring)
 * - `outerPercent`: 0.8 to 1.0 (0.9 is default)
 * - `size`: 200-600px (420px is default)
 */
export const Playground: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | undefined>(args.value);

    return (
      <WagonWheelPicker
        {...args}
        value={selected}
        onClick={setSelected}
      />
    );
  },
  args: {
    options: basicOptions,
    size: 420,
    innerPercent: 0.4,
    outerPercent: 0.9,
    centerText: ['SELECT', 'YOUR', 'OPTION'],
  },
};
