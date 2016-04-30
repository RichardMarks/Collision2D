import { describe, it, expect } from '../imports';
import { BoundingBox } from '../../src/core/BoundingBox';

describe('Collision2D.core.BoundingBox', () => {
  const LEFT = 10;
  const TOP = 20;
  const WIDTH = 30;
  const HEIGHT = 40;
  const RIGHT = LEFT + WIDTH;
  const BOTTOM = TOP + HEIGHT;

  const box = new BoundingBox(LEFT, TOP, WIDTH, HEIGHT);
  describe('constructor ', () => {
    it('should correctly capture the bounding box properties', () => {
      expect(box).to.have.property('x').that.equals(LEFT);
      expect(box).to.have.property('y').that.equals(TOP);
      expect(box).to.have.property('width').that.equals(WIDTH);
      expect(box).to.have.property('height').that.equals(HEIGHT);
    });
  });

  describe('get left', () => {
    it('should provide the leftmost x coordinate of the bounding box', () => {
      expect(box).to.have.property('left').that.equals(LEFT);
    });
  });

  describe('get top', () => {
    it('should provide the topmost y coordinate of the bounding box', () => {
      expect(box).to.have.property('top').that.equals(TOP);
    });
  });

  describe('get right', () => {
    it('should provide the rightmost x coordinate of the bounding box', () => {
      expect(box).to.have.property('right').that.equals(RIGHT);
    });
  });

  describe('get bottom', () => {
    it('should provide the bottommost y coordinate of the bounding box', () => {
      expect(box).to.have.property('bottom').that.equals(BOTTOM);
    });
  });
});
