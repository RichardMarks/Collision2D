// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

import { pointInsideCircle } from './Math';
import { collidedBox } from './BoxCollision';

// voronoi regions of a rectangle

/**
 * voronoi region that is above and to the left of the rectangle
 * @type {string}
 */
const TOP_LEFT = 'top left';

/**
 * voronoi region that is above the rectangle
 * @type {string}
 */
const TOP_CENTER = 'top center';

/**
 * voronoi region that is above and to the right of the rectangle
 * @type {string}
 */
const TOP_RIGHT = 'top right';

/**
 * voronoi region that is to the left of the rectangle
 * @type {string}
 */
const LEFT_CENTER = 'left center';

/**
 * voronoi region that is to the right of the rectangle
 * @type {string}
 */
const RIGHT_CENTER = 'right center';

/**
 * voronoi region that is below and to the left of the rectangle
 * @type {string}
 */
const BOTTOM_LEFT = 'bottom left';

/**
 * voronoi region that is directly below the rectangle
 * @type {string}
 */
const BOTTOM_CENTER = 'bottom center';

/**
 * voronoi region that is below and to the right of the rectangle
 * @type {string}
 */
const BOTTOM_RIGHT = 'bottom right';

/**
 * sentinel value to signify no voronoi region has been obtained
 * @type {string}
 */
const UNKNOWN = 'unknown'; // sentinel value

/**
 * provides constants for the voronoi regions of a rectangle
 * @type {object}
 * @property {string} TOP_LEFT
 * @property {string} TOP_CENTER
 * @property {string} TOP_RIGHT
 * @property {string} LEFT_CENTER
 * @property {string} RIGHT_CENTER
 * @property {string} BOTTOM_LEFT
 * @property {string} BOTTOM_CENTER
 * @property {string} BOTTOM_RIGHT
 * @property {string} UNKNOWN
 */
const regions = {
  TOP_LEFT, TOP_CENTER, TOP_RIGHT,
  LEFT_CENTER, RIGHT_CENTER,
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
  UNKNOWN,
};

/**
 * checks if a circle and box collider collide
 * @param {Collider} circle - collider instance with type as CIRCLE_COLLIDER to test
 * @param {Collider} rect - collider instance with type as BOX_COLLIDER to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
export function collidedCircleRect(circle, rect) {
  let region = regions.UNKNOWN;

  const boundingCircle = circle.circle;

  // find voronoi region of the circle
  if (boundingCircle.y < rect.top) {
    // above the rectangle top
    // which of top left, top center, or top right?
    region = regions.TOP_CENTER;
    if (boundingCircle.x < rect.left) {
      region = regions.TOP_LEFT;
    } else if (boundingCircle.x > rect.right) {
      region = regions.TOP_RIGHT;
    }
  } else if (boundingCircle.y > rect.bottom) {
    // below rectangle bottom
    // which of bottom left, bottom center, or bottom right?
    region = regions.BOTTOM_CENTER;
    if (boundingCircle.x < rect.left) {
      region = regions.BOTTOM_LEFT;
    } else if (boundingCircle.x > rect.right) {
      region = regions.BOTTOM_RIGHT;
    }
  } else {
    // must be in a central position
    // left center or right center?
    region = regions.RIGHT_CENTER;
    if (circle.right < rect.left) {
      region = regions.LEFT_CENTER;
    }
  }

  circle.region = region;
  const circlesRect = {
    left: boundingCircle.left,
    top: boundingCircle.top,
    right:boundingCircle.right,
    bottom:boundingCircle.bottom,
  };
  circle.circlesRect = circlesRect;

  // handle central regions as a simple box collision
  const found = [
    regions.TOP_CENTER,
    regions.BOTTOM_CENTER,
    regions.LEFT_CENTER,
    regions.RIGHT_CENTER,
  ].find(checkRegion => region === checkRegion);
  if (found) {
    if (collidedBox(circlesRect, rect)) {
      return true;
    }
  }

  let x = 0;
  let y = 0;
  // circle must be near a corner
  // just check intersection of the circle and the corner vertex
  if (region === regions.TOP_LEFT) {
    x = rect.left;
    y = rect.top;
  } else if (region === regions.TOP_RIGHT) {
    x = rect.right;
    y = rect.top;
  } else if (region === regions.BOTTOM_LEFT) {
    x = rect.left;
    y = rect.bottom;
  } else if (region === regions.BOTTOM_RIGHT) {
    x = rect.right;
    y = rect.bottom;
  }
  if (pointInsideCircle(x, y, boundingCircle, circle.radius)) {
    return true;
  }
  return false;
}

/**
 * checks if box collider and a circle collider collide
 * @param {Collider} rect - collider instance with type as BOX_COLLIDER to test against
 * @param {Collider} circle - collider instance with type as CIRCLE_COLLIDER to test
 * @return {boolean} - true if the the objects collided, false if they did not
 */
export function collidedRectCircle(rect, circle) {
  return collidedCircleRect(circle, rect);
}
