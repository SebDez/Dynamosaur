import Exception from './util/Exception';
import RequestGet from './RequestGet';
import RequestUpdate from './RequestUpdate';
import RequestPut from './RequestPut';
import RequestDelete from './RequestDelete';

/**
 * The query builder class
 */
export default class QueryBuilder {

  /**
   * Create a new QueryBuilder
   * @param  {string} region The region The region where the aws dynamodb is, default in request is 'eu-west-1'
   */
  constructor(region){
    /** @type {Object} */
    this.region = region;
  }

  /**
   * Create a new query concerning the table name to get elements
   * @param  {string} tableName The table name
   * @return {object} A get request object
   */
  getIn(tableName) {
    if (!tableName) throw new Exception('QB1', 'No tablename provided', new Date());
    return new RequestGet(tableName, this.region);
  }

  /**
   * Create a new query concerning the table name to upsert elements
   * @param  {string} tableName The table name
   * @return {object} A put request object
   */
  putIn(tableName) {
    if (!tableName) throw new Exception('QB2', 'No tablename provided', new Date());
    return new RequestPut(tableName, this.region);
  }

  /**
   * Create a new query concerning the table name to update elements
   * @param  {string} tableName The table name
   * @return {object} An update request object
   */
  updateIn(tableName) {
    if (!tableName) throw new Exception('QB3', 'No tablename provided', new Date());
    return new RequestUpdate(tableName, this.region);
  }

  /**
   * Create a new query concerning the table name to delete elements
   * @param  {string} tableName The table name
   * @return {object} An update request object
   */
  deleteIn(tableName) {
    if (!tableName) throw new Exception('QB4', 'No tablename provided', new Date());
    return new RequestDelete(tableName, this.region);
  }

}
