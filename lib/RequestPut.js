import Exception from './util/Exception';
import AWS from 'aws-sdk-promise';

/**
 * Create a request class to upsert (put) elements
 */
export default class RequestPut {

  /**
   * Create a new request
   * @param {string} tableName The table name concerned
   */
  constructor(tableName) {
    const region = {
      region: 'eu-west-1'
    };
    this.dynamodb = new AWS.DynamoDB(region);

    this.query = {
      TableName: tableName
    };
  }

  /**
   * Add a new element in defined table
   * @param  {string} item The item to insert or update
   * @return {object} A promise to resolve with result or error
   */
  aNew(item) {
    const newItem = {
      TableName: this.query.TableName,
      Item: item
    };
    return this.dynamodb.putItem(newItem).promise();
  }

}
