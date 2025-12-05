import React from 'react';
import { motion } from 'framer-motion';
import { WedgeData } from './Wedge';

export interface GhostWedgeProps {
  wedge: WedgeData;
  size: number;
  ImageComponent?: React.ComponentType<any>;
}

const GhostWedge: React.FC<GhostWedgeProps> = ({ wedge, size, ImageComponent }) => {
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
    <motion.g
      initial={{ scale: 1.05 }}
      animate={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: size }}
      style={{ pointerEvents: 'none' }}
    >
      <motion.path
        d={wedge.d}
        fill={wedge.fillColor}
        stroke={wedge.strokeColor}
        strokeWidth={wedge.strokeWidth}
        style={{ pointerEvents: 'none', filter: 'drop-shadow(0px 3px 12px rgba(0, 0, 0, 0.25))' }}
      />
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
    </motion.g>
  );
};

export default GhostWedge;
