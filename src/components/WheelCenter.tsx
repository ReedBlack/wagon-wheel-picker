import React from 'react';

export interface WheelCenterProps {
  cx: number;
  cy: number;
  rInner: number;
  selectedItem?: {
    key: string;
    label?: string;
    image?: string;
  } | null;
  theme: {
    centerBackground?: string;
    centerText?: string;
    centerBorder?: string;
  };
  centerText?: string[];
  fontFamily?: string;
}

const WheelCenter: React.FC<WheelCenterProps> = ({
  cx,
  cy,
  rInner,
  selectedItem,
  theme,
  centerText = ['SELECT', 'YOUR', 'OPTION'],
  fontFamily = 'serif',
}) => {
  // Generate unique pattern ID for this instance
  const patternId = React.useMemo(
    () => `center-image-pattern-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  // Define pattern for center image if a selection exists
  let centerImagePattern: JSX.Element | null = null;
  if (selectedItem?.image) {
    const centerSize = rInner * 2; // diameter matching inner radius

    centerImagePattern = (
      <defs>
        <pattern
          id={patternId}
          patternUnits='userSpaceOnUse'
          x={cx - centerSize / 2}
          y={cy - centerSize / 2}
          width={centerSize}
          height={centerSize}
        >
          <image
            href={selectedItem.image}
            x='0'
            y='0'
            width={centerSize}
            height={centerSize}
            preserveAspectRatio='xMidYMid slice'
          />
        </pattern>
      </defs>
    );
  }

  return (
    <>
      {centerImagePattern}
      <circle
        cx={cx}
        cy={cy}
        r={rInner}
        fill={selectedItem?.image ? `url(#${patternId})` : theme.centerBackground}
        stroke={theme.centerBorder}
        strokeWidth={2}
      />
      {!selectedItem && (
        <foreignObject
          x={cx - rInner}
          y={cy - rInner * 0.5}
          width={rInner * 2}
          height={rInner}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fontFamily,
              fontSize: '16px',
              fontWeight: 500,
              color: theme.centerText,
              textAlign: 'center',
              pointerEvents: 'none',
              lineHeight: 1.2,
            }}
          >
            {centerText.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </foreignObject>
      )}
    </>
  );
};

export default WheelCenter;
