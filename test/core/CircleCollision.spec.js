import { testUtil } from '../testUtil';
import { describe, it, expect } from '../imports';
import { collidedCircle } from '../../src/core/CircleCollision';
import { ColliderFactory } from '../../src/core/ColliderFactory';

describe('Collision2D.core.CircleCollision', () => {
  describe('collidedCircle', () => {
    it('should be true when two circle colliders collide', () => {
      const leftBox = testUtil.createDisplayObject({
        x: 20,
        y: 0,
        _bounds: new createjs.Rectangle(0, 0, 100, 100),
      });
      const rightBox = testUtil.createDisplayObject({
        x: 30,
        y: 10,
        _bounds: new createjs.Rectangle(0, 0, 100, 100),
      });
      const circleA = ColliderFactory.circle({ displayObject: leftBox });
      const circleB = ColliderFactory.circle({ displayObject: rightBox });
      const result = collidedCircle(circleA, circleB);
      expect(result).to.be.true;
    });
  });
});
