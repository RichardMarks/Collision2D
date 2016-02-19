// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

const BOX_COLLIDER_TYPE = 'box';
const CIRCLE_COLLIDER_TYPE = 'circle';
const ALPHA_COLLIDER_TYPE = 'alpha';

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  get left() { return this.x; }
  get top() { return this.y; }
  get right() { return this.x + this.width; }
  get bottom() { return this.y + this.height; }
}

class Collider {

  static isBox(collider) { return collider.type === BOX_COLLIDER_TYPE; }
  static isCircle(collider) { return collider.type === CIRCLE_COLLIDER_TYPE; }
  static isAlpha(collider) { return collider.type === ALPHA_COLLIDER_TYPE; }

  static get BOX_COLLIDER() { return BOX_COLLIDER_TYPE; };
  static get CIRCLE_COLLIDER() { return CIRCLE_COLLIDER_TYPE; }
  static get ALPHA_COLLIDER() { return ALPHA_COLLIDER_TYPE; }

  constructor({type, displayObject, width, height, radius}) {
    // if no displayObject, cannot proceed
    if (!displayObject) {
      throw new Error(`Must have a DisplayObject passed to the Collision2D.Collider constructor "displayObject" parameter!`);
    }
    this._displayObject = displayObject;
    const bounds = displayObject.getBounds();

    // if no type, default to box collider
    if (!type) {
      this._type = BOX_COLLIDER_TYPE;
    } else {
      // validate the type
      this._type = type;
      if (![BOX_COLLIDER_TYPE, CIRCLE_COLLIDER_TYPE, ALPHA_COLLIDER_TYPE].find(checkType => type === checkType)) {
        throw new Error(`Unknown Collision2D.Collider Type: ${type} "box", "circle", and "alpha" are valid Types.`);
      }
    }

    // set width and height to display object bounds
    this._width = bounds.width;
    this._height = bounds.height;

    // if width and height are specified to constructor, use them instead
    if (typeof width !== 'undefined' && typeof height !== 'undefined') {
      this._width = width;
      this._height = height;
    }

    // set radius based on bounding box or use defined value
    if (typeof radius !== 'undefined') {
      this._radius = Math.floor(0.5 * Math.sqrt(this._width * this._width + this._height * this._height));
    } else {
      this._radius = radius;
    }

    // prepare for alpha testing
    this._alphaTestingCanvas = document.createElement('canvas');
    this._alphaTestingContext = this._alphaTestingCanvas.getContext('2d');
    this._alphaTestingContext.width = this._width;
    this._alphaTestingContext.height = this._height;
  }

  imgData(x, y, w, h) {
    this._displayObject.draw(this._alphaTestingContext);
    return this._alphaTestingContext.getImageData(x, y, w, h);
  }

  get type() { return this._type; }

  get displayObject() { return this._displayObject; }

  get x() {
    if (this._type === CIRCLE_COLLIDER_TYPE) {
      return this._displayObject.x + this._radius;
    }
    return this._displayObject.x;
  }

  get y() {
    if (this._type === CIRCLE_COLLIDER_TYPE) {
      return this._displayObject.y + this._radius;
    }
    return this._displayObject.y;
  }

  get width() { return this._width; }
  get height() { return this._height; }
  get radius() { return this._radius; }
  get left() { return this.x; }
  get top() { return this.y; }
  get right() { return this.x + this.width; }
  get bottom() { return this.y + this.height; }
}

// returns a new rect containing the intersection of the bounding box of both
// colliders or null if they do not intersect
function intersection(a, b) {
  const left = Math.max(rect.left, otherRect.left);
  const top = Math.max(rect.top, otherRect.top);
  const right = Math.min(rect.right, otherRect.right);
  const bottom = Math.min(rect.bottom, otherRect.bottom);
  if (right >= left && bottom >= top) {
    return new Rect(left, top, right - left, bottom - top);
  }
  return null;
}

// checks if there is an intersection
function intersects(a, b) {
  return intersection(a, b) !== null;
}

// simple point in circle test
// avoids a slow square root calculation by comparing a squared radius
function pointInsideCircle(x, y, center, radius) {
  const dx = center.x - x;
  const dy = center.y - y;
  const dist = dx * dx + dy * dy;
  return Math.abs(dist) < radius * radius;
}

// simple bounding box rect vs rect collision test
// uses short-circuit logic for optimized calculation
function collidedBox(a, b) {
  return !((a.bottom < b.top) || (a.top > b.bottom) || (a.left > b.right) || (a.right < b.left));
}

// simple circle vs circle collision test
function collidedCircle(a, b) {
  return pointInsideCircle(b.x, b.y, a, a.radius + b.radius);
}

