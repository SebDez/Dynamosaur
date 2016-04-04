import chai from 'chai';
import assert from 'assert';
import QueryBuilder from '../lib/QueryBuilder';
import Exception from '../lib/Exception';
import Request from '../lib/Request';

const expect = chai.expect;

describe('QueryBuilder', () => {

  describe('QueryBuilder#getIn', () => {

    it('should throw an error if no table name', () => {
      assert.throws(new QueryBuilder().getIn, Exception);
    });

    it('should return a request object when tableName is provided', () => {
      expect(new QueryBuilder().getIn('user')).to.be.an.instanceof(Request);
    });

    it('should return a request object with a tableName set', () => {
      expect(new QueryBuilder().getIn('user').query.TableName).to.equals('user');
    });
  });
});
