# cachest
[![NPM version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![gzip](http://img.badgesize.io/https://unpkg.com/cachest/lib/cachest.min.js?compression=gzip)][unpkg-url]


[npm-badge]: https://img.shields.io/npm/v/cachest.svg
[npm-url]: https://www.npmjs.com/package/cachest
[npm-downloads]: https://img.shields.io/npm/dm/cachest.svg
[travis-badge]: https://www.travis-ci.org/ZiQiangWang/cachest.svg?branch=master
[travis-url]: https://www.travis-ci.org/ZiQiangWang/cachest
[unpkg-url]: https://unpkg.com/cachest/lib/cachest.min.js
[coveralls-badge]: https://coveralls.io/repos/ZiQiangWang/cachest/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/ZiQiangWang/cachest

<!-- [![NPM version](https://img.shields.io/npm/v/cachest.svg?style=flat)](https://www.npmjs.com/package/cachest) [![NPM monthly downloads](https://img.shields.io/npm/dm/cachest.svg?style=flat)](https://npmjs.org/package/cachest) -->
Cache data based on localstorage in browser, expire property is provided.

## Install

```
npm i cachest
```

## Usage

```Js
import cachest from 'cachest';
```

or

```Js
const cachest = require('cachest');
```

## API

### [.set](src/index.js#L20)

Assign `value` to `key` with expire time，if `expire` is not defined, keep the value until to be removed.

**Params**

* `key` **{String}**: The key of the property to save.
* `value` **{any}**: The content to save.
* `expire` **{Number}**: Expire time, ms as unit

### [.get](src/index.js#L36)

Return the value of `key`.

**Params**

- `key` **{String}**: The key of the property to get.
- return **{*}**

### [.del](src/index.js#L46)

Remove the value of `key`.

**Params**

- `key` **{String}**: The key of the property to remove.

### [.clear](src/index.js#L50)

Clear all saved value.

### [.keys](src/index.js#L59)

Get the keys not expired.

- return **{Array}**

### [.size](src/index.js#L73)

return **{Number}**

Length of keys.

### [.isExpire](src/index.js#L76)

Check if the `key` is expired, return true if key is not existed.

**Params**

- `key` **{String}**: The key of the property to check.
- return **{Boolean}**



### License

Copyright © 2018, [ZiQiangWang](https://github.com/ZiQiangWang).
Released under the [MIT License](LICENSE).
