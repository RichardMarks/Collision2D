// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

import {
  BOX_COLLIDER_TYPE,
  CIRCLE_COLLIDER_TYPE,
  ALPHA_COLLIDER_TYPE,
} from './core/ColliderTypes';

import { BoundingBox } from './core/BoundingBox';
import { BoundingCircle } from './core/BoundingCircle';

import {
  Collider,
  BoxCollider,
  CircleCollider,
  AlphaCollider,
} from './core/Collider';

import { ColliderFactory } from './core/ColliderFactory';

import { collided } from './core/Collision';
import { collidedBox } from './core/BoxCollision';
import { collidedCircle } from './core/CircleCollision';
import { collidedAlpha } from './core/AlphaCollision';
import { collidedCircleRect } from './core/BoxCircleCollision';

import {
  intersection,
  intersects,
  pointInsideCircle,
} from './core/Math';

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
  BOX_COLLIDER: BOX_COLLIDER_TYPE,
  CIRCLE_COLLIDER: CIRCLE_COLLIDER_TYPE,
  ALPHA_COLLIDER: ALPHA_COLLIDER_TYPE,

  ColliderFactory,

  collided,

  // for backwards compatibility, alias the new factory methods
  createBoxCollider: ColliderFactory.box,
  createCircleCollider: ColliderFactory.circle,
  createAlphaCollider: ColliderFactory.alpha,
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
  BOX_COLLIDER: BOX_COLLIDER_TYPE,
  CIRCLE_COLLIDER: CIRCLE_COLLIDER_TYPE,
  ALPHA_COLLIDER: ALPHA_COLLIDER_TYPE,

  BoundingBox,
  BoundingCircle,

  Collider,
  BoxCollider,
  CircleCollider,
  AlphaCollider,

  ColliderFactory,

  collided,
  collidedBox,
  collidedCircle,
  collidedCircleRect,
  collidedAlpha,

  intersection,
  intersects,
  pointInsideCircle,

  // for backwards compatibility, alias the new factory methods
  createBoxCollider: ColliderFactory.box,
  createCircleCollider: ColliderFactory.circle,
  createAlphaCollider: ColliderFactory.alpha,
};
