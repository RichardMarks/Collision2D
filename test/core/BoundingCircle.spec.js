import { describe, it, expect } from '../imports';
import { BoundingCircle } from '../../src/core/BoundingCircle';

describe('Collision2D.core.BoundingCircle', () => {
  const X_POS = 128;
  const Y_POS = 128;
  const RADIUS = 64;
  const LEFT = X_POS - RADIUS;
  const TOP = Y_POS - RADIUS;
  const RIGHT = X_POS + RADIUS;
  const BOTTOM = Y_POS + RADIUS;
  const circle = new BoundingCircle(X_POS, Y_POS, RADIUS);

  describe('constructor ', () => {
    it('should correctly capture the bounding circle properties', () => {
      expect(circle).to.have.property('x').that.equals(X_POS);
      expect(circle).to.have.property('y').that.equals(Y_POS);
      expect(circle).to.have.property('radius').that.equals(RADIUS);
    });
  });

  describe('get left', () => {
    it('should provide the leftmost x coordinate of the bounding box which circumscribes this bounding circle', () => {
      expect(circle).to.have.property('left').that.equals(LEFT);
    });
  });

  describe('get top', () => {
    it('should provide the topmost y coordinate of the bounding box which circumscribes this bounding circle', () => {
      expect(circle).to.have.property('top').that.equals(TOP);
    });
  });

  describe('get right', () => {
    it('should provide the rightmost x coordinate of the bounding box which circumscribes this bounding circle', () => {
      expect(circle).to.have.property('right').that.equals(RIGHT);
    });
  });

  describe('get bottom', () => {
    it('should provide the bottommost y coordinate of the bounding box which circumscribes this bounding circle', () => {
      expect(circle).to.have.property('bottom').that.equals(BOTTOM);
    });
  });
});
