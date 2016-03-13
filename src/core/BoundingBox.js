// Collision2D
// A 2D collision detection library for modern HTML5 games by Richard Marks.
// Licensed under MIT. Copyright 2016, Richard Marks

/**
 * provides a bounding box construct
 */
export class BoundingBox {
  /**
   * class constructor
   * @param {number} x - x axis coordinate of top-left corner of the bounding box
   * @param {number} y - y axis coordinate of top-left corner of the bounding box
   * @param {number} width - width of the bounding box
   * @param {number} height - height of the bounding box
   */
  constructor(x, y, width, height) {
    /**
     * x axis coordinate of top-left corner of the bounding box
     * @type {number}
     */
    this.x = x;

    /**
     * y axis coordinate of top-left corner of the bounding box
     * @type {number}
     */
    this.y = y;

    /**
     * width of the bounding box
     * @type {number}
     */
    this.width = width;

    /**
     * height of the bounding box
     * @type {number}
     */
    this.height = height;
  }

  /**
   * x axis coordinate of left side of the bounding box
   * @type {number}
   */
  get left() { return this.x; }

  /**
   * y axis coordinate of top side of the bounding box
   * @type {number}
   */
  get top() { return this.y; }

  /**
   * x axis coordinate of right side of the bounding box
   * @type {number}
   */
  get right() { return this.x + this.width; }

  /**
   * y axis coordinate of bottom side of the bounding box
   * @type {number}
   */
  get bottom() { return this.y + this.height; }
}
