// TODO - figure out what is broken with babel-plugin-rewire and finish this unit test suite

// import { testUtil } from '../testUtil';
// import { describe, it, expect } from '../imports';
// import { collided } from '../../src/core/Collision';
// import { ColliderFactory } from '../../src/core/ColliderFactory';
// import { collidedBox, __RewireAPI__ as boxRewire } from '../../src/core/BoxCollision';
// import { collidedCircle, __RewireAPI__ as circleRewire } from '../../src/core/CircleCollision';
// import { collidedAlpha, __RewireAPI__ as alphaRewire } from '../../src/core/AlphaCollision';
// import { collidedCircleRect, collidedRectCircle, __RewireAPI__ as boxCircleRewire } from '../../src/core/BoxCircleCollision';
//
// function createDisplayObject(x, y, width, height) {
//   const displayObject = testUtil.createDisplayObject({
//     x, y, _bounds: new createjs.Rectangle(0, 0, width, height),
//   });
//   return displayObject;
// }
//
// describe('Collision2D.core.Collision', () => {
//   describe('collided', () => {
//
//     boxRewire.__Rewire__('collidedBox', () => { });
//     alphaRewire.__Rewire__('collidedAlpha', () => { });
//     circleRewire.__Rewire__('collidedCircle', () => { });
//     boxCircleRewire.__Rewire__('collidedRectCircle', () => { });
//     boxCircleRewire.__Rewire__('collidedCircleRect', () => { });
//
//     const collisionMatrix = {
//       alpha: {
//         alpha: collidedAlpha,
//         box: collidedAlpha,
//         circle: collidedAlpha,
//       },
//       box: {
//         alpha: collidedAlpha,
//         box: collidedBox,
//         circle: collidedRectCircle,
//       },
//       circle: {
//         alpha: collidedAlpha,
//         box: collidedCircleRect,
//         circle: collidedCircle,
//       },
//     };
//
//     const colliderTypes = ['alpha', 'circle', 'box'];
//     colliderTypes.forEach(typeA => {
//       colliderTypes.forEach(typeB => {
//         it(`should correctly resolve the method of collision for ${typeA} collider vs ${typeB} collider`, function testFn() {
//           const resolverSpy = this.sandbox.spy(collisionMatrix[typeA][typeB]);
//           const colliderA = ColliderFactory[typeA]({ displayObject: createDisplayObject(0, 0, 32, 32) });
//           const colliderB = ColliderFactory[typeB]({ displayObject: createDisplayObject(8, 8, 32, 32) });
//           collided(colliderA, colliderB);
//           expect(resolverSpy).to.have.been.calledOnce;
//           expect(resolverSpy).to.have.been.calledWithExactly(colliderA, colliderB);
//         });
//       });
//     });
//     // it('should correctly resolve the method of collision for alpha collider vs alpha collider');
//     // it('should correctly resolve the method of collision for alpha collider vs box collider');
//     // it('should correctly resolve the method of collision for alpha collider vs circle collider');
//     // it('should correctly resolve the method of collision for box collider vs alpha collider');
//     // it('should correctly resolve the method of collision for box collider vs box collider');
//     // it('should correctly resolve the method of collision for box collider vs circle collider');
//     // it('should correctly resolve the method of collision for circle collider vs alpha collider');
//     // it('should correctly resolve the method of collision for circle collider vs box collider');
//     // it('should correctly resolve the method of collision for circle collider vs circle collider');
//   });
// });
