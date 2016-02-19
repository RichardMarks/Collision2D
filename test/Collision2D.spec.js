import {describe, it, expect} from './imports';
import {api as c2d} from '../src/Collision2D';
import {fullAPI as c2dFull} from '../src/Collision2D';

const dummyDisplayObject = {
  x: 0,
  y: 0,
  getBounds() { return { width: 32, height: 32 }; }
};

describe('Collision2D Public API', () => {
  describe('BOX_COLLIDER', () => {
    it('is exposed to the developer', () => { expect(c2d.BOX_COLLIDER).not.to.be.null; });
    it('has correct value', () => { expect(c2d.BOX_COLLIDER).to.equal('box'); });
  });

  describe('CIRCLE_COLLIDER', () => {
    it('is exposed to the developer', () => { expect(c2d.CIRCLE_COLLIDER).not.to.be.null; });
    it('has correct value', () => { expect(c2d.CIRCLE_COLLIDER).to.equal('circle'); });
  });

  describe('ALPHA_COLLIDER', () => {
    it('is exposed to the developer', () => { expect(c2d.ALPHA_COLLIDER).not.to.be.null; });
    it('has correct value', () => { expect(c2d.ALPHA_COLLIDER).to.equal('alpha'); });
  });

  describe('createBoxCollider', () => {
    it('is exposed to the developer', () => { expect(c2d.createBoxCollider).not.to.be.null; });
    it('returns a Collision2D.Collider instance', () => {
      expect(c2d.createBoxCollider({ displayObject: dummyDisplayObject })).to.be.an.instanceof(c2dFull.Collider);
    });
  });

  describe('createCircleCollider', () => {
    it('is exposed to the developer', () => { expect(c2d.createCircleCollider).not.to.be.null; });
  });

  describe('createAlphaCollider', () => {
    it('is exposed to the developer', () => { expect(c2d.createAlphaCollider).not.to.be.null; });
  });

  describe('collided', () => {
    it('is exposed to the developer', () => { expect(c2d.collided).not.to.be.null; });
  });
});
