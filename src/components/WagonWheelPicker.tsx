import React, { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

import WheelCenter from './WheelCenter';
import Wedge, { WedgeData } from './Wedge';
import GhostWedge from './GhostWedge';
import { polarToCartesian } from '../utils/geometry';

const DEFAULT_THEME = {
  selectedBackground: '#f0f0f0',
  wedgeBackground: '#ffffff',
  selectedBorder: '#007bff',
  wedgeBorder: '#cccccc',
  centerBackground: '#fafafa',
  centerText: '#333333',
  centerBorder: '#e0e0e0',
  focusRingColor: '#007bff',
  hoverBackground: undefined,  // If undefined, uses wedge/selected background
  selectedHoverBackground: undefined,  // If undefined, uses selectedBackground
};

export interface WagonWheelOption {
  key: string;
  label?: string;
  image?: string;
}

export interface WagonWheelTheme {
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

export interface WagonWheelPickerProps {
  options: WagonWheelOption[] | Record<string, WagonWheelOption | string>;
  value?: string;
  onClick?: (key: string) => void;
  innerPercent?: number;
  outerPercent?: number;
  theme?: WagonWheelTheme;
  size?: number;
  ImageComponent?: React.ComponentType<any>;
  centerText?: string[];
  fontFamily?: string;
  fallbackImage?: string;
}

export const WagonWheelPicker: React.FC<WagonWheelPickerProps> = ({
  options = [],
  value,
  onClick,
  innerPercent = 0.4,
  outerPercent = 0.9,
  theme = DEFAULT_THEME,
  size: sizeProp,
  ImageComponent,
  centerText,
  fontFamily,
  fallbackImage: _fallbackImage = '/fallback.png',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const mouseDownRef = React.useRef(false);

  // Normalize options to array format
  let optionKeys: string[];
  let optionMap: Record<string, WagonWheelOption> = {};

  // Keyboard navigation handler
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!optionKeys || optionKeys.length === 0) return;

    const currentIndex = focusedIndex !== null ? focusedIndex :
                        (value ? optionKeys.indexOf(value) : -1);

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % optionKeys.length;
        setFocusedIndex(newIndex);
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex === -1 ? optionKeys.length - 1 :
                   (currentIndex - 1 + optionKeys.length) % optionKeys.length;
        setFocusedIndex(newIndex);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex !== null && onClick) {
          onClick(optionKeys[focusedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        setFocusedIndex(null);
        (event.target as HTMLElement).blur();
        break;

      default:
        break;
    }
  };

  if (Array.isArray(options)) {
    // Validation: minimum 3, maximum 8 options
    if (options.length < 3) {
      console.warn('WagonWheelPicker: Minimum 3 options required. Component may not render correctly.');
    }
    if (options.length > 8) {
      console.warn('WagonWheelPicker: Maximum 8 options recommended. Additional options will be rendered but may overlap.');
    }

    optionKeys = options.map((item) => item.key);
    options.forEach((item) => {
      optionMap[item.key] = item;
    });
  } else if (typeof options === 'object') {
    optionKeys = Object.keys(options);

    // Validation: minimum 3, maximum 8 options
    if (optionKeys.length < 3) {
      console.warn('WagonWheelPicker: Minimum 3 options required. Component may not render correctly.');
    }
    if (optionKeys.length > 8) {
      console.warn('WagonWheelPicker: Maximum 8 options recommended. Additional options will be rendered but may overlap.');
    }

    optionKeys.forEach((k) => {
      const opt = options[k];
      optionMap[k] = typeof opt === 'string'
        ? { key: k, label: k, image: opt }
        : { key: k, label: opt.label || k, image: opt.image };
    });
  } else {
    console.error('WagonWheelPicker: options must be an array or object');
    return null;
  }

  const size = sizeProp || 420;

  // Geometry calculations
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = (size / 2) * outerPercent;
  const rInner = (size / 2) * innerPercent;

  const slices = optionKeys.length || 3;
  const wedgeAngle = 360 / slices;

  // Identify the selected item
  const selectedItem = Object.values(optionMap).find(
    (item) => item.key === value,
  );

  // Build data for each wedge
  const wedgeData: WedgeData[] = optionKeys.map((optionKey, i) => {
    const startAngle = i * wedgeAngle;
    const endAngle = startAngle + wedgeAngle;

    // Calculate coordinates for the arc
    const { x: x1o, y: y1o } = polarToCartesian(rOuter, startAngle, cx, cy);
    const { x: x2o, y: y2o } = polarToCartesian(rOuter, endAngle, cx, cy);
    const { x: x1i, y: y1i } = polarToCartesian(rInner, startAngle, cx, cy);
    const { x: x2i, y: y2i } = polarToCartesian(rInner, endAngle, cx, cy);

    // Define the path for the wedge
    const largeArcFlag = 0;
    const d = [
      `M ${x1o},${y1o}`,
      `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2o},${y2o}`,
      `L ${x2i},${y2i}`,
      `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x1i},${y1i}`,
      'Z',
    ].join(' ');

    // Determine if this wedge is selected
    const isSelected = optionKey === value;

    // Define colors based on selection
    const fillColor = isSelected
      ? theme.selectedBackground || DEFAULT_THEME.selectedBackground
      : theme.wedgeBackground || DEFAULT_THEME.wedgeBackground;

    const strokeColor = isSelected
      ? theme.selectedBorder || DEFAULT_THEME.selectedBorder
      : theme.wedgeBorder || DEFAULT_THEME.wedgeBorder;

    const strokeWidth = isSelected ? 4 : 1.5;

    // Calculate position for the image within the wedge
    const midAngle = startAngle + wedgeAngle / 2;
    const midRadius = (rInner + rOuter) / 2;
    const { x: midX, y: midY } = polarToCartesian(midRadius, midAngle, cx, cy);

    // Define image size - scale with wheel size
    const scaleFactor = size / 420; // Scale relative to default size
    const baseImageSize = isSelected ? 110 : 85;
    const imageSize = baseImageSize * scaleFactor;
    const offset = imageSize / 2;
    const xPos = midX - offset;
    const yPos = midY - offset;

    // Get image and label
    const itemObj = optionMap[optionKey];
    const finalImage = itemObj?.image;
    const altLabel = itemObj?.label || optionKey;

    return {
      baseKey: optionKey,
      index: i,
      isSelected,
      d,
      fillColor,
      strokeColor,
      strokeWidth,
      imageSize,
      xPos,
      yPos,
      altLabel,
      finalImage,
    };
  });

  const normalWedges = wedgeData.map((wedge) => (
    <Wedge
      key={wedge.baseKey}
      wedge={wedge}
      size={size}
      onClick={onClick}
      onMouseEnter={() => setHoverIndex(wedge.index)}
      onMouseLeave={() => setHoverIndex(null)}
      ImageComponent={ImageComponent}
    />
  ));

  const mergedTheme = { ...DEFAULT_THEME, ...theme };

  // Render ghost wedge for selected slice
  let selectedGhost: JSX.Element | null = null;
  if (value) {
    const selIndex = wedgeData.findIndex((w) => w.baseKey === value);
    if (selIndex >= 0) {
      const selWedge = wedgeData[selIndex];
      selectedGhost = (
        <GhostWedge
          key={`selected-ghost-${selWedge.baseKey}`}
          wedge={selWedge}
          size={size}
          ImageComponent={ImageComponent}
          hoverFillColor={mergedTheme.selectedHoverBackground}
        />
      );
    }
  }

  // Render ghost wedge for hovered slice if different from selected
  let hoveredGhost: JSX.Element | null = null;
  if (hoverIndex !== null && hoverIndex >= 0 && hoverIndex < wedgeData.length) {
    const hovered = wedgeData[hoverIndex];
    if (!hovered.isSelected) {
      hoveredGhost = (
        <GhostWedge
          key={`hover-ghost-${hovered.baseKey}`}
          wedge={hovered}
          size={size}
          ImageComponent={ImageComponent}
          hoverFillColor={mergedTheme.hoverBackground}
        />
      );
    }
  }

  // Render focus indicator for keyboard-focused wedge
  let focusIndicator: JSX.Element | null = null;
  if (focusedIndex !== null && focusedIndex >= 0 && focusedIndex < wedgeData.length) {
    const focused = wedgeData[focusedIndex];
    focusIndicator = (
      <path
        key={`focus-indicator-${focused.baseKey}`}
        d={focused.d}
        fill="none"
        stroke={mergedTheme.focusRingColor}
        strokeWidth={4}
        style={{
          pointerEvents: 'none',
          transformOrigin: 'center',
          transformBox: 'fill-box',
          transform: 'scale(1.01)'
        }}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: size,
              height: size,
              filter: 'drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.12))',
              padding: '20px',
              margin: '-20px',
            }}
          >
            <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              overflow: 'visible',
              outline: 'none',
              borderRadius: '50%',
              boxShadow: keyboardFocused ? `0 0 0 3px ${mergedTheme.focusRingColor}` : 'none',
            }}
            xmlns='http://www.w3.org/2000/svg'
            tabIndex={0}
            onKeyDown={(e) => {
              setKeyboardFocused(true);
              handleKeyDown(e);
            }}
            onMouseDown={() => {
              mouseDownRef.current = true;
              setKeyboardFocused(false);
            }}
            onFocus={() => {
              // If focus happened without mouseDown, it's keyboard focus (Tab)
              if (!mouseDownRef.current) {
                setKeyboardFocused(true);
                // Focus the selected option, or the first option if nothing is selected
                const selectedIdx = value ? optionKeys.indexOf(value) : -1;
                setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
              }
              mouseDownRef.current = false;
            }}
            onBlur={() => {
              setKeyboardFocused(false);
              setFocusedIndex(null);
            }}
            role="radiogroup"
            aria-label="Option picker"
            aria-activedescendant={focusedIndex !== null ? `option-${optionKeys[focusedIndex]}` : undefined}
          >
            {/* Wheel Center */}
            <WheelCenter
              cx={cx}
              cy={cy}
              rInner={rInner}
              selectedItem={selectedItem}
              theme={mergedTheme}
              centerText={centerText}
              fontFamily={fontFamily}
            />

            {/* Render normal wedges */}
            {normalWedges}

            {/* Render ghost wedge for selected slice */}
            {selectedGhost}

            {/* Render ghost wedge for hovered slice if different */}
            {hoveredGhost}

            {/* Render focus indicator on top of everything */}
            {focusIndicator}
            </svg>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default WagonWheelPicker;
