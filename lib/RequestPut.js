import Exception from './util/Exception';
import AWS from 'aws-sdk-promise';

/**
 * A parent request class
 */
export default class RequestPut {

  /**
   * Create a new request
   * @param {string} tableName The table name
   */
  constructor(tableName) {
    const region ={
      region: 'eu-west-1'
    };
    this.dynamodb = new AWS.DynamoDB(region);

    this.query ={
      TableName: tableName
    };
  }

  aNew(item){
    const newItem = {
      "TableName": this.query.TableName,
      "Item": item
    };
    return this.dynamodb.putItem(newItem).promise();
  }

}
