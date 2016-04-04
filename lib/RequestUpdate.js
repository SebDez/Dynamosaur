import Exception from './util/Exception';
import AWS from 'aws-sdk-promise';
import Request from './Request';

/**
 * Request class to update some elements in object
 */
export default class RequestUpdate extends Request{

  /**
   * Create a new request
   * @param {string} tableName The table name concerned
   * @param {string} region The region where the aws dynamodb is, default is 'eu-west-1'
   */
  constructor(tableName, region) {
    super(tableName, region);
    /** @type {Object} */
    this.query = {
      TableName: this.tableName,
      Key: {},
      UpdateExpression: null,
      ExpressionAttributeValues: {},
      ReturnValues: 'UPDATED_NEW'
    };
  }

  /**
   * Define id which will be used to find elements to update
   * @param  {object} ids The id by key value
   * @return {object} The current query or throw a exception
   */
  withId(ids) {
    for (let key in ids) {
      this.query.Key[key] = ids[key];
    }
    return this;
  }

  /**
   * Set the query according to the element to update
   * @param  {object} item The element to save
   * @return {object} The current query or throw a exception
   */
  toModify(item) {
    const itemQuery = this.itemToExpression(item);
    this.query.UpdateExpression = itemQuery.UpdateExpression;
    this.query.ExpressionAttributeValues = itemQuery.ExpressionAttributeValues;
    return this;
  }

  /**
   * Execute the query
   * @return {object} A promise to resolve with result or error
   */
  exec() {
    return this.docClient.update(this.query).promise();
  }

  /**
   * Translate a given object to an query expression used to update an element
   * @param  {object} item The object to parse
   * @return {object} The matching expression or throw a exception
   */
  itemToExpression(item) {
    const obj = {
      UpdateExpression: null,
      ExpressionAttributeValues: {}
    };

    //Set update expression and expression attribute values
    for (var k in item) {
      if (obj.UpdateExpression) {
        obj.UpdateExpression += ', ';
      } else {
        obj.UpdateExpression = 'set ';
      }
      const dotKey = ':' + k;
      obj.UpdateExpression += k + ' = ' + dotKey;
      obj.ExpressionAttributeValues[dotKey] = item[k];
    }
    return obj;
  }

}
