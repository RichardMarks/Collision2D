// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

export class ColliderType {
  constructor(id) {
    this._symbol = Symbol(id);
  }
  get symbol() { return this._symbol; }
}

export const BOX_COLLIDER_TYPE = new ColliderType('Collision2D.BoxCollider');
export const CIRCLE_COLLIDER_TYPE = new ColliderType('Collision2D.CircleCollider');
export const ALPHA_COLLIDER_TYPE = new ColliderType('Collision2D.AlphaCollider');
