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
    },
    value: {
      description: 'Currently selected option key',
    },
    onClick: {
      description: 'Callback when an option is clicked',
      action: 'clicked',
    },
    size: {
      control: { type: 'range', min: 200, max: 600, step: 20 },
      description: 'Diameter of the wheel in pixels',
    },
    theme: {
      description: 'Theme object for customizing colors',
    },
    isMobile: {
      control: 'boolean',
      description: 'Force mobile or desktop mode',
    },
  },
} satisfies Meta<typeof WagonWheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data - using real Taco Ninja images
const basicOptions = [
  { key: 'beef', label: 'Beef', image: '/images/categoryImages/BEEF.png' },
  { key: 'chicken', label: 'Chicken', image: '/images/categoryImages/CHICKEN.png' },
  { key: 'pork', label: 'Pork', image: '/images/categoryImages/PORK.png' },
  { key: 'sea', label: 'Seafood', image: '/images/categoryImages/SEA.png' },
];

const manyOptions = [
  { key: 'beef', label: 'Beef', image: '/images/categoryImages/BEEF.png' },
  { key: 'chicken', label: 'Chicken', image: '/images/categoryImages/CHICKEN.png' },
  { key: 'pork', label: 'Pork', image: '/images/categoryImages/PORK.png' },
  { key: 'sea', label: 'Seafood', image: '/images/categoryImages/SEA.png' },
  { key: 'veg', label: 'Vegetarian', image: '/images/categoryImages/VEG.png' },
  { key: 'wild', label: 'Wild Game', image: '/images/categoryImages/WILD.png' },
  { key: 'brunch', label: 'Brunch', image: '/images/categoryImages/BRUNCH.png' },
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
};

/**
 * Minimal example with just 3 options (minimum required).
 */
export const MinimalThreeOptions: Story = {
  render: () => (
    <InteractiveWagonWheel
      options={[
        { key: 'option1', label: 'Option 1', image: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=1' },
        { key: 'option2', label: 'Option 2', image: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=2' },
        { key: 'option3', label: 'Option 3', image: 'https://via.placeholder.com/150/45B7D1/FFFFFF?text=3' },
      ]}
    />
  ),
};

/**
 * Maximum recommended options (8).
 * More than 8 options will trigger a console warning.
 */
export const MaximumEightOptions: Story = {
  render: () => <InteractiveWagonWheel options={manyOptions} />,
};

/**
 * Text-only options without images.
 * The component gracefully handles missing images.
 */
export const TextOnly: Story = {
  render: () => <InteractiveWagonWheel options={textOnlyOptions} />,
};

/**
 * Custom size - make it larger (500px diameter).
 */
export const LargeSize: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} size={500} />,
};

/**
 * Custom size - make it smaller (280px diameter).
 */
export const SmallSize: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} size={280} />,
};

/**
 * Dark theme example.
 * All theme properties are optional and can be customized.
 */
export const DarkTheme: Story = {
  render: () => (
    <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px' }}>
      <InteractiveWagonWheel
        options={basicOptions}
        theme={{
          selectedBackground: '#2a2a2a',
          wedgeBackground: '#1a1a1a',
          selectedBorder: '#4ECDC4',
          wedgeBorder: '#3a3a3a',
          centerBackground: '#0a0a0a',
          centerText: '#ffffff',
          centerBorder: '#3a3a3a',
        }}
      />
    </div>
  ),
};

/**
 * Colorful theme with vibrant colors.
 */
export const ColorfulTheme: Story = {
  render: () => (
    <div style={{ background: '#f0f0f0', padding: '2rem', borderRadius: '8px' }}>
      <InteractiveWagonWheel
        options={basicOptions}
        theme={{
          selectedBackground: '#FFE66D',
          wedgeBackground: '#FFFFFF',
          selectedBorder: '#FF6B6B',
          wedgeBorder: '#4ECDC4',
          centerBackground: '#F4F4F4',
          centerText: '#2C3E50',
          centerBorder: '#95E1D3',
        }}
      />
    </div>
  ),
};

/**
 * Pastel theme with soft colors.
 */
export const PastelTheme: Story = {
  render: () => (
    <div style={{ background: '#fafafa', padding: '2rem', borderRadius: '8px' }}>
      <InteractiveWagonWheel
        options={basicOptions}
        theme={{
          selectedBackground: '#E8F4F8',
          wedgeBackground: '#FFFFFF',
          selectedBorder: '#B8E6F0',
          wedgeBorder: '#D4E4ED',
          centerBackground: '#F5F5F5',
          centerText: '#5A6C7D',
          centerBorder: '#C8D6E5',
        }}
      />
    </div>
  ),
};

/**
 * Mobile mode view.
 * On mobile, hover effects are disabled for better touch experience.
 */
export const MobileMode: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} isMobile={true} />,
};

/**
 * Desktop mode view.
 * Desktop mode includes hover effects and animations.
 */
export const DesktopMode: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} isMobile={false} />,
};

/**
 * Object format for options.
 * You can pass options as an object with keys instead of an array.
 */
export const ObjectFormat: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | undefined>();

    return (
      <WagonWheelPicker
        options={{
          beef: { label: 'Beef', image: '/images/categoryImages/BEEF.png' },
          chicken: { label: 'Chicken', image: '/images/categoryImages/CHICKEN.png' },
          pork: { label: 'Pork', image: '/images/categoryImages/PORK.png' },
          sea: '/images/categoryImages/SEA.png', // Shorthand for image-only
        }}
        value={selected}
        onClick={setSelected}
      />
    );
  },
};

/**
 * Pre-selected option.
 * Start with an option already selected.
 */
export const PreSelected: Story = {
  render: () => <InteractiveWagonWheel options={basicOptions} value="chicken" />,
};

/**
 * Mixed content - some with images, some without.
 * The component handles mixed content gracefully.
 */
export const MixedContent: Story = {
  render: () => (
    <InteractiveWagonWheel
      options={[
        { key: 'beef', label: 'Beef', image: '/images/categoryImages/BEEF.png' },
        { key: 'textOnly1', label: 'Text Only' },
        { key: 'pork', label: 'Pork', image: '/images/categoryImages/PORK.png' },
        { key: 'textOnly2', label: 'Also Text' },
      ]}
    />
  ),
};

/**
 * Playground for experimenting with all options.
 * Use the controls panel to customize the component.
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
    isMobile: false,
  },
};
