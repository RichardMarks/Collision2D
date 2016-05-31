/*

  A collider describes the physical collision shape of a display object.

  A collider provides a reference to the display object it describes.

  A collider provides a rectangular bounding box in non-transformed coordinates.

  A collider provides a circular bounding circle in non-transformed coordinates.

*/

import { BoundingBox } from './BoundingBox';
import { BoundingCircle } from './BoundingCircle';

import {
  BOX_COLLIDER_TYPE,
  CIRCLE_COLLIDER_TYPE,
  ALPHA_COLLIDER_TYPE,
} from './ColliderTypes';

let inscribedBoundingCircle = true;
export function useInscribedBoundingCircle() { inscribedBoundingCircle = true; }
export function useCircumscribedBoundingCircle() { inscribedBoundingCircle = false; }

let getRadius = null;
function getInscribedRadius() {
  return (Math.max(this._width, this._height) * 0.5) | 0;
}

function getCircumscribedRadius() {
  return (Math.sqrt((this._width * this._width + this._height * this._height)) * 0.5) | 0;
}

export class Collider {

  /**
   * colliders created after calling this function will have an inscribed bounding circle radius
   */
  static useInscribedBoundingCircle() { useInscribedBoundingCircle(); }

  /**
   * colliders created after calling this function will have a circumscribed bounding circle radius
   */
  static useCircumscribedBoundingCircle() { useCircumscribedBoundingCircle(); }

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

  constructor(displayObject) {
    this._type = null;
    this._displayObject = displayObject;
    this._displayObject.__c2dCollider = this;
    this._boundingBox = new BoundingBox();
    this._boundingCircle = new BoundingCircle();

    if (inscribedBoundingCircle) {
      getRadius = getInscribedRadius.bind(this);
    } else {
      getRadius = getCircumscribedRadius.bind(this);
    }

    this.update();
  }

  update() {
    this._bounds = this._displayObject.getBounds();
    this._matrix = this._displayObject.getConcatenatedMatrix();
    this._scaleTransformX = this._matrix.a;
    this._scaleTransformY = this._matrix.d;
    this._x = this._matrix.tx;
    this._y = this._matrix.ty;
    this._width = this._scaleTransformX * this._bounds.width;
    this._height = this._scaleTransformY * this._bounds.height;
    this._radius = getRadius();

    this._boundingBox.x = this._x;
    this._boundingBox.y = this._y;
    this._boundingBox.width = this._width;
    this._boundingBox.height = this._height;

    this._boundingCircle.x = this._x + (this._width * 0.5);
    this._boundingCircle.y = this._y + (this._height * 0.5);
    this._boundingCircle.radius = this._radius;
  }

  get displayObject() { return this._displayObject; }
  get displayObjectBounds() { return this._bounds; }
  get displayObjectTransform() { return this._matrix; }
  get x() { return this._x; }
  get y() { return this._y; }
  get width() { return this._width; }
  get height() { return this._height; }
  get left() { return this._x; }
  get top() { return this._y; }
  get right() { return this._x + this._width; }
  get bottom() { return this._y + this._height; }
  get radius() { return this._radius; }
  get scaleX() { return this._scaleTransformX; }
  get scaleY() { return this._scaleTransformY; }
  get box() { return this._boundingBox; }
  get circle() { return this._boundingCircle; }
  get type() { return this._type; }
}

export class BoxCollider extends Collider {
  constructor(displayObject) {
    super(displayObject);
    this._type = BOX_COLLIDER_TYPE;
  }
}

export class CircleCollider extends Collider {
  constructor(displayObject) {
    super(displayObject);
    this._type = CIRCLE_COLLIDER_TYPE;
  }
}

export class AlphaCollider extends Collider {
  constructor(displayObject) {
    super(displayObject);
    this._type = ALPHA_COLLIDER_TYPE;
  }
}
