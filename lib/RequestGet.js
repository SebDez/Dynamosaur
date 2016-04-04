import Exception from './util/Exception';
import Constants from './util/Constants';
import Request from './Request';
import AWS from 'aws-sdk-promise';

/**
 * Request class to get elements
 */
export default class RequestGet extends Request{

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
      FilterExpression: null,
      ExpressionAttributeNames: null,
      ExpressionAttributeValues: null
    };
  }

  /**
   * Query conditionnal structure WHERE
   * @param  {string} column The column concerned
   * @param  {string} operator The operator among '=, <, <=, >, >='
   * @param  {string} value The request value to match
   * @return {object} The current query or throw a exception
   */
  where(column, operator, value) {
    if (!column) throw new Exception('R1', 'No column provided for "where" method');
    if (!operator) throw new Exception('R2', 'No operator provided for "where" method');
    if (!value) throw new Exception('R3', 'No value provided for "where" method');
    this.query.ExpressionAttributeNames = {};
    this.query.ExpressionAttributeValues = {};
    this.buildParameters(column, operator, value);
    return this;
  }

  /**
   * Query conditionnal structure AND
   * @param  {string} column The column concerned
   * @param  {string} operator The operator among '=, <, <=, >, >='
   * @param  {string} value The request value to match
   * @return {object} The current query or throw a exception
   */
  and(column, operator, value) {
    if (!column) throw new Exception('R1', 'No column provided for "where" method');
    if (!operator) throw new Exception('R2', 'No operator provided for "where" method');
    if (!value) throw new Exception('R3', 'No value provided for "where" method');

    this.buildParameters(column, operator, value, Constants.OPERATOR_AND);
    return this;
  }

  /**
   * Query conditionnal structure OR
   * @param  {string} column The column concerned
   * @param  {string} operator The operator among '=, <, <=, >, >='
   * @param  {string} value The request value to match
   * @return {object} The current query or throw a exception
   */
  or(column, operator, value) {
    if (!column) throw new Exception('R1', 'No column provided for "where" method');
    if (!operator) throw new Exception('R2', 'No operator provided for "where" method');
    if (!value) throw new Exception('R3', 'No value provided for "where" method');

    this.buildParameters(column, operator, value, Constants.OPERATOR_OR);
    return this;
  }

  /**
   * Build the query according to the given parameters
   * @param  {string} column The column concerned
   * @param  {string} operator The operator among '=, <, <=, >, >='
   * @param  {string} value The request value to match
   * @param  {string} cond     The condition operator : AND | OR
   */
  buildParameters(column, operator, value, cond) {
    let nb = 1;
    let colId = '';
    let hashTaggedColumn = Constants.COLUMN_NAME_SYMBOL + column;
    while (this.query.ExpressionAttributeNames[hashTaggedColumn + colId]) {
      colId = '' + nb;
      nb += 1;
    }

    hashTaggedColumn = Constants.COLUMN_NAME_SYMBOL + column + colId;
    let dotColumn = Constants.COLUMN_VALUE_SYMBOL + column + colId;

    this.query.ExpressionAttributeNames[hashTaggedColumn] = column;
    this.query.ExpressionAttributeValues[dotColumn] = value;

    if (this.query.FilterExpression)
      this.query.FilterExpression += ' ' + cond + ' ' + hashTaggedColumn + ' ' + operator + ' ' + dotColumn;
    else
      this.query.FilterExpression = hashTaggedColumn + ' ' + operator + ' ' + dotColumn;
  }

  /**
   * Execute the query
   * @return {object} A promise to resolve with result or error
   */
  exec() {
    return this.dynamodb.scan(this.query).promise();
  }

}
