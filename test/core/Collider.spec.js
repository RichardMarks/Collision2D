import { TRUE_FALSE } from '../testUtil';
import { describe, it, expect } from '../imports';
import { Collider, AlphaCollider, BoxCollider, CircleCollider } from '../../src/core/Collider';

describe('Collision2D.core.Collider', () => {
  describe('constructor ', () => {
    it('should correctly capture the collider properties');
  });

  describe('update', () => {
    it('should update the internal state of the collider');
  });

  describe('get displayObject', () => {
    it('should provide a reference to the display object passed to the collider constructor');
  });

  describe('get displayObjectBounds', () => {
    it('should provide the bounds of the display object passed to the collider constructor');
  });

  describe('get displayObjectTransform', () => {
    it('should provide the global transformation matrix of the display object passed to the collider constructor');
  });

  describe('get x', () => {
    it('should provide the leftmost x coordinate of the bounding box');
  });

  describe('get y', () => {
    it('should provide the topmost y coordinate of the bounding box');
  });

  describe('get width', () => {
    it('should provide the width of the bounding box');
  });

  describe('get height', () => {
    it('should provide the height of the bounding box');
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

  describe('get radius', () => {
    it('should provide the radius of the bounding circle');
  });

  describe('get scaleX', () => {
    it('should provide the global x axis scale transformation');
  });

  describe('get scaleY', () => {
    it('should provide the global y axis scale transformation');
  });

  describe('get box', () => {
    it('should provide a reference to the bounding box');
  });

  describe('get circle', () => {
    it('should provide a reference to the bounding circle');
  });

  describe('get type', () => {
    it('should provide the type of the collider');
  });
});

describe('Collision2D.core.AlphaCollider', () => {
  it('should have the correct type');
});

describe('Collision2D.core.BoxCollider', () => {
  it('should have the correct type');
});

describe('Collision2D.core.CircleCollider', () => {
  it('should have the correct type');
});
