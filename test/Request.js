import chai from 'chai';
import assert from 'assert';
import Exception from '../lib/util/Exception';
import Request from '../lib/Request';

const expect = chai.expect;

describe('Request', () => {

  describe('Request#where', () => {
    it('should return an instanceof Request', () => {
      const request = new Request('user');
      expect(request.where('col', '=', 'val')).to.deep.equals(request);
    });
  });

  describe('Request#where', () => {
    it('should throw an error when no column', () => {
      const request = new Request('user');
      assert.throws(()=>{request.where(null, '=', 'val');}, Exception);
    });

    it('should throw an error when no operator', () => {
      const request = new Request('user');
      assert.throws(()=>{request.where('col', null, 'val');}, Exception);
    });

    it('should throw an error when no value', () => {
      const request = new Request('user');
      assert.throws(()=>{request.where('col', '=', null);}, Exception);
    });

    const req = new Request('table');
    req.where('col','=','val');

    it('Expect to have change attribute ExpressionAttributeNames', () => {
      expect(req.query.ExpressionAttributeNames['#col']).to.equals('col');
    });

    it('Expect to have change attribute ExpressionAttributeNames', () => {
      expect(req.query.ExpressionAttributeValues[':col']).to.equals('val');
    });

    it('Expect to have change attribute ExpressionAttributeNames', () => {
      expect(req.query.KeyConditionExpression).to.equals('#col = :col');
    });

  });


  describe('Request#exec', () => {

    it('Expect to return a function', () => {
      expect(new Request().exec({}).then).to.be.an.instanceof(Function);
    });

  });

  describe('Request#buildParameters', () => {

    const req = new Request('table');
    req.buildParameters('col','=','val');

    it('Expect to have change attribute ExpressionAttributeNames', () => {
      expect(req.query.ExpressionAttributeNames['#col']).to.equals('col');
    });

    it('Expect to have change attribute ExpressionAttributeNames', () => {
      expect(req.query.ExpressionAttributeValues[':col']).to.equals('val');
    });

    it('Expect to have change attribute ExpressionAttributeNames', () => {
      expect(req.query.KeyConditionExpression).to.equals('#col = :col');
    });
  });

});
