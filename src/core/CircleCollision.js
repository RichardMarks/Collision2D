// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

import { pointInsideCircle } from './Math';
import { collidedBox } from './BoxCollision';

/**
 * simple circle vs circle collision test
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
export function collidedCircle(a, b) {
  if (!collidedBox(a, b)) {
    return false;
  }
  return pointInsideCircle(b.x, b.y, a, a.radius + b.radius);
}
