import chai from 'chai';
import assert from 'assert';
import Exception from '../lib/util/Exception';
import RequestGet from '../lib/RequestGet';

const expect = chai.expect;

describe('RequestGet', () => {

  describe('RequestGet#exec', () => {
      it('should return a function', () => {
        expect(new RequestGet().exec().then).to.be.an.instanceof(Function);
      });

      it('should remove ExpressionAttributeNames when empty', () => {
        let req = new RequestGet();
        req.query.ExpressionAttributeNames ={};
        req.exec();
        expect(req.query.ExpressionAttributeNames).to.equals(void(0));
      });
  });

  describe('RequestGet#where', () => {

    it('should throw an error if no column', () => {
      assert.throws(()=>{new RequestGet().where(null, '=', 'something');}, Exception);
    });

    it('should throw an error if no operator', () => {
      assert.throws(()=>{new RequestGet().where('column', null, 'something');}, Exception);
    });

    it('should throw an error if no value', () => {
      assert.throws(()=>{new RequestGet().where('column', '=', null);}, Exception);
    });

    it('should set the query ExpressionAttributeNames', () => {
      const req = new RequestGet().where('column', '=', 'something');
      expect(req.query.ExpressionAttributeNames['#column']).to.equals('column');
    });

    it('should set the query ExpressionAttributeValues', () => {
      const req = new RequestGet().where('column', '=', 'something');
      expect(req.query.ExpressionAttributeValues[':column']).to.equals('something');
    });

    it('should set the query FilterExpression', () => {
      const req = new RequestGet().where('column', '=', 'something');
      expect(req.query.FilterExpression).to.equals('#column = :column');
    });

    it('should return the current request', () => {
      expect(new RequestGet().where('column', '=', 'something')).to.be.an.instanceof(RequestGet);
    });

  });

  describe('RequestGet#and', () => {

    it('should throw an error if no column', () => {
      assert.throws(()=>{new RequestGet().and(null, '=', 'something');}, Exception);
    });

    it('should throw an error if no operator', () => {
      assert.throws(()=>{new RequestGet().and('column', null, 'something');}, Exception);
    });

    it('should throw an error if no value', () => {
      assert.throws(()=>{new RequestGet().and('column', '=', null);}, Exception);
    });

    it('should throw an error if where clause was not called before', () => {
      assert.throws(()=>{new RequestGet().and('column', '=', 'something');}, Exception);
    });

    it('should set the query ExpressionAttributeNames', () => {
      const req = new RequestGet().where('first', '=', 'clause').and('column', '=', 'something');
      expect(req.query.ExpressionAttributeNames['#column']).to.equals('column');
    });

    it('should set the query ExpressionAttributeValues', () => {
      const req = new RequestGet().where('first', '=', 'clause').and('column', '=', 'something');
      expect(req.query.ExpressionAttributeValues[':column']).to.equals('something');
    });

    it('should set the query FilterExpression', () => {
      const req = new RequestGet().where('first', '=', 'clause').and('column', '=', 'something');
      expect(req.query.FilterExpression).to.equals('#first = :first AND #column = :column');
    });

    it('should return the current request', () => {
      expect(new RequestGet().where('first', '=', 'clause').and('column', '=', 'something')).to.be.an.instanceof(RequestGet);
    });

  });

  describe('RequestGet#OR', () => {

    it('should throw an error if no column', () => {
      assert.throws(()=>{new RequestGet().or(null, '=', 'something');}, Exception);
    });

    it('should throw an error if no operator', () => {
      assert.throws(()=>{new RequestGet().or('column', null, 'something');}, Exception);
    });

    it('should throw an error if no value', () => {
      assert.throws(()=>{new RequestGet().or('column', '=', null);}, Exception);
    });

    it('should throw an error if where clause was not called before', () => {
      assert.throws(()=>{new RequestGet().or('column', '=', 'something');}, Exception);
    });

    it('should set the query ExpressionAttributeNames', () => {
      const req = new RequestGet().where('first', '=', 'clause').or('column', '=', 'something');
      expect(req.query.ExpressionAttributeNames['#column']).to.equals('column');
    });

    it('should set the query ExpressionAttributeValues', () => {
      const req = new RequestGet().where('first', '=', 'clause').or('column', '=', 'something');
      expect(req.query.ExpressionAttributeValues[':column']).to.equals('something');
    });

    it('should set the query FilterExpression', () => {
      const req = new RequestGet().where('first', '=', 'clause').or('column', '=', 'something');
      expect(req.query.FilterExpression).to.equals('#first = :first OR #column = :column');
    });

    it('should return the current request', () => {
      expect(new RequestGet().where('first', '=', 'clause').or('column', '=', 'something')).to.be.an.instanceof(RequestGet);
    });

  });

  describe('RequestGet#buildParameters', () => {

    it('should set the query ExpressionAttributeNames', () => {
      const req = new RequestGet();
      req.query.ExpressionAttributeNames={};
      req.query.ExpressionAttributeValues={};
      req.buildParameters('column', '=', 'something');
      expect(req.query.ExpressionAttributeNames['#column']).to.equals('column');
    });

    it('should set the query ExpressionAttributeValues', () => {
      const req = new RequestGet();
      req.query.ExpressionAttributeNames={};
      req.query.ExpressionAttributeValues={};
      req.buildParameters('column', '=', 'something');
      expect(req.query.ExpressionAttributeValues[':column']).to.equals('something');
    });

    it('should set the query FilterExpression', () => {
      const req = new RequestGet();
      req.query.ExpressionAttributeNames={};
      req.query.ExpressionAttributeValues={};
      req.buildParameters('column', '=', 'something');
      expect(req.query.FilterExpression).to.equals('#column = :column');
    });

    it('should set the query ExpressionAttributeNames, with element of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST');
      req.buildParameters('column', '=', 'something', 'AND');
      expect(req.query.ExpressionAttributeNames['#column']).to.equals('column');
    });

    it('should set the query ExpressionAttributeNames, with element of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST');
      req.buildParameters('column', '=', 'something', 'AND');
      expect(req.query.ExpressionAttributeNames['#column1']).to.equals('column');
    });

    it('should set the query ExpressionAttributeValues, with element of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST');
      req.buildParameters('column', '=', 'something', 'AND');
      expect(req.query.ExpressionAttributeValues[':column']).to.equals('FIRST');
    });

    it('should set the query ExpressionAttributeValues, with element of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST');
      req.buildParameters('column', '=', 'something', 'AND');
      expect(req.query.ExpressionAttributeValues[':column1']).to.equals('something');
    });

    it('should set the query FilterExpression, with element of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST');
      req.buildParameters('column', '=', 'something', 'AND');
      expect(req.query.FilterExpression).to.equals('#column = :column AND #column1 = :column1');
    });


    it('should set the query ExpressionAttributeNames, with two elements of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST').and('column', '=', 'SECOND');
      req.buildParameters('column', '=', 'something', 'OR');
      expect(req.query.ExpressionAttributeNames['#column']).to.equals('column');
    });

    it('should set the query ExpressionAttributeNames, with two elements  of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST').and('column', '=', 'SECOND');
      req.buildParameters('column', '=', 'something', 'OR');
      expect(req.query.ExpressionAttributeNames['#column1']).to.equals('column');
    });

    it('should set the query ExpressionAttributeNames, with two elements  of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST').and('column', '=', 'SECOND');
      req.buildParameters('column', '=', 'something', 'OR');
      expect(req.query.ExpressionAttributeNames['#column2']).to.equals('column');
    });

    it('should set the query ExpressionAttributeValues, with two elements  of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST').and('column', '=', 'SECOND');
      req.buildParameters('column', '=', 'something', 'OR');
      expect(req.query.ExpressionAttributeValues[':column']).to.equals('FIRST');
    });

    it('should set the query ExpressionAttributeValues, with two elements  of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST').and('column', '=', 'SECOND');
      req.buildParameters('column', '=', 'something', 'OR');
      expect(req.query.ExpressionAttributeValues[':column1']).to.equals('SECOND');
    });

    it('should set the query ExpressionAttributeValues, with two elements  of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST').and('column', '=', 'SECOND');
      req.buildParameters('column', '=', 'something', 'OR');
      expect(req.query.ExpressionAttributeValues[':column2']).to.equals('something');
    });

    it('should set the query FilterExpression, with two elements  of same column before', () => {
      const req = new RequestGet().where('column', '=', 'FIRST').and('column', '=', 'SECOND');
      req.buildParameters('column', '=', 'something', 'OR');
      expect(req.query.FilterExpression).to.equals('#column = :column AND #column1 = :column1 OR #column2 = :column2');
    });

    it('should set the query FilterExpression with contains condition', () => {
      const req = new RequestGet();
      req.query.ExpressionAttributeNames={};
      req.query.ExpressionAttributeValues={};
      req.buildParameters('column', 'contains', 'something');
      expect(req.query.FilterExpression).to.equals('contains(#column, :column)');
    });

    it('should set the FilterExpression when column has a child given', () => {
      const req = new RequestGet();
      req.query.ExpressionAttributeNames={};
      req.query.ExpressionAttributeValues={};
      req.buildParameters('column.child', '=', 'something');
      expect(req.query.FilterExpression).to.equals('column.child = :column');
    });

    it('should set the ExpressionAttributeNames when column has a child given', () => {
      const req = new RequestGet();
      req.query.ExpressionAttributeNames={};
      req.query.ExpressionAttributeValues={};
      req.buildParameters('column.child', '=', 'something');
      expect(req.query.ExpressionAttributeNames['#column']).to.equals(void(0));
    });

  });

  describe('RequestGet#setFilterExpressionFromParameters', () => {
      it('should set FilterExpression when not set', () => {
        let req = new RequestGet();
        req.setFilterExpressionFromParameters('or', 'a = b');
        expect(req.query.FilterExpression).to.equals('a = b');
      });

      it('should update FilterExpression with new content', () => {
        let req = new RequestGet();
        req.query.FilterExpression='a = b'
        req.setFilterExpressionFromParameters('or', 'c = d');
        expect(req.query.FilterExpression).to.equals('a = b or c = d');
      });
  });

  describe('RequestGet#getExpressionFromParameters', () => {
      it('should return an operator expression', () => {
        expect(new RequestGet().getExpressionFromParameters('col', '#c', '=', ':c', false))
        .to.equals('#c = :c');
      });

      it('should return a contains expression', () => {
        expect(new RequestGet().getExpressionFromParameters('col', '#c', 'contains', ':c', false))
        .to.equals('contains(#c, :c)');
      });

      it('should return an expression in "withchild" case', () => {
        expect(new RequestGet().getExpressionFromParameters('col.child', '#c', '=', ':c', true))
        .to.equals('col.child = :c');
      });
  });

});
