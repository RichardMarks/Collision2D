import { testUtil } from '../testUtil';
import { describe, it, expect } from '../imports';
import { collidedBox } from '../../src/core/BoxCollision';
import { ColliderFactory } from '../../src/core/ColliderFactory';

describe('Collision2D.core.BoxCollision', () => {
  describe('collidedBox', () => {
    it('should be true when two box colliders collide', () => {
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
      const boxA = ColliderFactory.box({ displayObject: leftBox });
      const boxB = ColliderFactory.box({ displayObject: rightBox });
      const result = collidedBox(boxA, boxB);
      expect(result).to.be.true;
    });
  });
});
