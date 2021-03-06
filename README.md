# Collision2D
> A 2D collision detection library for modern HTML5 games by Richard Marks.
> Licensed under MIT. Copyright 2016, Richard Marks

## What is it?
A small ES6 API for detecting 2D collisions between objects.

## What kind of collision testing does Collision2D support?
* Rectangle vs Rectangle
* Circle vs Circle
* Rectangle vs Circle
* Alpha (pixel perfect)
  * Alpha vs Rectangle
  * Alpha vs Circle
  * Alpha vs Alpha

## How do I use Collision2D?
Install into your project with
```
npm install c2d --save-dev
```
Create colliders and test for collisions between two of them. Could not be any easier.
```javascript
import {api as c2d} from 'c2d';

// create colliders
// displayObject should be an EaselJS DisplayObject instance
const boxCollider = c2d.createBoxCollider({displayObject, width: 128, height: 128});
const circleCollider = c2d.createCircleCollider({displayObject, radius: 64});
const alphaCollider = c2d.createAlphaCollider({displayObject});

// test collision between two objects
let objectsCollided = c2d.collided(colliderA, colliderB);
if (objectsCollided) {
  console.log(`There was a collision`);
}
```

## I see more in the source than that!
There are more functions available in Collision2D for advanced users.
If you want to use the full API, simply change your import to the following
```javascript
import {fullAPI as c2d} from 'c2d';
```
You now have access to everything in Collision2D.

> Version 2.2 - last updated Apr 27, 2016
