import chai from 'chai';
import assert from 'assert';
import Exception from '../lib/util/Exception';
import RequestPut from '../lib/RequestPut';

const expect = chai.expect;

describe('RequestPut', () => {

  describe('RequestPut#aNew', () => {

      it('should throw an error if no item given', () => {
        assert.throws(new RequestPut().aNew, Exception);
      });

      it('should return a function', () => {
        expect(new RequestPut().aNew({name:'test'}).then).to.be.an.instanceof(Function);
      });

  });

});
