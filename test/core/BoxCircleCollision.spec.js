import { testUtil } from '../testUtil';
import { describe, it, expect } from '../imports';
import { collidedCircleRect, collidedRectCircle } from '../../src/core/BoxCircleCollision';
import { ColliderFactory } from '../../src/core/ColliderFactory';

describe('Collision2D.core.BoxCircleCollision', () => {
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
  const circle = ColliderFactory.circle({ displayObject: leftBox });
  const box = ColliderFactory.box({ displayObject: rightBox });
  describe('collidedCircleRect', () => {
    it('should be true when a circle collider collides with a box collider', () => {
      const result = collidedCircleRect(circle, box);
      expect(result).to.be.true;
    });
  });

  describe('collidedRectCircle', () => {
    it('should be true when a box collider collides with a circle collider', () => {
      const result = collidedRectCircle(box, circle);
      expect(result).to.be.true;
    });
  });
});
