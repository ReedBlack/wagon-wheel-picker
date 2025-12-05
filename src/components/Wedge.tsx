import React from 'react';

// Try to import framer-motion, but gracefully handle if it's not available
let motion: any;
try {
  const framerMotion = require('framer-motion');
  motion = framerMotion.motion;
} catch (e) {
  // Framer Motion not available, use regular elements
  motion = null;
}

export interface WedgeData {
  baseKey: string;
  index: number;
  isSelected: boolean;
  d: string;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  xPos: number;
  yPos: number;
  imageSize: number;
  finalImage: string;
  altLabel: string;
}

export interface WedgeProps {
  wedge: WedgeData;
  onClick?: (key: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  size: number;
  ImageComponent?: React.ComponentType<any>;
}

const Wedge: React.FC<WedgeProps> = ({
  wedge,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size,
  ImageComponent
}) => {
  const {
    baseKey,
    d,
    fillColor,
    strokeColor,
    strokeWidth,
    xPos,
    yPos,
    imageSize,
    finalImage,
    altLabel,
  } = wedge;

  // Use framer-motion if available, otherwise use regular SVG elements
  const GElement = motion ? motion.g : 'g';
  const PathElement = motion ? motion.path : 'path';

  const gProps = motion
    ? {
        initial: { scale: 1 },
        whileHover: { scale: 1.03 },
        transition: { type: 'spring', stiffness: 200, damping: 15 },
        style: { cursor: 'pointer', transformOrigin: 'center' },
        onMouseEnter,
        onMouseLeave,
      }
    : {
        style: {
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          transformOrigin: 'center'
        },
        onMouseEnter: (e: React.MouseEvent) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
          onMouseEnter?.();
        },
        onMouseLeave: (e: React.MouseEvent) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          onMouseLeave?.();
        },
      };

  const pathProps = {
    d,
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth,
    style: { pointerEvents: 'auto' as const },
    onClick: () => onClick?.(baseKey),
  };

  // Use custom Image component if provided, otherwise use standard img
  const ImageEl = ImageComponent || 'img';
  const imageProps = ImageComponent
    ? {
        src: finalImage,
        alt: altLabel,
        width: imageSize,
        height: imageSize,
        style: {
          objectFit: 'contain' as const,
          transition: 'all 0.05s ease',
        },
      }
    : {
        src: finalImage,
        alt: altLabel,
        width: imageSize,
        height: imageSize,
        style: {
          objectFit: 'contain' as const,
          transition: 'all 0.05s ease',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      };

  return (
    <GElement key={baseKey} {...gProps}>
      <PathElement {...pathProps} />
      <foreignObject
        x={xPos}
        y={yPos}
        width={imageSize}
        height={imageSize}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageEl {...imageProps} />
        </div>
      </foreignObject>
    </GElement>
  );
};

export default Wedge;
