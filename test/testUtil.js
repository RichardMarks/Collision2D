import { expect } from './imports';

export const TRUE_FALSE = [true, false];

class TestUtil {

  createDisplayObject(config) {
    const displayObject = new createjs.Container();
    if (config) {
      displayObject.set(config);
    }
    return displayObject;
  }

  /**
   * helper assertion: causes a unit test case "it" to fail if the assertion fails
   * asserts that the given subject object contains all the given properties and that the values of those properties have the correct values
   * @param {Object} subject - subject object to be tested
   * @param {Object} properties - the expected properties of the subject. Each key should be set to the value expected to be found in subject under the property key
   */
  assertProperties(subject, properties) {
    // expect that each property is the correct value
    Object.keys(properties).forEach(property => {
      expect(subject).to.have.property(property).that.deep.equals(properties[property]);
    });
  }

  /**
   * helper assertion: causes a unit test case "it" to fail is the assertion fails
   * asserts that the given sinon stub or spy is called exactly calls.length times, and called with exactly the arguments specified in the calls array for each call
   * @param {Object} stubOrSpy - the sinon stub or spy
   * @param {Array<Object>} calls - array of arguments to match for each call
   */
  assertCallArguments(stubOrSpy, calls) {
    const count = calls.length;
    expect(stubOrSpy.callCount).to.equal(calls.length);
    for (let i = 0; i < count; i += 1) {
      expect(stubOrSpy.getCall(i)).to.have.been.calledWithExactly(calls[i]);
    }
  }
}

export const testUtil = new TestUtil();
