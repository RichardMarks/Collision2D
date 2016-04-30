import { testUtil } from '../testUtil';
import { describe, it, expect } from '../imports';
import { Collider, AlphaCollider, BoxCollider, CircleCollider } from '../../src/core/Collider';
import { ALPHA_COLLIDER_TYPE, BOX_COLLIDER_TYPE, CIRCLE_COLLIDER_TYPE } from '../../src/core/ColliderTypes';
import { BoundingBox } from '../../src/core/BoundingBox';
import { BoundingCircle } from '../../src/core/BoundingCircle';

function createDisplayObject() {
  const displayObject = testUtil.createDisplayObject({
    x: 10,
    y: 20,
    _bounds: new createjs.Rectangle(0, 0, 30, 40),
    scaleX: 2,
    scaleY: 2,
  });
  return displayObject;
}

describe('Collision2D.core.Collider', () => {
  const displayObject = createDisplayObject();
  const collider = new Collider(displayObject);

  describe('constructor ', () => {
    it('should correctly capture the collider properties', () => {
      testUtil.assertProperties(collider, {
        _type: null,
        _displayObject: displayObject,
        _bounds: displayObject.getBounds(),
        _matrix: displayObject.getConcatenatedMatrix(),
        _scaleTransformX: 2,
        _scaleTransformY: 2,
        _x: 10,
        _y: 20,
        _width: 60,
        _height: 80,
        _radius: 50,
      });
      expect(collider).to.have.property('_boundingBox').that.is.an.instanceOf(BoundingBox);
      expect(collider).to.have.property('_boundingCircle').that.is.an.instanceOf(BoundingCircle);
    });
  });

  describe('update', () => {
    it('should update the internal state of the collider');
  });

  describe('get displayObject', () => {
    it('should provide a reference to the display object passed to the collider constructor', () => {
      expect(collider).to.have.property('displayObject').that.deep.equals(displayObject);
    });
  });

  describe('get displayObjectBounds', () => {
    it('should provide the bounds of the display object passed to the collider constructor', () => {
      expect(collider).to.have.property('displayObjectBounds').that.deep.equals(displayObject.getBounds());
      expect(collider).to.have.property('_bounds').that.deep.equals(collider.displayObjectBounds);
    });
  });

  describe('get displayObjectTransform', () => {
    it('should provide the global transformation matrix of the display object passed to the collider constructor', () => {
      expect(collider).to.have.property('displayObjectTransform').that.deep.equals(displayObject.getConcatenatedMatrix());
      expect(collider).to.have.property('_matrix').that.deep.equals(collider.displayObjectTransform);
    });
  });

  describe('get x', () => {
    it('should provide the leftmost x coordinate of the bounding box', () => {
      expect(collider).to.have.property('x').that.equals(collider.box.left);
    });
  });

  describe('get y', () => {
    it('should provide the topmost y coordinate of the bounding box', () => {
      expect(collider).to.have.property('y').that.equals(collider.box.top);
    });
  });

  describe('get width', () => {
    it('should provide the width of the bounding box', () => {
      expect(collider).to.have.property('width').that.equals(collider.box.width);
    });
  });

  describe('get height', () => {
    it('should provide the height of the bounding box', () => {
      expect(collider).to.have.property('height').that.equals(collider.box.height);
    });
  });

  describe('get left', () => {
    it('should provide the leftmost x coordinate of the bounding box', () => {
      expect(collider).to.have.property('left').that.equals(collider.box.left);
    });
  });

  describe('get top', () => {
    it('should provide the topmost y coordinate of the bounding box', () => {
      expect(collider).to.have.property('top').that.equals(collider.box.top);
    });
  });

  describe('get right', () => {
    it('should provide the rightmost x coordinate of the bounding box', () => {
      expect(collider).to.have.property('right').that.equals(collider.box.right);
    });
  });

  describe('get bottom', () => {
    it('should provide the bottommost y coordinate of the bounding box', () => {
      expect(collider).to.have.property('bottom').that.equals(collider.box.bottom);
    });
  });

  describe('get radius', () => {
    it('should provide the radius of the bounding circle', () => {
      expect(collider).to.have.property('radius').that.equals(collider.circle.radius);
    });
  });

  describe('get scaleX', () => {
    it('should provide the global x axis scale transformation', () => {
      expect(collider).to.have.property('scaleX').that.equals(2);
    });
  });

  describe('get scaleY', () => {
    it('should provide the global y axis scale transformation', () => {
      expect(collider).to.have.property('scaleY').that.equals(2);
    });
  });

  describe('get box', () => {
    it('should provide a reference to the bounding box', () => {
      expect(collider).to.have.property('box').that.is.an.instanceOf(BoundingBox).that.deep.equals(collider._boundingBox);
    });
  });

  describe('get circle', () => {
    it('should provide a reference to the bounding circle', () => {
      expect(collider).to.have.property('circle').that.is.an.instanceOf(BoundingCircle).that.deep.equals(collider._boundingCircle);
    });
  });

  describe('get type', () => {
    it('should provide the type of the collider', () => {
      expect(collider).to.have.property('type').that.is.null;
      collider._type = ALPHA_COLLIDER_TYPE;
      expect(collider).to.have.property('type').that.deep.equals(ALPHA_COLLIDER_TYPE);
      collider._type = BOX_COLLIDER_TYPE;
      expect(collider).to.have.property('type').that.deep.equals(BOX_COLLIDER_TYPE);
      collider._type = CIRCLE_COLLIDER_TYPE;
      expect(collider).to.have.property('type').that.deep.equals(CIRCLE_COLLIDER_TYPE);
      collider._type = null;
    });
  });
});

describe('Collision2D.core.AlphaCollider', () => {
  it('should have the correct type', () => {
    const collider = new AlphaCollider(createDisplayObject());
    expect(collider).to.have.property('type').that.deep.equals(ALPHA_COLLIDER_TYPE);
  });
});

describe('Collision2D.core.BoxCollider', () => {
  it('should have the correct type', () => {
    const collider = new BoxCollider(createDisplayObject());
    expect(collider).to.have.property('type').that.deep.equals(BOX_COLLIDER_TYPE);
  });
});

describe('Collision2D.core.CircleCollider', () => {
  it('should have the correct type', () => {
    const collider = new CircleCollider(createDisplayObject());
    expect(collider).to.have.property('type').that.deep.equals(CIRCLE_COLLIDER_TYPE);
  });
});
