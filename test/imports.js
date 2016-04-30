import chai from 'chai';
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
export { describe, it, expect }

// before each unit test suite is executed, a sandbox testing environment will be prepared.
beforeEach(function createSinonTestingSandbox() {
  // http://sinonjs.org/docs/#sandbox
  // Sandboxes simplify working with fakes that need to be restored and/or verified.
  // If you’re using fake timers, fake XHR, or you are stubbing/spying on globally
  // accessible properties you should use a sandbox to ease cleanup.
  this.sandbox = sinon.sandbox.create();
});

// after each unit test suite is executed, any fakes constructed in the sandbox will be restored.
afterEach(function restoreSinonFakes() {
  this.sandbox.restore();
});
