// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks
import { Collider } from './Collider';
import { collidedBox } from './BoxCollision';
import { collidedCircle } from './CircleCollision';
import { collidedAlpha } from './AlphaCollision';
import { collidedCircleRect } from './BoxCircleCollision';

/**
 * checks if two colliders collide. the type of the colliders are used to automatically determine which type of collision testing to perform.
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
export function collided(a, b) {
  if (a === b) { return false; }
  
  // alpha vs any -> test pixel perfect collision
  if (Collider.isAlpha(a) || Collider.isAlpha(b)) {
    return collidedAlpha(a, b);
  }

  // rect vs rect -> test bounding box collision
  if (Collider.isBox(a) && Collider.isBox(b)) {
    return collidedBox(a, b);
  }

  // circle vs circle -> test bounding circle collision
  if (Collider.isCircle(a) && Collider.isCircle(b)) {
    return collidedCircle(a, b);
  }

  // rect vs circle -> test bounding rect vs bounding circle collision
  if (Collider.isBox(a) && Collider.isCircle(b)) {
    return collidedCircleRect(b, a);
  }

  // circle vs rect -> test bounding rect vs bounding circle collision
  if (Collider.isCircle(a) && Collider.isBox(b)) {
    return collidedCircleRect(a, b);
  }
}
