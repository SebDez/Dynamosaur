import chai from 'chai';
import assert from 'assert';
import Exception from '../lib/util/Exception';
import RequestUpdate from '../lib/RequestUpdate';

const expect = chai.expect;

describe('RequestUpdate', () => {

  describe('RequestUpdate#exec', () => {
      it('should return a function', () => {
        expect(new RequestUpdate().exec().then).to.be.an.instanceof(Function);
      });
  });

  describe('RequestUpdate#withId', () => {

      it('should throw an error if no item given', () => {
        assert.throws(new RequestUpdate().withId, Exception);
      });

      it('should return the current RequestUpdate', () => {
        expect(new RequestUpdate().withId({id:'1'})).to.be.an.instanceof(RequestUpdate);
      });

      it('Expect to set query key, one key case', () => {
        const req = new RequestUpdate().withId({id:'1'});
        expect(req.query.Key['id']).to.equals('1');
      });

      it('Expect to set query key, two keys case', () => {
        const req = new RequestUpdate().withId({id:'1', id2:'2'});
        expect(req.query.Key['id2']).to.equals('2');
      });
  });

  describe('RequestUpdate#toModify', () => {

      it('should throw an error if no item given', () => {
        assert.throws(new RequestUpdate().toModify, Exception);
      });

      it('should return the current RequestUpdate', () => {
        expect(new RequestUpdate().toModify({id:'1'})).to.be.an.instanceof(RequestUpdate);
      });

      it('Expect to set query UpdateExpression, one attribute', () => {
        const req = new RequestUpdate().toModify({name:'test'});
        expect(req.query.UpdateExpression).to.equals('set name = :name');
      });

      it('Expect to set query ExpressionAttributeValues, one attribute', () => {
        const req = new RequestUpdate().toModify({name:'test'});
        expect(req.query.ExpressionAttributeValues[':name']).to.equals('test');
      });

      it('Expect to set query UpdateExpression, two attributes', () => {
        const req = new RequestUpdate().toModify({name:'test', phone:'06'});
        expect(req.query.UpdateExpression).to.equals('set name = :name, phone = :phone');
      });

      it('Expect to set query ExpressionAttributeValues, two attributes', () => {
        const req = new RequestUpdate().toModify({name:'test', phone:'06'});
        expect(req.query.ExpressionAttributeValues[':phone']).to.equals('06');
      });

  });

  describe('RequestUpdate#itemToExpression', () => {

      it('should throw an error if no item given', () => {
        assert.throws(new RequestUpdate().itemToExpression, Exception);
      });

      it('should throw an error if item is not an object', () => {
        assert.throws(()=>{new RequestUpdate().itemToExpression('item')}, Exception);
      });

      it('should return object with UpdateExpression', () => {
        expect(new RequestUpdate().itemToExpression({name:'test'}).UpdateExpression).to.exist;
      });

      it('should return object with ExpressionAttributeValues', () => {
        expect(new RequestUpdate().itemToExpression({name:'test'}).ExpressionAttributeValues).to.exist;
      });

      it('Expect to set query UpdateExpression, one attribute', () => {
        const obj = new RequestUpdate().itemToExpression({name:'test'});
        expect(obj.UpdateExpression).to.equals('set name = :name');
      });

      it('Expect to set query ExpressionAttributeValues, one attribute', () => {
        const obj = new RequestUpdate().itemToExpression({name:'test'});
        expect(obj.ExpressionAttributeValues[':name']).to.equals('test');
      });

      it('Expect to set query UpdateExpression, two attributes', () => {
        const obj = new RequestUpdate().itemToExpression({name:'test', phone:'06'});
        expect(obj.UpdateExpression).to.equals('set name = :name, phone = :phone');
      });

      it('Expect to set query ExpressionAttributeValues, two attributes', () => {
        const obj = new RequestUpdate().itemToExpression({name:'test', phone:'06'});
        expect(obj.ExpressionAttributeValues[':phone']).to.equals('06');
      });

  });

});
