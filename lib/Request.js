import Exception from './util/Exception';
import Constants from './util/Constants';
import AWS from 'aws-sdk-promise';

/**
 * Parent request class
 */
export default class Request {

  /**
   * Create a new request
   * @param {string} tableName The table name concerned
   * @param {string} region The region where the aws dynamodb is, default is 'eu-west-1'
   */
  constructor(tableName, region) {
    /** @type {string} */
    this.tableName=tableName;

    /*Region configuration*/
    const configRegion = {
      region: 'eu-west-1'
    };
    if(region) configRegion.region=region;

    /** @type {Object} */
    this.dynamodb = new AWS.DynamoDB(configRegion);
    /** @type {Object} */
    this.docClient = new AWS.DynamoDB.DocumentClient(configRegion);
  }

}
