import { TRUE_FALSE } from '../testUtil';
import { describe, it, expect } from '../imports';
import { collidedAlpha } from '../../src/core/AlphaCollision';
import { ColliderFactory } from '../../src/core/ColliderFactory';

describe('Collision2D.core.AlphaCollision', () => {
  describe('collidedAlpha', () => {
    it('should be true when the rendered pixels of two alpha colliders overlap');
    it('should be true when the rendered pixels of a box collider and an alpha collider overlap');
    it('should be true when the rendered pixels of a circle collider and an alpha collider overlap');
  });
});
