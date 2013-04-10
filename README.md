# Get Set Deep

[![Build Status](https://secure.travis-ci.org/bevry/getsetdeep.png?branch=master)](http://travis-ci.org/bevry/getsetdeep)
[![NPM version](https://badge.fury.io/js/getsetdeep.png)](https://npmjs.org/package/getsetdeep)
[![Flattr this project](https://raw.github.com/balupton/flattr-buttons/master/badge-89x18.gif)](http://flattr.com/thing/344188/balupton-on-Flattr)

Get and set nested variables of an object, includes support for Backbone Models


## Install

### Backend

1. [Install Node.js](http://bevry.me/node/install)
2. `npm install --save getsetdeep`

### Frontend

1. [See Browserify](http://browserify.org)



## Usage

### Example

``` javascript
// Import
var getsetdeep = require('getsetdeep');

// Prepare
var obj = {
	a: {
		b: {
			c: 3
		}
	}
};

// Get
console.log(getsetdeep.getDeep(obj, 'a.b.c'));     // 3
console.log(getsetdeep.setDeep(obj, 'a.b.c', 4));  // 4
console.log(getsetdeep.getDeep(obj, 'a.b.c'));     // 4
```


### Notes

- `setDeep` also has a fourth argument `opts` for options, currently we support the options:
	- `onlyIfEmpty` defaults to `false`, if specified to `true` then `setDeep` will only set the value if the current value is `null` or `undefined`
- We also work with getters `get(key)` and setters `set(attrs,opts)`, enabling support for Backbone.js models as well as others


## History
You can discover the history inside the [History.md](https://github.com/bevry/getsetdeep/blob/master/History.md#files) file



## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright © 2013+ [Bevry Pty Ltd](http://bevry.me)
<br/>Copyright © 2011-2012 [Benjamin Arthur Lupton](http://balupton.com)
