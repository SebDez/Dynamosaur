# dynamosaur [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Dynamodb query builder

## Installation

```sh
$ npm install --save dynamosaur
```

## Usage

```js
var Dynamosaur = require('dynamosaur');

var qb = new QueryBuilder();

new Dynamosaur()
  .getIn('Movies')
  .exec()
  .then(res => {
    console.log('## GET ALL MOVIES : ', res.data.Items);
  }, err => {
    console.log('## ERROR ON GET ALL MOVIES : ',err );
  });

You can define another region for dynamoDB like this
new Dynamosaur()
  .getIn('Movies', 'myregion')
  
```

SEE ./TestFile.js for multiple examples

## License

MIT © [Marvin Frachet](http://marvinfrachet.com), [Sébastien Dez](http://sebdez.fr)

[npm-image]: https://badge.fury.io/js/dynamosaur.svg
[npm-url]: https://npmjs.org/package/dynamosaur
[travis-image]: https://travis-ci.org/Skahrz/dynamosaur.svg?branch=master
[travis-url]: https://travis-ci.org/Skahrz/dynamosaur
[daviddm-image]: https://david-dm.org/Skahrz/dynamosaur.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Skahrz/dynamosaur
[coveralls-image]: https://coveralls.io/repos/Skahrz/dynamosaur/badge.svg
[coveralls-url]: https://coveralls.io/r/Skahrz/dynamosaur
