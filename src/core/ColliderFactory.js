// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

import {
  BoxCollider,
  CircleCollider,
  AlphaCollider,
} from './Collider';

/**
 * provides a simple factory class for creating colliders of different types
 */
export class ColliderFactory {

  /**
   * instantiates a new Collider and configures with the given parameters
   * @param {Object} config - configuration object uses destructuring syntax for readable function call at the cost of a small performance hit
   * @param {DisplayObject} config.displayObject - EaselJS DisplayObject which provides the data which will be used by the collider
   * @param {number} [config.width] - [deprecated] optional width of the collider to override the default bounding box obtained from the DisplayObject
   * @param {number} [config.height] - [deprecated] optional height of the collider to override the default bounding box obtained from the DisplayObject
   * @returns {BoxCollider} collider instance set as a box collider
   */
  static box({displayObject, width, height}) { // eslint-disable-line no-unused-vars
    const collider = new BoxCollider(displayObject);
    return collider;
  }

  /**
   * instantiates a new Collider and configures with the given parameters
   * @param {Object} config - configuration object uses destructuring syntax for readable function call at the cost of a small performance hit
   * @param {DisplayObject} config.displayObject - EaselJS DisplayObject which provides the data which will be used by the collider
   * @param {number} [config.radius] - [deprecated] optional radius of the collider to override the default bounding circle obtained from the DisplayObject
   * @returns {Collider} collider instance set as a circle collider
   */
  static circle({displayObject, radius}) { // eslint-disable-line no-unused-vars
    const collider = new CircleCollider(displayObject);
    return collider;
  }

  /**
   * instantiates a new Collider and configures with the given parameters
   * @param {Object} config - configuration object uses destructuring syntax for readable function call at the cost of a small performance hit
   * @param {DisplayObject} config.displayObject - EaselJS DisplayObject which provides the data which will be used by the collider
   * @returns {Collider} collider instance set as an alpha collider
   */
  static alpha({displayObject}) {
    const collider = new AlphaCollider(displayObject);
    return collider;
  }
}
