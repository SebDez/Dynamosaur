import chai from 'chai';
import assert from 'assert';
import Exception from '../lib/util/Exception';
import RequestDelete from '../lib/RequestDelete';

const expect = chai.expect;

describe('RequestDelete', () => {

  describe('RequestDelete#exec', () => {
      it('should return a function', () => {
        expect(new RequestDelete().exec().then).to.be.an.instanceof(Function);
      });
  });

  describe('RequestDelete#whenKey', () => {

    it('should throw an error if no key', () => {
      assert.throws(()=>{new RequestDelete('test').whenKey(null, 'val');}, Exception);
    });

    it('should throw an error if no value', () => {
      assert.throws(()=>{new RequestDelete('test').whenKey('key', null);}, Exception);
    });

    it('should set the query Key', () => {
      const req = new RequestDelete('test').whenKey('key', 'value');
      expect(req.query.Key['key']).to.equals('value');
    });

    it('should return the current request', () => {
      expect(new RequestDelete('test').whenKey('key', 'value')).to.be.an.instanceof(RequestDelete);
    });

  });

  describe('RequestDelete#andKey', () => {

    it('should throw an error if no key', () => {
      assert.throws(()=>{new RequestDelete('test').andKey(null, 'value');}, Exception);
    });

    it('should throw an error if no value', () => {
      assert.throws(()=>{new RequestDelete('test').andKey('key', null);}, Exception);
    });

    it('should throw an error if whenKey clause was not called before', () => {
      assert.throws(()=>{new RequestDelete().andKey('key', 'value');}, Exception);
    });

    it('should set the query Key', () => {
      const req = new RequestDelete('test').whenKey('key', 'value').andKey('key23', 'value23');
      expect(req.query.Key['key23']).to.equals('value23');
    });

    it('should return the current request', () => {
      expect(new RequestDelete('test').whenKey('key', 'value').andKey('key', 'value')).to.be.an.instanceof(RequestDelete);
    });

  });


});
