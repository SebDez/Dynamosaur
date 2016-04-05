import chai from 'chai';
import assert from 'assert';
import QueryBuilder from '../lib/QueryBuilder';
import Exception from '../lib/util/Exception';
import RequestGet from '../lib/RequestGet';
import RequestPut from '../lib/RequestPut';
import RequestUpdate from '../lib/RequestUpdate';

const expect = chai.expect;

describe('QueryBuilder', () => {

  describe('QueryBuilder#getIn', () => {

    it('should throw an error if no table name', () => {
      assert.throws(new QueryBuilder().getIn, Exception);
    });

    it('should return a RequestGet object when tableName is provided', () => {
      expect(new QueryBuilder().getIn('user')).to.be.an.instanceof(RequestGet);
    });

    it('should return a RequestGet object with a tableName set', () => {
      expect(new QueryBuilder().getIn('user').tableName).to.equals('user');
    });
  });

  describe('QueryBuilder#putIn', () => {

    it('should throw an error if no table name', () => {
      assert.throws(new QueryBuilder().putIn, Exception);
    });

    it('should return a RequestPut object when tableName is provided', () => {
      expect(new QueryBuilder().putIn('user')).to.be.an.instanceof(RequestPut);
    });

    it('should return a RequestPut object with a tableName set', () => {
      expect(new QueryBuilder().putIn('user').tableName).to.equals('user');
    });
  });

  describe('QueryBuilder#updateIn', () => {

    it('should throw an error if no table name', () => {
      assert.throws(new QueryBuilder().updateIn, Exception);
    });

    it('should return a RequestPut object when tableName is provided', () => {
      expect(new QueryBuilder().updateIn('user')).to.be.an.instanceof(RequestUpdate);
    });

    it('should return a RequestPut object with a tableName set', () => {
      expect(new QueryBuilder().updateIn('user').tableName).to.equals('user');
    });
  });
});
