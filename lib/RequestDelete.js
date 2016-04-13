import Exception from './util/Exception';
import AWS from 'aws-sdk-promise';
import Request from './Request';

/**
 * Request class to delete elements
 */
export default class RequestDelete extends Request {

  /**
   * Create a new request
   * @param {string} tableName The table name concerned
   * @param {string} region The region where the aws dynamodb is, default is 'eu-west-1'
   */
  constructor(tableName, region) {
    super(tableName, region);
    /** @type {Object} */
    this.query = {
      TableName: this.tableName
    };
  }

  /**
   * Add a new element in defined table
   * @param  {string} item The item to insert or update
   * @return {object} A promise to resolve with result or error
   */
  aNew(item) {
    if (!item) throw new Exception('RP1', 'No item provided', new Date());
    const newItem = {
      TableName: this.query.TableName,
      Item: item
    };
    return this.dynamodb.putItem(newItem).promise();
  }

}
