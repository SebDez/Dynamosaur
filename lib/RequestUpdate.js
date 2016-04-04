import Exception from './Exception';
import AWS from 'aws-sdk-promise';

/**
 * A parent request class
 */
export default class RequestUpdate {

  /**
   * Create a new request
   * @param {string} tableName The table name
   */
  constructor(tableName) {
    const region ={
      region: 'eu-west-1'
    };
    this.dynamodb = new AWS.DynamoDB(region);
    this.docClient = new AWS.DynamoDB.DocumentClient(region);

    this.query ={
        TableName: tableName,
        Key: {},
        UpdateExpression: null,
        ExpressionAttributeValues: {},
        ReturnValues:"UPDATED_NEW"
    };
  }

  withMultipleId(ids){
    for(let key in ids){
      this.query.Key[key]=ids[key];
    }
    return this;
  }

  exec(){
    return this.docClient.update(this.query).promise();
  }

  toModify(item){
    const itemQuery =  this.itemToExpression(item);
    this.query.UpdateExpression =  itemQuery.UpdateExpression;
    this.query.ExpressionAttributeValues = itemQuery.ExpressionAttributeValues;
    return this;
  }

  itemToExpression(item){
    const obj ={
      UpdateExpression:null,
      ExpressionAttributeValues:{}
    };

    //Set update expression and expression attribute values
    for (var k in item){
        if(obj.UpdateExpression){
          obj.UpdateExpression+=', ';
        }else{
          obj.UpdateExpression='set ';
        }
        const dotKey=':'+k;
        obj.UpdateExpression += k+' = '+dotKey;
        obj.ExpressionAttributeValues[dotKey]=item[k];
    }
    return obj;
  }


}
