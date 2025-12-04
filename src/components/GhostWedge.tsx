import React from 'react';
import { WedgeData } from './Wedge';

// Try to import framer-motion, but gracefully handle if it's not available
let motion: any;
try {
  const framerMotion = require('framer-motion');
  motion = framerMotion.motion;
} catch (e) {
  // Framer Motion not available, use regular elements
  motion = null;
}

export interface GhostWedgeProps {
  wedge: WedgeData;
  size: number;
  ImageComponent?: React.ComponentType<any>;
}

const GhostWedge: React.FC<GhostWedgeProps> = ({ wedge, size, ImageComponent }) => {
  // Use framer-motion if available, otherwise use regular SVG elements
  const GElement = motion ? motion.g : 'g';
  const PathElement = motion ? motion.path : 'path';

  const gProps = motion
    ? {
        initial: { scale: 1.05 },
        animate: { scale: 1.05 },
        transition: { type: 'spring', stiffness: size },
        style: { pointerEvents: 'none' },
      }
    : {
        style: {
          pointerEvents: 'none',
          transform: 'scale(1.05)',
        },
      };

  const pathProps = {
    d: wedge.d,
    fill: wedge.fillColor,
    stroke: wedge.strokeColor,
    strokeWidth: wedge.strokeWidth,
    style: {
      pointerEvents: 'none' as const,
      filter: 'drop-shadow(0px 3px 12px rgba(0, 0, 0, 0.25))'
    },
  };

  // Use custom Image component if provided, otherwise use standard img
  const ImageEl = ImageComponent || 'img';
  const imageProps = ImageComponent
    ? {
        src: wedge.finalImage,
        alt: wedge.altLabel,
        width: wedge.imageSize,
        height: wedge.imageSize,
        style: {
          objectFit: 'contain' as const,
          transition: 'all 0.05s ease',
        },
      }
    : {
        src: wedge.finalImage,
        alt: wedge.altLabel,
        width: wedge.imageSize,
        height: wedge.imageSize,
        style: {
          objectFit: 'contain' as const,
          transition: 'all 0.05s ease',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      };

  return (
    <GElement {...gProps}>
      <PathElement {...pathProps} />
      <foreignObject
        x={wedge.xPos}
        y={wedge.yPos}
        width={wedge.imageSize}
        height={wedge.imageSize}
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

export default GhostWedge;
