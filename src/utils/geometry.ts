/**
 * Converts degrees to radians.
 * @param deg - The degree value to convert.
 * @returns The value in radians.
 */
export const degToRad = (deg: number): number => (Math.PI / 180) * deg;

/**
 * Converts polar coordinates to Cartesian coordinates.
 * @param r - The radius (distance from the origin).
 * @param angleDeg - The angle in degrees.
 * @param cx - The x-coordinate of the circle's center.
 * @param cy - The y-coordinate of the circle's center.
 * @returns The Cartesian coordinates { x, y }.
 */
export const polarToCartesian = (
  r: number,
  angleDeg: number,
  cx: number = 0,
  cy: number = 0
): { x: number; y: number } => {
  const angleRad = degToRad(angleDeg - 90); // Offset by 90 degrees for correct orientation
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

/**
 * Generates path data for an SVG wedge.
 * @param cx - The x-coordinate of the circle's center.
 * @param cy - The y-coordinate of the circle's center.
 * @param rOuter - The radius of the outer circle.
 * @param rInner - The radius of the inner circle.
 * @param startAngle - The starting angle of the wedge (in degrees).
 * @param endAngle - The ending angle of the wedge (in degrees).
 * @returns The SVG path data for the wedge.
 */
export const generateWedgePath = (
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number
): string => {
  const { x: x1o, y: y1o } = polarToCartesian(rOuter, startAngle, cx, cy);
  const { x: x2o, y: y2o } = polarToCartesian(rOuter, endAngle, cx, cy);
  const { x: x1i, y: y1i } = polarToCartesian(rInner, startAngle, cx, cy);
  const { x: x2i, y: y2i } = polarToCartesian(rInner, endAngle, cx, cy);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${x1o},${y1o}`,
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2o},${y2o}`,
    `L ${x2i},${y2i}`,
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x1i},${y1i}`,
    'Z',
  ].join(' ');
};
