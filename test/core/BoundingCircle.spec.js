import { TRUE_FALSE } from '../testUtil';
import { describe, it, expect } from '../imports';
import { BoundingCircle } from '../../src/core/BoundingCircle';

describe('Collision2D.core.BoundingCircle', () => {
  describe('constructor ', () => {
    it('should correctly capture the bounding circle properties');
  });

  describe('get left', () => {
    it('should provide the leftmost x coordinate of the bounding box which circumscribes this bounding circle');
  });

  describe('get top', () => {
    it('should provide the topmost y coordinate of the bounding box which circumscribes this bounding circle');
  });

  describe('get right', () => {
    it('should provide the rightmost x coordinate of the bounding box which circumscribes this bounding circle');
  });

  describe('get bottom', () => {
    it('should provide the bottommost y coordinate of the bounding box which circumscribes this bounding circle');
  });
});
