import Exception from './util/Exception';
import Constants from './util/Constants';
import Request from './Request';
import AWS from 'aws-sdk-promise';

/**
 * Request class to delete elements
 */
export default class RequestDelete extends Request{

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
      Key: null
    };
  }

  /**
   * Query the first query key
   * @param  {string} key The key concerned
   * @param  {string} value The value for this key
   * @return {object} The current query or throw a exception
   */
  whenKey(key, value) {
    if (!key) throw new Exception('D1', 'No key provided for "whenKey" method');
    if (!value) throw new Exception('D2', 'No value provided for "whenKey" method');
    this.query.Key = {};
    this.query.Key[key]=value;
    return this;
  }

  /**
   * Query conditionnal structure AND
   * @param  {string} column The column concerned
   * @param  {string} operator The operator among '=, <, <=, >, >='
   * @param  {string} value The request value to match
   * @return {object} The current query or throw a exception
   */
  andKey(key, value) {
    if (!key) throw new Exception('D3', 'No key provided for "andKey" method');
    if (!value) throw new Exception('D4', 'No value provided for "andKey" method');
    if (!this.query.Key) throw new Exception('D5', 'You should call "whenKey" method before "andKey" method');
    this.query.Key[key]=value;
    return this;
  }

  /**
   * Execute the query
   * @return {object} A promise to resolve with result or error
   */
  exec() {
    return this.docClient.delete(this.query).promise();
  }

}
