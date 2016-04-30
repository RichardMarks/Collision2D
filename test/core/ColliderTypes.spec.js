import { describe, it, expect } from '../imports';
import { ColliderType, ALPHA_COLLIDER_TYPE, BOX_COLLIDER_TYPE, CIRCLE_COLLIDER_TYPE } from '../../src/core/ColliderTypes';

describe('Collision2D.core.ColliderTypes', () => {
  it('should provide all supported collider types as constant instances of ColliderType', () => {
    expect(ALPHA_COLLIDER_TYPE).to.be.an.instanceOf(ColliderType).and.have.property('_id').that.equals('Collision2D.AlphaCollider');
    expect(BOX_COLLIDER_TYPE).to.be.an.instanceOf(ColliderType).and.have.property('_id').that.equals('Collision2D.BoxCollider');
    expect(CIRCLE_COLLIDER_TYPE).to.be.an.instanceOf(ColliderType).and.have.property('_id').that.equals('Collision2D.CircleCollider');
  });

  it('should provide toString implementations for each collider type to stringify collider types to provide sensible output', () => {
    expect(`${ALPHA_COLLIDER_TYPE}`).to.equal('ColliderType[Collision2D.AlphaCollider]');
    expect(`${BOX_COLLIDER_TYPE}`).to.equal('ColliderType[Collision2D.BoxCollider]');
    expect(`${CIRCLE_COLLIDER_TYPE}`).to.equal('ColliderType[Collision2D.CircleCollider]');
  });
});
