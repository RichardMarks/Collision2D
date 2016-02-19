// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

/**
 * box collider type
 * @type {string}
 */
const BOX_COLLIDER_TYPE = 'box';

/**
 * circle collider type
 * @type {string}
 */
const CIRCLE_COLLIDER_TYPE = 'circle';

/**
 * alpha collider type
 * @type {string}
 */
const ALPHA_COLLIDER_TYPE = 'alpha';

/**
 * provides a bounding box construct
 */
class BoundingBox {
  /**
   * class constructor
   * @param {number} x - x axis coordinate of top-left corner of the bounding box
   * @param {number} y - y axis coordinate of top-left corner of the bounding box
   * @param {number} width - width of the bounding box
   * @param {number} height - height of the bounding box
   */
  constructor(x, y, width, height) {
    /**
     * x axis coordinate of top-left corner of the bounding box
     * @type {number}
     */
    this.x = x;

    /**
     * y axis coordinate of top-left corner of the bounding box
     * @type {number}
     */
    this.y = y;

    /**
     * width of the bounding box
     * @type {number}
     */
    this.width = width;

    /**
     * height of the bounding box
     * @type {number}
     */
    this.height = height;
  }

  /**
   * x axis coordinate of left side of the bounding box
   * @type {number}
   */
  get left() { return this.x; }

  /**
   * y axis coordinate of top side of the bounding box
   * @type {number}
   */
  get top() { return this.y; }

  /**
   * x axis coordinate of right side of the bounding box
   * @type {number}
   */
  get right() { return this.x + this.width; }

  /**
   * y axis coordinate of bottom side of the bounding box
   * @type {number}
   */
  get bottom() { return this.y + this.height; }
}

/**
 * provides the collision testing object
 */
class Collider {

  /**
   * checks if a collider is a box collider
   * @param {Collider} collider - collider to check
   * @return {boolean} - true if the collider is a box collider
   */
  static isBox(collider) { return collider.type === BOX_COLLIDER_TYPE; }

  /**
   * checks if a collider is a circle collider
   * @param {Collider} collider - collider to check
   * @return {boolean} - true if the collider is a circle collider
   */
  static isCircle(collider) { return collider.type === CIRCLE_COLLIDER_TYPE; }

  /**
   * checks if a collider is an alpha collider
   * @param {Collider} collider - collider to check
   * @return {boolean} - true if the collider is an alpha collider
   */
  static isAlpha(collider) { return collider.type === ALPHA_COLLIDER_TYPE; }

  /**
   * box collider type
   * @type {string}
   */
  static get BOX_COLLIDER() { return BOX_COLLIDER_TYPE; };

  /**
   * circle collider type
   * @type {string}
   */
  static get CIRCLE_COLLIDER() { return CIRCLE_COLLIDER_TYPE; }

  /**
   * alpha collider type
   * @type {string}
   */
  static get ALPHA_COLLIDER() { return ALPHA_COLLIDER_TYPE; }

  /**
   * class constructor
   * @param {Object} config - configuration object uses destructuring syntax for readable function call at the cost of a small performance hit
   * @param {string} config.type - type of collider to create {@link Collider.BOX_COLLIDER} {@link Collider.ALPHA_COLLIDER} {@link Collider.CIRCLE_COLLIDER}
   * @param {DisplayObject} config.displayObject - EaselJS DisplayObject which provides the data which will be used by the collider
   * @param {number} [config.width] - optional width of the collider to override the default bounding box obtained from the DisplayObject
   * @param {number} [config.height] - optional height of the collider to override the default bounding box obtained from the DisplayObject
   * @param {number} [config.radius] - optional radius of the collider to override the default bounding circle obtained from the DisplayObject
   */
  constructor({type, displayObject, width, height, radius}) {
    // if no displayObject, cannot proceed
    if (!displayObject) {
      throw new Error(`Must have a DisplayObject passed to the Collision2D.Collider constructor "displayObject" parameter!`);
    }
    /**
     * DisplayObject of his collider
     * @type {DisplayObject}
     */
    this._displayObject = displayObject;

    /**
     * pivot of this collider - used to obtain correct coordinates
     * @type {{x:number, y:number}}
     */
    this._pivot = {
      x: displayObject.regX,
      y: displayObject.regY
    };
    const bounds = displayObject.getBounds();

    // if no type, default to box collider
    if (!type) {
      /**
       * type of this collider
       * @type {string}
       */
      this._type = BOX_COLLIDER_TYPE;
    } else {
      // validate the type
      this._type = type;
      if (![BOX_COLLIDER_TYPE, CIRCLE_COLLIDER_TYPE, ALPHA_COLLIDER_TYPE].find(checkType => type === checkType)) {
        throw new Error(`Unknown Collision2D.Collider Type: ${type} "box", "circle", and "alpha" are valid Types.`);
      }
    }

    // set width and height to display object bounds
    /**
     * width of the bounding box of this collider
     * @type {number}
     */
    this._width = bounds.width;

    /**
     * height of the bounding box of this collider
     * @type {number}
     */
    this._height = bounds.height;

    // if width and height are specified to constructor, use them instead
    if (typeof width !== 'undefined' && typeof height !== 'undefined') {
      this._width = width;
      this._height = height;
    }

    // set radius based on bounding box or use defined value
    if (typeof radius !== 'undefined') {
      /**
       * radius of the bounding circle of this collider
       * @type {number}
       */
      this._radius = Math.floor(0.5 * Math.sqrt(this._width * this._width + this._height * this._height));
    } else {
      this._radius = radius;
    }

    // prepare for alpha testing
    /**
     * off-screen canvas used by alpha collision testing
     * @type {HTMLCanvasElement}
     */
    this._alphaTestingCanvas = document.createElement('canvas');
    /**
     * off-screen canvas rendering context
     * @type {CanvasRenderingContext2D}
     */
    this._alphaTestingContext = this._alphaTestingCanvas.getContext('2d');
    this._alphaTestingContext.width = this._width;
    this._alphaTestingContext.height = this._height;
  }

