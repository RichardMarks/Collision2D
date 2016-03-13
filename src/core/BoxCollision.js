// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

/**
 * simple bounding box rect vs rect collision test
 * uses short-circuit logic for optimized calculation
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
export function collidedBox(a, b) {
  return !((a.bottom < b.top) || (a.top > b.bottom) || (a.left > b.right) || (a.right < b.left));
}
