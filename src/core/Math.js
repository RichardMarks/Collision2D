// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

import { BoundingBox } from './BoundingBox';

/**
 * gets a new rect containing the intersection of two bounding boxes
 * @param {{left:number, top:number, right:number, bottom:number}} a - bounding box to test
 * @param {{left:number, top:number, right:number, bottom:number}} b - bounding box to test against
 * @return {?BoundingBox} - null if the bounding boxes do not intersect, or the rectangle that describes the intersection of the bounding boxes
 */
export function intersection(a, b) {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  if (right > left && bottom > top) {
    return new BoundingBox(left, top, right - left, bottom - top);
  }
  return null;
}

/**
 * checks if there is an intersection between two bounding boxes
 * @param {{left:number, top:number, right:number, bottom:number}} a - bounding box to test
 * @param {{left:number, top:number, right:number, bottom:number}} b - bounding box to test against
 * @return {boolean} - true if the bounding boxes intersect
 */
export function intersects(a, b) {
  return intersection(a, b) !== null;
}

/**
 * simple point in circle test
 * avoids a slow square root calculation by comparing a squared radius
 * @param {number} x - point X axis coordinate
 * @param {number} y - point Y axis coordinate
 * @param {{x:number, y:mnumber}} center - center of the circle
 * @param {number} radius - radius of the circle
 * @return {boolean} - true if the point is inside of the circle, false if the point is outside of the circle
 */
export function pointInsideCircle(x, y, center, radius) {
  const dx = center.x - x;
  const dy = center.y - y;
  const dist = dx * dx + dy * dy;
  return Math.abs(dist) < radius * radius;
}
