import Exception from './util/Exception';
import Request from './Request';
import RequestUpdate from './RequestUpdate';
import RequestPut from './RequestPut';

/**
 * The query builder class
 */
export default class QueryBuilder {

  /**
   * Create a new query concerning the table name
   * @param  {string} tableName Te table name
   */
  getIn(tableName) {
    if (!tableName) throw new Exception('QB1', 'No tablename provided', new Date());
    return new Request(tableName);
  }

  putIn(tableName) {
    if (!tableName) throw new Exception('QB2', 'No tablename provided', new Date());
    return new RequestPut(tableName);
  }

  updateIn(tableName) {
    if (!tableName) throw new Exception('QB3', 'No tablename provided', new Date());
    return new RequestUpdate(tableName);
  }

}
