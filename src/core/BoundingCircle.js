// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

/**
 * provides a bounding circle construct
 */
export class BoundingCircle {
  /**
   * class constructor
   * @param {number} x - x axis coordinate of center of the bounding circle
   * @param {number} y - y axis coordinate of center of the bounding circle
   * @param {number} radius - radius of the bounding circle
   */
  constructor(x, y, radius) {
    /**
     * x axis coordinate of center of the bounding circle
     * @type {number}
     */
    this.x = x;

    /**
     * y axis coordinate of center of the bounding circle
     * @type {number}
     */
    this.y = y;

    /**
     * radius of the bounding circle
     * @type {number}
     */
    this.radius = radius
  }

  /**
   * x axis coordinate of left side of the bounding box which circumscribes this bounding circle
   * @type {number}
   */
  get left() { return this.x - this.radius; }

  /**
   * y axis coordinate of top side of the bounding box which circumscribes this bounding circle
   * @type {number}
   */
  get top() { return this.y - this.radius; }

  /**
   * x axis coordinate of right side of the bounding box which circumscribes this bounding circle
   * @type {number}
   */
  get right() { return this.x + this.radius; }

  /**
   * y axis coordinate of bottom side of the bounding box which circumscribes this bounding circle
   * @type {number}
   */
  get bottom() { return this.y + this.radius; }
}
