import { TRUE_FALSE } from '../testUtil';
import {describe, it, expect} from '../imports';
import { intersection, intersects, pointInsideCircle } from '../../src/core/Math';
import { BoundingBox } from '../../src/core/BoundingBox';

describe('Collision2D.core.Math', () => {
  describe('intersection', () => {
    TRUE_FALSE.forEach(truthy => {
      it(`should provide ${truthy ? 'a bounding box of the intersection' : 'null'} when two bounding boxes ${truthy ? 'do' : 'do not'} intersect`, () => {
        const boxA = new BoundingBox(0, 0, 100, 100);
        const boxB = new BoundingBox(truthy ? 50 : 250, 50, 100, 100);
        const result = intersection(boxA, boxB);
        if (truthy) {
          expect(result).to.have.property('width').that.equals(50);
          expect(result).to.have.property('height').that.equals(50);
          expect(result).to.have.property('left').that.equals(50);
          expect(result).to.have.property('top').that.equals(50);
          expect(result).to.have.property('right').that.equals(100);
          expect(result).to.have.property('bottom').that.equals(100);
        } else {
          expect(result).to.be.null;
        }
      });
    });
  });

  describe('intersects', () => {
    TRUE_FALSE.forEach(truthy => {
      it(`should be ${truthy} when two bounding boxes ${truthy ? 'do' : 'do not'} intersect`, () => {
        const boxA = new BoundingBox(0, 0, 100, 100);
        const boxB = new BoundingBox(truthy ? 50 : 250, 50, 100, 100);
        const result = intersects(boxA, boxB);
        expect(result).to.equal(truthy);
      });
    });
  });

  describe('pointInsideCircle', () => {
    TRUE_FALSE.forEach(truthy => {
      it(`should be ${truthy} when the point ${truthy ? 'is': 'is not'} inside of the radius of the circle`, () => {
        const point = { x: truthy ? 64 : 256, y: 64 };
        const circle = { x: 64, y: 64, radius: 64 };
        const result = pointInsideCircle(point.x, point.y, circle, circle.radius);
        expect(result).to.equal(truthy);
      });
    });
  });
});
