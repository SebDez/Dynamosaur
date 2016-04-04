import chai from 'chai';
import assert from 'assert';
import Exception from '../lib/util/Exception';
import Request from '../lib/Request';

const expect = chai.expect;

describe('Request', () => {

  describe('Request#constructor', () => {
    it('Expect to set a default value for region', () => {
      const request = new Request('tableName');
      expect(request.dynamodb.config.region).to.deep.equals('eu-west-1');
    });

    it('Expect to set a given value for region', () => {
      const request = new Request('tableName', 'myregion');
      expect(request.dynamodb.config.region).to.deep.equals('myregion');
    });
  });

});
