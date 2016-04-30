import { testUtil } from '../testUtil';
import { describe, it, expect } from '../imports';
import { ColliderFactory } from '../../src/core/ColliderFactory';
import { AlphaCollider, BoxCollider, CircleCollider } from '../../src/core/Collider';

describe('Collision2D.core.ColliderFactory', () => {
  const displayObject = {
    getBounds() { return {};},
    getConcatenatedMatrix() { return {}; },
  };

  describe('box', () => {
    it('should construct a new BoxCollider with the supplied parameters', () => {
      const collider = ColliderFactory.box({ displayObject });
      expect(collider).to.be.an.instanceOf(BoxCollider);
      expect(collider).to.have.property('displayObject').that.deep.equals(displayObject);
    });

    it('should warn of deprecated parameter usage', function deprecatedTest() {
      const warnStub = this.sandbox.stub(window.console, 'warn');
      const collider = ColliderFactory.box({ displayObject, width: 100, height: 200 });
      testUtil.assertCallArguments(warnStub, [
        '[deprecated parameter width] Collision2D.BoxCollider no longer supports a user-specified width parameter.',
        '[deprecated parameter height] Collision2D.BoxCollider no longer supports a user-specified height parameter.',
      ]);
      expect(collider).to.exist;
    });
  });

  describe('circle', () => {
    it('should construct a new CircleCollider with the supplied parameters', () => {
      const collider = ColliderFactory.circle({ displayObject });
      expect(collider).to.be.an.instanceOf(CircleCollider);
      expect(collider).to.have.property('displayObject').that.deep.equals(displayObject);
    });

    it('should warn of deprecated parameter usage', function deprecatedTest() {
      const warnStub = this.sandbox.stub(window.console, 'warn');
      const collider = ColliderFactory.circle({ displayObject, radius: 512 });
      testUtil.assertCallArguments(warnStub, [
        '[deprecated parameter radius] Collision2D.CircleCollider no longer supports a user-specified radius parameter.',
      ]);
      expect(collider).to.exist;
    });
  });

  describe('alpha', () => {
    it('should construct a new AlphaCollider with the supplied parameters', () => {
      const collider = ColliderFactory.alpha({ displayObject });
      expect(collider).to.be.an.instanceOf(AlphaCollider);
      expect(collider).to.have.property('displayObject').that.deep.equals(displayObject);
    });
  });
});
