'use strict'

// Import
const getsetdeep = require('./')

// Prepare
const obj = {
	a: {
		b: {
			c: 3
		}
	}
}

// Get
console.log(getsetdeep.getDeep(obj, 'a.b.c'))     // 3
console.log(getsetdeep.setDeep(obj, 'a.b.c', 4))  // 4
console.log(getsetdeep.getDeep(obj, 'a.b.c'))     // 4