import { TRUE_FALSE } from '../testUtil';
import { describe, it, expect } from '../imports';
import { BoundingBox } from '../../src/core/BoundingBox';

describe('Collision2D.core.BoundingBox', () => {
  describe('constructor ', () => {
    it('should correctly capture the bounding box properties');
  });

  describe('get left', () => {
    it('should provide the leftmost x coordinate of the bounding box');
  });

  describe('get top', () => {
    it('should provide the topmost y coordinate of the bounding box');
  });

  describe('get right', () => {
    it('should provide the rightmost x coordinate of the bounding box');
  });

  describe('get bottom', () => {
    it('should provide the bottommost y coordinate of the bounding box');
  });
});
