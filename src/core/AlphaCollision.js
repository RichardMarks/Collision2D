// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

import { intersection } from './Math';
import { collidedBox } from './BoxCollision';

function getPointOfCollision(pixelIndex, columnCount) {
  return {
    x: (pixelIndex % columnCount) | 0,
    y: (pixelIndex / columnCount) | 0,
  };
}

function testPixels(aPixels, bPixels, imageOverlapWidth) {
  const count = aPixels.length; // both aPixels and bPixels have the same length
  const componentCount = 4; // RGBA pixel data
  const alphaComponent = 3; // [0=R, 1=G, 2=B, 3=A]
  const transparencyThreshold = 0.3;
  for (let i = 0; i < count; i += componentCount) {
    const index = i + alphaComponent;
    if (aPixels[index] >= transparencyThreshold && bPixels[index] >= transparencyThreshold) {
      const collisionPoint = getPointOfCollision(index, imageOverlapWidth);
      return collisionPoint;
    }
  }
  return false;
}

const alphaTestingCanvas = document.createElement('canvas');
alphaTestingCanvas.width = window.innerWidth;
alphaTestingCanvas.height = window.innerHeight;
const alphaTestingCtx = alphaTestingCanvas.getContext('2d');

function getPixelDataFromCollider(collider, x, y, w, h) {
  const displayObject = collider.displayObject;
  alphaTestingCtx.clearRect(0, 0, alphaTestingCanvas.width, alphaTestingCanvas.height);
  alphaTestingCtx.save();
  alphaTestingCtx.globalAlpha = displayObject.alpha;
  alphaTestingCtx.scale(collider.scaleX, collider.scaleY);
  displayObject.draw(alphaTestingCtx);
  alphaTestingCtx.restore();
  const imageData = alphaTestingCtx.getImageData(x, y, w, h);
  return imageData;
}

function alphaCollisionTest(a, b) {
  if (!collidedBox(a, b)) {
    return false;
  }

  // objects collided but they may not be overlapping (edge collision)
  // get overlap to find out
  const overlap = intersection(a, b);
  if (!overlap) {
    return false;
  }

  // get the overlapping pixel data from each collider
  const srcAX = overlap.x - a.x;
  const srcAY = overlap.y - a.y;
  const srcAW = overlap.width;
  const srcAH = overlap.height;

  const srcBX = overlap.x - b.x;
  const srcBY = overlap.y - b.y;
  const srcBW = overlap.width;
  const srcBH = overlap.height;

  a.alphaTestBounds = {
    x: srcAX,
    y: srcAY,
    width: srcAW,
    height: srcAH,
  };

  b.alphaTestBounds = {
    x: srcBX,
    y: srcBY,
    width: srcBW,
    height: srcBH,
  };

  const aImgData = getPixelDataFromCollider(a, srcAX, srcAY, srcAW, srcAH);
  const bImgData = getPixelDataFromCollider(b, srcBX, srcBY, srcBW, srcBH);

  // const aImgData = a.imgData(overlap.x - a.x, overlap.y - a.y, overlap.width, overlap.height);
  // const bImgData = b.imgData(overlap.x - b.x, overlap.y - b.y, overlap.width, overlap.height);
  a.overlapImageData = aImgData;
  b.overlapImageData = bImgData;
  const aPixels = aImgData.data;
  const bPixels = bImgData.data;

  // test for collision
  const collisionPoint = testPixels(aPixels, bPixels, overlap.width);
  if (collisionPoint) {
    return collisionPoint;
  }
  delete a.overlapImageData;
  delete b.overlapImageData;
  return false;
}

/**
 * pixel perfect collision detection between two display objects
 * uses bounding box collision detection first to determine if
 * the two objects intersect. if no intersection, there can be no
 * collision, so testing the pixels is not necessary.
 * only the pixels in the overlapped section are tested by pixel
 * @param {Collider} a - collider instance to test
 * @param {Collider} b - collider instance to test against
 * @return {boolean|Object} - object with .x and .y of point of collision if the the objects collided, false if they did not
 */
export function collidedAlpha(a, b) {
  if (!a || !b) {
    return false;
  }
  a.collisionPoint = null;
  b.collisionPoint = null;
  const collisionPoint = alphaCollisionTest(a, b);
  if (collisionPoint) {
    a.collisionPoint = collisionPoint;
    b.collisionPoint = collisionPoint;
    return collisionPoint;
  }
  return false;
}
