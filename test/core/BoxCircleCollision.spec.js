import { TRUE_FALSE } from '../testUtil';
import { describe, it, expect } from '../imports';
import { collidedCircleRect, collidedRectCircle } from '../../src/core/BoxCircleCollision';
import { ColliderFactory } from '../../src/core/ColliderFactory';

describe('Collision2D.core.BoxCircleCollision', () => {
  describe('collidedCircleRect', () => {
    it('should be true when a circle collider collides with a box collider');
  });

  describe('collidedRectCircle', () => {
    it('should be true when a box collider collides with a circle collider');
  });
});
