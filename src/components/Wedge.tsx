import React from 'react';
import { motion } from 'framer-motion';

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
  ImageComponent,
}) => {
  const {
    baseKey,
    isSelected,
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
    <motion.g
      key={baseKey}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: size }}
      style={{ cursor: 'pointer' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={`option-${baseKey}`}
      role="radio"
      aria-checked={isSelected}
      aria-label={altLabel}
    >
      <motion.path
        d={d}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        style={{ pointerEvents: 'auto' }}
        onClick={() => onClick?.(baseKey)}
      />
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
    </motion.g>
  );
};

export default Wedge;