// pixel perfect collision detection between two display objects
// uses bounding box collision detection first to determine if
// the two objects intersect. if no intersection, there can be no
// collision, so testing the pixels is not necessary.
// only the pixels in the overlapped section are tested by pixel
function collidedAlpha(a, b) {
  if (!collidedBox(a, b)) {
    return false;
  }

  // objects collided but they may not be overlapping (edge collision)
  // get overlap to find out
  const overlap = intersection(a, b);
  if (!overlap) {
    return false;
  }

  // get the overlapping pixel data from each collider
  const aImgData = a.imgData(overlap.x - a.x, overlap.y - a.y, overlap.width, overlap.height);
  const bImgData = b.imgData(overlap.x - b.x, overlap.y - b.y, overlap.width, overlap.height);
  const aPixels = aImgData.data;
  const bPixels = bImgData.data;
  const count = aPixels.length; // both aPixels and bPixels have the same length
  const componentCount = 4; // RGBA pixel data
  const alphaComponent = 3; // [0=R, 1=G, 2=B, 3=A]
  const transparent = 0;
  for (let i = 0; i < count; i += componentCount) {
    const index = i + alphaComponent;
    if (aPixels[index] !== transparent && bPixels[index] !== transparent) {
      return true;
    }
  }
  return false;
}

// voronoi regions of a rectangle
const TOP_LEFT = 'top left';
const TOP_CENTER = 'top center';
const TOP_RIGHT = 'top right';
const LEFT_CENTER = 'left center';
const RIGHT_CENTER = 'right center';
const BOTTOM_LEFT = 'bottom left';
const BOTTOM_CENTER = 'bottom center';
const BOTTOM_RIGHT = 'bottom right';
const UNKNOWN = 'unknown'; // sentinel value
const regions = {
  TOP_LEFT, TOP_CENTER, TOP_RIGHT,
  LEFT_CENTER, RIGHT_CENTER,
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT,
  UNKNOWN
};

function collidedCircleRect(circle, rect) {
  let region = regions.UNKNOWN;

  // find voronoi region of the circle
  if (circle.y < rect.top) {
    // above the rectangle top
    // which of top left, top center, or top right?
    region = regions.TOP_CENTER;
    if (circle.x < rect.left) {
      region = regions.TOP_LEFT;
    } else if (circle.x > rect.right) {
      region = regions.TOP_RIGHT;
    }
  } else if (circle.y > rect.bottom) {
    // below rectangle bottom
    // which of bottom left, bottom center, or bottom right?
    region = regions.BOTTOM_CENTER;
    if (circle.x < rect.left) {
      region = regions.BOTTOM_LEFT;
    } else if (circle.x > rect.right) {
      region = regions.BOTTOM_RIGHT;
    }
  } else {
    // must be in a central position
    // left center or right center?
    region = regions.RIGHT_CENTER;
    if (circle.x < rect.left) {
      region = regions.LEFT_CENTER;
    }
  }

  // handle central regions as a simple box collision
  const found = [
    regions.TOP_CENTER,
    regions.BOTTOM_CENTER,
    regions.LEFT_CENTER,
    regions.RIGHT_CENTER
  ].find(checkRegion => region === checkRegion);
  if (found) {
    if (collidedBox(circle, rect)) {
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
  if (pointInsideCircle(x, y, circle, circle.radius)) {
    return true;
  }
  return false;
}

function collided(a, b) {
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

function createBoxCollider({displayObject, width, height}) {
  let collider = new Collider({type: BOX_COLLIDER_TYPE, displayObject, width, height});
  return collider;
}

function createCircleCollider({displayObject, radius}) {
  let collider = new Collider({type: CIRCLE_COLLIDER_TYPE, displayObject, radius});
  return collider;
}

function createAlphaCollider({displayObject}) {
  let collider = new Collider({type: ALPHA_COLLIDER_TYPE, displayObject});
  return collider;
}

/**
 * provides the public collision detection API
 */
export const api = {
  // expose aliases for collider types
  BOX_COLLIDER: Collider.BOX_COLLIDER,
  CIRCLE_COLLIDER: Collider.CIRCLE_COLLIDER,
  ALPHA_COLLIDER: Collider.ALPHA_COLLIDER,

  // expose the simple public API
  createBoxCollider,
  createCircleCollider,
  createAlphaCollider,
  collided
};

/**
 * provides the entire collision detection API for advanced use
 * same as the "api" export, but includes access to internal classes
 */
export const fullAPI = {

  // expose internal collider class
  Collider,

  // expose the internal Rect class
  Rect,

  // expose the internal utility functions
  intersection,
  intersects,
  pointInsideCircle,
  collidedBox,
  collidedCircle,
  collidedCircleRect,
  collidedAlpha,

  // expose aliases for collider types
  BOX_COLLIDER: Collider.BOX_COLLIDER,
  CIRCLE_COLLIDER: Collider.CIRCLE_COLLIDER,
  ALPHA_COLLIDER: Collider.ALPHA_COLLIDER,

  // expose the simple public API
  createBoxCollider,
  createCircleCollider,
  createAlphaCollider,
  collided
};
