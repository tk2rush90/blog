export interface Point {
  x: number;
  y: number;
}

/**
 * check whether the circle contains point or not
 * @param cx circle center x
 * @param cy circle center y
 * @param r circle radius
 * @param x point x
 * @param y point y
 */
export function circleContainsPoint(cx: number, cy: number, r: number, x: number, y: number): boolean {
  return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) < Math.pow(r, 2);
}

/**
 * get point on line
 * from https://www.codeproject.com/Questions/224182/Get-all-points-in-a-Line
 * @param start start point of line
 * @param end end point of line
 * @param x x position to get point on line
 */
export function getPointOnLine(start: Point, end: Point, x: number): Point {
  const m = (start.y - end.y) / (start.x - end.x);
  const c = start.y - start.x * m;
  const y = m * x + c;

  return {
    x,
    y,
  };
}

/**
 * get the angle of line
 * from https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
 * @param start start point of line
 * @param end end point of line
 */
export function getAngleOfLine(start: Point, end: Point): number {
  const dy = end.y - start.y;
  const dx = end.x - start.x;

  return Math.atan2(dy, dx);
}

/**
 * get line total length
 * @param start start point
 * @param end end point
 */
export function getLineLength(start: Point, end: Point): number {
  const a = (end.x - start.x);
  const b = (end.y - start.y);

  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

/**
 * get the x list of line slope
 * from https://community.esri.com/t5/arcgis-api-for-javascript/point-along-a-line/td-p/479200
 * @param start start of line
 * @param end end of line
 * @param slopeLength length of slope to divide the line
 */
export function getPointsOfLineSlope(start: Point, end: Point, slopeLength: number): Point[] {
  const angle = getAngleOfLine(start, end);
  const c = getLineLength(start, end);
  const points: Point[] = [];

  // i is slope length
  for (let i = 0; i <= c; i += slopeLength) {
    points.push({
      x: start.x + (i * Math.cos(angle)),
      y: start.y + (i * Math.sin(angle)),
    });
  }

  return points;
}

/**
 * degree to radian
 * @param degree degree
 */
export function degreeToRadian(degree: number): number {
  return degree * (Math.PI / 180);
}

/**
 * get the points of arc lines
 * @param center center point of circle
 * @param start start angle
 * @param end end angle
 * @param radius radius of circle
 * @param arcLength arc length to divide
 */
export function getPointsOfArcLine(
  center: Point,
  start: number,
  end: number,
  radius: number,
  arcLength: number,
): Point[] {
  const points: Point[] = [];
  // angle for arc length
  const r = arcLength / radius;

  for (let i = start; i <= end; i += r) {
    points.push(getPointOnArc(center, i, radius));
  }

  return points;
}

/**
 * get x,y point on arc
 * @param center center of arc
 * @param angle angle of arc
 * @param radius radius
 */
export function getPointOnArc(center: Point, angle: number, radius: number): Point {
  return {
    x: center.x + (radius * Math.cos(angle)),
    y: center.y + (radius * Math.sin(angle)),
  };
}

/**
 * get angle between 2 lines
 * the first array of line 1 and 2 should be joint point
 * @param line1 line 1
 * @param line2 line 2
 */
export function getAngleBetweenTwoLines(line1: Point[], line2: Point[]): number {
  const t1 = Math.atan((line1[1].y - line1[0].y) / (line1[1].x - line1[0].x));
  const t2 = Math.atan((line2[1].y - line2[0].y) / (line2[1].x - line2[0].x));

  return t2 - t1;
}

/**
 * get moved point with angle and distance
 * from https://gist.github.com/ashblue/3860114
 * @param point initial point
 * @param angle moving direction in radian
 * @param distance distance to move
 */
export function getMovedPoint(point: Point, angle: number, distance: number): Point {
  return {
    x: point.x + (Math.sin(angle) * distance),
    y: point.y - (Math.cos(angle) * distance),
  };
}
