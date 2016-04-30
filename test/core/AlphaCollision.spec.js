import { testUtil } from '../testUtil';
import { describe, it, expect } from '../imports';
import { collidedAlpha } from '../../src/core/AlphaCollision';
import { ColliderFactory } from '../../src/core/ColliderFactory';

describe('Collision2D.core.AlphaCollision', () => {
  function createDisplayObject(x, y, width, height) {
    const displayObject = testUtil.createDisplayObject({
      x, y, _bounds: new createjs.Rectangle(0, 0, width, height),
    });
    const shape = new createjs.Shape();
    shape.graphics.f('red').dp(24, 24, 24, 5, 2.0, Math.PI * 2);
    displayObject.addChild(shape);
    return displayObject;
  }

  describe('collidedAlpha', () => {
    const leftBox = createDisplayObject(20, 0, 100, 100);
    const rightBox = createDisplayObject(30, 10, 100, 100);
    const colliderTypes = ['alpha', 'circle', 'box'];
    colliderTypes.forEach(typeA => {
      colliderTypes.forEach(typeB => {
        it(`should provide the point of collision when the rendered pixels of a ${typeA} collider and a ${typeB} collider overlap`, () => {
          const colliderA = ColliderFactory[typeA]({ displayObject: leftBox });
          const colliderB = ColliderFactory[typeB]({ displayObject: rightBox });
          const result = collidedAlpha(colliderA, colliderB);
          expect(result).to.contain.all.keys('x', 'y');
        });
      });
    });
  });
});
