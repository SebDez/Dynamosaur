import Exception from './util/Exception';
import RequestGet from './RequestGet';
import RequestUpdate from './RequestUpdate';
import RequestPut from './RequestPut';

/**
 * The query builder class
 */
export default class QueryBuilder {

  /**
   * Create a new query concerning the table name to get elements
   * @param  {string} tableName The table name
   * @param  {string} region The region The region where the aws dynamodb is, default is 'eu-west-1'
   * @return {object} A get request object
   */
  getIn(tableName, region) {
    if (!tableName) throw new Exception('QB1', 'No tablename provided', new Date());
    return new RequestGet(tableName, region);
  }

  /**
   * Create a new query concerning the table name to upsert elements
   * @param  {string} tableName The table name
   * @param  {string} region The region The region where the aws dynamodb is, default is 'eu-west-1'
   * @return {object} A put request object
   */
  putIn(tableName, region) {
    if (!tableName) throw new Exception('QB2', 'No tablename provided', new Date());
    return new RequestPut(tableName, region);
  }

  /**
   * Create a new query concerning the table name to update elements
   * @param  {string} tableName The table name
   * @param  {string} region The region The region where the aws dynamodb is, default is 'eu-west-1'
   * @return {object} An update request object
   */
  updateIn(tableName, region) {
    if (!tableName) throw new Exception('QB3', 'No tablename provided', new Date());
    return new RequestUpdate(tableName, region);
  }

}