  /**
   * renders the {@link Collider.displayObject} to an off-screen canvas and returns the ImageData for the defined area
   * @param {number} x - x axis coordinate of area of pixels to extract
   * @param {number} y - y axis coordinate of area of pixels to extract
   * @param {number} w - width of area of pixels to extract
   * @param {number} h - height of area of pixels to extract
   * @returns {ImageData} image pixel data object for the area requested
   */
  imgData(x, y, w, h) {
    this._displayObject.draw(this._alphaTestingContext);
    return this._alphaTestingContext.getImageData(x, y, w, h);
  }

  /**
   * type of this collider
   * @type {string}
   */
  get type() { return this._type; }

  /**
   * EaselJS DisplayObject which provides the data which will be used by the collider
   * @type {DisplayObject}
   */
  get displayObject() { return this._displayObject; }

  /**
   * x axis coordinate at the center of a circle collider, or top-left corner of any other collider type
   * @type {number}
   */
  get x() {
    if (this._type === CIRCLE_COLLIDER_TYPE) {
      return this._displayObject.x + this._radius - this._pivot.x;
    }
    return this._displayObject.x - this._pivot.x;
  }

  /**
   * y axis coordinate at the center of a circle collider, or top-left corner of any other collider type
   * @type {number}
   */
  get y() {
    if (this._type === CIRCLE_COLLIDER_TYPE) {
      return this._displayObject.y + this._radius - this._pivot.y;
    }
    return this._displayObject.y - this._pivot.y;
  }

  /**
   * width of the collider bounding box
   * @type {number}
   */
  get width() { return this._width; }

  /**
   * height of the collider bounding box
   * @type {number}
   */
  get height() { return this._height; }

  /**
   * radius of the collider bounding circle
   * @type {number}
   */
  get radius() { return this._radius; }

  /**
   * x axis coordinate of the left side of the collider bounding box
   * @type {number}
   */
  get left() { return this.x; }

  /**
   * y axis coordinate of the top side of the collider bounding box
   * @type {number}
   */
  get top() { return this.y; }

  /**
   * x axis coordinate of the right side of the collider bounding box
   * @type {number}
   */
  get right() { return this.x + this.width; }

  /**
   * y axis coordinate of the bottom side of the collider bounding box
   * @type {number}
   */
  get bottom() { return this.y + this.height; }

  /**
   * x axis coordinate of the collider pivot (set as the displayObject registration point in constructor)
   * @type {number}
   */
  get pivotX() { return this._pivot.x; }

  /**
   * y axis coordinate of the collider pivot (set as the displayObject registration point in constructor)
   * @type {number}
   */
  get pivotY() { return this._pivot.y; }
}

/**
 * gets a new rect containing the intersection of two bounding boxes
 * @param {{left:number, top:number, right:number, bottom:number}} a - bounding box to test
 * @param {{left:number, top:number, right:number, bottom:number}} b - bounding box to test against
 * @return {?BoundingBox} - null if the bounding boxes do not intersect, or the rectangle that describes the intersection of the bounding boxes
 */
