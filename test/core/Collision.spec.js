import { TRUE_FALSE } from '../testUtil';
import { describe, it, expect } from '../imports';
import { collided } from '../../src/core/Collision';
import { ColliderFactory } from '../../src/core/ColliderFactory';

describe('Collision2D.core.Collision', () => {
  describe('collided', () => {
    // TODO - use loops and dynamic unit test construction to implement these tests
    it('should correctly resolve the method of collision for alpha collider vs alpha collider');
    it('should correctly resolve the method of collision for alpha collider vs box collider');
    it('should correctly resolve the method of collision for alpha collider vs circle collider');
    it('should correctly resolve the method of collision for box collider vs alpha collider');
    it('should correctly resolve the method of collision for box collider vs box collider');
    it('should correctly resolve the method of collision for box collider vs circle collider');
    it('should correctly resolve the method of collision for circle collider vs alpha collider');
    it('should correctly resolve the method of collision for circle collider vs box collider');
    it('should correctly resolve the method of collision for circle collider vs circle collider');
  });
});
