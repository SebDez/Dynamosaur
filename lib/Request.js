import Exception from './Exception';
import AWS from 'aws-sdk-promise';

/**
 * A parent request class
 */
export default class Request {

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
      KeyConditionExpression: null,
      ExpressionAttributeNames: null,
      ExpressionAttributeValues: null
    };
  }

  /**
   * Query conditionnal structure
   * @param  {string} parameters The request filter
   * @param  {string} operator The request filter
   * @param  {string} value The request filter
   * @return {object} The current query
   */
  where(column, operator, value) {
    if (!column) throw new Exception('R1', 'No column provided for "where" method');
    if (!operator) throw new Exception('R2', 'No operator provided for "where" method');
    if (!value) throw new Exception('R3', 'No value provided for "where" method');
    this.query.ExpressionAttributeNames={};
    this.query.ExpressionAttributeValues={};
    this.buildParameters(column, operator, value);
    return this;
  }

  buildParameters(column, operator, value, cond) {
    const hashTaggedColumn = '#'+column;
    const dotColumn = ':'+column;

    this.query.ExpressionAttributeNames[hashTaggedColumn] = column;
    this.query.ExpressionAttributeValues[dotColumn] = value;

    if(this.query.KeyConditionExpression)
      this.query.KeyConditionExpression += ' '+cond+' '+hashTaggedColumn+' '+operator+' '+dotColumn;
    else
      this.query.KeyConditionExpression= hashTaggedColumn+' '+operator+' '+dotColumn;
  }

  and(column, operator, value) {
    if (!column) throw new Exception('R1', 'No column provided for "where" method');
    if (!operator) throw new Exception('R2', 'No operator provided for "where" method');
    if (!value) throw new Exception('R3', 'No value provided for "where" method');

    this.buildParameters(column, operator, value, 'and');
    return this;
  }

  or(column, operator, value) {
    if (!column) throw new Exception('R1', 'No column provided for "where" method');
    if (!operator) throw new Exception('R2', 'No operator provided for "where" method');
    if (!value) throw new Exception('R3', 'No value provided for "where" method');

    this.buildParameters(column, operator, value, 'or');
    return this;
  }

  aNew(item){
    const newItem = {
      "TableName": this.query.TableName,
      "Item": item
    };
    return this.dynamodb.putItem(newItem).promise();
  }

  toModify(item, cond){
    const itemQuery =  this.itemToExpression(item, cond);
    const query ={
        TableName: this.query.TableName,
        Key: itemQuery.Key,
        UpdateExpression: itemQuery.UpdateExpression,
        ExpressionAttributeValues: itemQuery.ExpressionAttributeValues,
        ReturnValues:"UPDATED_NEW"
    }

    return this.docClient.update(query).promise();
  }

  exec() {
    if(this.query.KeyConditionExpression){
      return this.docClient.query(this.query).promise();
    }
    return this.dynamodb.scan({
      TableName: this.query.TableName
    }).promise();
  }

  itemToExpression(item, cond){
    const obj ={
      Key:{},
      UpdateExpression:null,
      ExpressionAttributeValues:{}
    };

    //Set key
    for(let j in cond){
      obj.Key[j]=cond[j];
    }

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

  /*

  getKey(item, path){
    if(!path) path ='';
    for (var k in item){
        if(typeof item[k] === 'object'){
          return this.getKey(item[k], path);
        }
        else{
          return {str:path+'.'+k, value:item[k]};
        }
    }
  }
   itemToExpression(item, cond){
    const obj ={
      Key:{},
      UpdateExpression:null,
      ExpressionAttributeValues:{}
    };

    //Set key
    for(let j in cond){
      obj.Key[j]=cond[j];
    }


    //Set update expression and expression attribute values
    for (var k in item){
        let str='';
        let value;

        if(typeof item[k] === 'object'){
          let obj = this.getKey(item[k]);
          str=obj.str;
          value=obj.value;
        }else{
          value=item[k];
        }

        if(obj.UpdateExpression){
          obj.UpdateExpression+=', ';
        }else{
          obj.UpdateExpression='set ';
        }
        const dotKey=':'+k;
        obj.UpdateExpression += k+str+' = '+dotKey;
        obj.ExpressionAttributeValues[dotKey]=value;
    }
    console.log(obj);
    //return obj;
    return {
      Key:{
          "year": 1933,
          "title": "King Kong"
      },
      UpdateExpression:"set info.rating = :r, info.plot=:p, info.actors=:a, helloboy=:n",
      ExpressionAttributeValues:{
          ":r":5.5,
          ":p":"Everything happens all at once. 123",
          ":a":["Larry", "Moe", "Curly"],
          ":n":{'si':{'S':'caramba'}}
      }
    };
  }*/

}