function intersection(a, b) {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  if (right >= left && bottom >= top) {
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
function intersects(a, b) {
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
function pointInsideCircle(x, y, center, radius) {
  const dx = center.x - x;
  const dy = center.y - y;
  const dist = dx * dx + dy * dy;
  return Math.abs(dist) < radius * radius;
}

/**
 * simple bounding box rect vs rect collision test
 * uses short-circuit logic for optimized calculation
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
function collidedBox(a, b) {
  return !((a.bottom < b.top) || (a.top > b.bottom) || (a.left > b.right) || (a.right < b.left));
}

/**
 * simple circle vs circle collision test
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
function collidedCircle(a, b) {
  return pointInsideCircle(b.x, b.y, a, a.radius + b.radius);
}

/**
 * pixel perfect collision detection between two display objects
 * uses bounding box collision detection first to determine if
 * the two objects intersect. if no intersection, there can be no
 * collision, so testing the pixels is not necessary.
 * only the pixels in the overlapped section are tested by pixel
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
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
  UNKNOWN
};

/**
 * checks if a circle and box collider collide
 * @param {Collider} circle - collider instance with type as CIRCLE_COLLIDER to test
 * @param {Collider} rect - collider instance with type as BOX_COLLIDER to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
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

/**
 * checks if two colliders collide. the type of the colliders are used to automatically determine which type of collision testing to perform.
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean} - true if the the objects collided, false if they did not
 */
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

/**
 * instantiates a new Collider and configures with the given parameters
 * @param {Object} config - configuration object uses destructuring syntax for readable function call at the cost of a small performance hit
 * @param {DisplayObject} config.displayObject - EaselJS DisplayObject which provides the data which will be used by the collider
 * @param {number} [config.width] - optional width of the collider to override the default bounding box obtained from the DisplayObject
 * @param {number} [config.height] - optional height of the collider to override the default bounding box obtained from the DisplayObject
 * @returns {Collider} collider instance set as a box collider
 */
function createBoxCollider({displayObject, width, height}) {
  let collider = new Collider({type: BOX_COLLIDER_TYPE, displayObject, width, height});
  return collider;
}

/**
 * instantiates a new Collider and configures with the given parameters
 * @param {Object} config - configuration object uses destructuring syntax for readable function call at the cost of a small performance hit
 * @param {DisplayObject} config.displayObject - EaselJS DisplayObject which provides the data which will be used by the collider
 * @param {number} [config.radius] - optional radius of the collider to override the default bounding circle obtained from the DisplayObject
 * @returns {Collider} collider instance set as a circle collider
 */
function createCircleCollider({displayObject, radius}) {
  let collider = new Collider({type: CIRCLE_COLLIDER_TYPE, displayObject, radius});
  return collider;
}

/**
 * instantiates a new Collider and configures with the given parameters
 * @param {Object} config - configuration object uses destructuring syntax for readable function call at the cost of a small performance hit
 * @param {DisplayObject} config.displayObject - EaselJS DisplayObject which provides the data which will be used by the collider
 * @returns {Collider} collider instance set as an alpha collider
 */
function createAlphaCollider({displayObject}) {
  let collider = new Collider({type: ALPHA_COLLIDER_TYPE, displayObject});
  return collider;
}

/**
 * provides the public collision detection API
 * @type {object}
 * @property {string} BOX_COLLIDER
 * @property {string} CIRCLE_COLLIDER
 * @property {string} ALPHA_COLLIDER
 * @property {function} createBoxCollider
 * @property {function} createCircleCollider
 * @property {function} createAlphaCollider
 * @property {function} collided
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
 * provides the entire collision detection API for advanced use.
 * same as the "api" export, but includes access to internal classes
 * @type {object}
 * @property {class} BoundingBox
 * @property {class} Collider
 * @property {function} intersection
 * @property {function} intersects
 * @property {function} pointInsideCircle
 * @property {function} collidedBox
 * @property {function} collidedCircle
 * @property {function} collidedCircleRect
 * @property {function} collidedAlpha
 * @property {string} BOX_COLLIDER
 * @property {string} CIRCLE_COLLIDER
 * @property {string} ALPHA_COLLIDER
 * @property {function} createBoxCollider
 * @property {function} createCircleCollider
 * @property {function} createAlphaCollider
 * @property {function} collided
 */
export const fullAPI = {

  // expose internal collider class
  Collider,

  // expose the internal BoundingBox class
  BoundingBox,

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
